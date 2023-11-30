"use client";
import useForm from "@/data/hooks/useForm";
import { Button, TextInput } from "@mantine/core";

const SignIn: React.FC = () => {
  const { form, data, handleLogin } = useForm();
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-8">Login</h1>
      <div className="w-full sm:w-64">
        <TextInput
          label="Email"
          {...form.getInputProps("email")}
          placeholder="Endereço de email"
        />
      </div>
      <div className="w-full sm:w-64 mt-4">
        <TextInput
          label="Senha"
          type="password"
          {...form.getInputProps("password")}
          placeholder="Senha"
        />
      </div>
      <Button
        className="mt-8"
        color="blue"
        onClick={() => {
          handleLogin(data);
        }}
      >
        Fazer login
      </Button>
      <p className="mt-4">
        Não tem uma conta? <a href="/register">Registrar</a>
      </p>
    </div>
  );
};

export default SignIn;
