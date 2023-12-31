"use client";
import useForm from "@/data/hooks/useForm";
import { Button, TextInput } from "@mantine/core";
import { useRouter } from "next/navigation";

const SignIn: React.FC = () => {
  const { form, data, handleLogin } = useForm();
  const router = useRouter()

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleLogin(data)
    }
  }
  
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
          onKeyDown={handleKeyDown}
        />
      </div>
      <Button
        className="mt-8 bg-[#2c5fe6]"
        onClick={() => {
          handleLogin(data);
        }}
      >
        Fazer login
      </Button>
      <p className="mt-4">
        Não tem uma conta? <a onClick={() => router.push('/register')} className="text-[#05a] cursor-pointer">Registrar</a>
      </p>
    </div>
  );
};

export default SignIn;
