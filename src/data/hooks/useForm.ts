import User from "@/logic/core/user/User";
import { useForm as mantineUseForm } from "@mantine/form";
import { useContext } from "react";
import { toast } from "react-toastify";
import AuthContext from "../contexts/AuthContext";

/**
 * Custom hook for handling form data and validation.
 *
 * @param pathName Optional url path name for conditional validation.
 * @returns An object containing the form, data, and handleLogin function.
 */
const useForm = (pathName?: string) => {
  const { contextLogin } = useContext(AuthContext);
  let users: User[] = [];
  if (typeof window !== "undefined") {
    users = JSON.parse(localStorage.getItem("users")!);
  }

  const form = mantineUseForm<User>({
    initialValues: {
      name: "",
      email: "",
      mobilePhone: "",
      password: "",
      confirmPassword: "",
    },
    validate: {
      name: (value) =>
        pathName == "/register" && value.length > 2
          ? null
          : "Nome deve conter no mínimo 2 caracteres",
      email: (value) =>
        pathName == "/register" &&
        users &&
        users.filter((user: User) => user.email === value).length > 0
          ? "Email já cadastrado"
          : /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)
          ? null
          : "Email inválido",
      mobilePhone: (value) =>
        pathName == "/register" &&
        users &&
        users.filter((user: User) => user.mobilePhone === value).length > 0
          ? "Celular já cadastrado"
          : value &&
            value.length >= 11 &&
            /^\s*(\d{2}|\d{0})[-. ]?(\d{5}|\d{4})[-. ]?(\d{4})[-. ]?\s*$/.test(
              value
            )
          ? null
          : "Número de celular inválido",
      password: (value) =>
        pathName == "/register" && value.length > 2
          ? null
          : "Senha deve conter no mínimo 6 caracteres",
      confirmPassword: (value, values) =>
        pathName == "/register" && value !== values.password
          ? "Senhas não coincidem"
          : null,
    },
  });

  const handleLogin = (userData: Partial<User>) => {
    if (!users) {
      return toast.error("Email ou senha incorretos, tente novamente", {
        position: "bottom-right",
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
      });
    }
    const user = users.filter(
      (user: User) =>
        user.email == userData.email && user.password == userData.password
    );
    if (user.length > 0) {
      const userData = {
        name: form.values.name != "" ? form.values.name : user[0].name,
        email: form.values.email,
        mobilePhone: form.values.mobilePhone,
        password: form.values.password,
      };
      contextLogin(userData);
    } else {
      toast.error("Email ou senha incorretos, tente novamente", {
        position: "bottom-right",
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return {
    form,
    data: {
      name: form.values.name,
      email: form.values.email,
      mobilePhone: form.values.mobilePhone,
      password: form.values.password,
    },
    handleLogin,
  };
};

export default useForm;
