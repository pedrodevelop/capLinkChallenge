"use client";
import { Button, TextInput } from "@mantine/core";
import { toast } from "react-toastify";
import useForm from "@/data/hooks/useForm";
import User from "@/app/logic/core/user/User";
import { useRouter, usePathname } from "next/navigation";

const Register: React.FC = () => {
  const pathName = usePathname();
  const { form, data } = useForm(pathName);
  const router = useRouter();

  let users: Partial<User>[] = [];
  if (typeof window !== "undefined") {
    users = JSON.parse(localStorage.getItem("users")!) ?? [];
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-8">Registrar</h1>
      <form
        className="flex flex-col items-center justify-center h-screen"
        onSubmit={form.onSubmit(() => {
          users.push(data);
          localStorage.setItem(`users`, JSON.stringify(users));
          router.push("/signin", { scroll: false });
          toast.success("Conta registrada com sucesso", {
            position: "bottom-right",
            autoClose: 2500,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: "light",
          });
        })}
      >
        <div className="w-full sm:w-64">
          <TextInput
            label="Seu nome"
            placeholder="Nome e sobrenome"
            {...form.getInputProps("name")}
          />
        </div>
        <div className="w-full sm:w-64 mt-4">
          <TextInput
            label="Número de celular"
            {...form.getInputProps("mobilePhone")}
          />
        </div>
        <div className="w-full sm:w-64 mt-4">
          <TextInput
            label="Email"
            placeholder="Exemplo@hotmail.com"
            {...form.getInputProps("email")}
          />
        </div>
        <div className="w-full sm:w-64 mt-4">
          <TextInput
            label="Senha"
            type="password"
            placeholder="Pelo menos 6 caracteres"
            {...form.getInputProps("password")}
          />
        </div>
        <div className="w-full sm:w-64 mt-4">
          <TextInput
            label="Confirme a senha"
            type="password"
            {...form.getInputProps("confirmPassword")}
          />
        </div>
        <Button type="submit" className="mt-8" color="blue">
          Cadastrar
        </Button>
      </form>
    </div>
  );
};

export default Register;
