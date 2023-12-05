"use client";
import { createContext, useState } from "react";
import { useRouter } from "next/navigation";
import User from "@/logic/core/user/User";

type UserLogin = Partial<User> & {
  name: string;
  email: string;
};

interface IAuthProps {
  /** User's data */
  user: UserLogin;
  /** Function called to login an user */
  contextLogin: (data: User) => void;
  /** Function called to redirect an user to login page if it's necessary */
  handleForceLogin: (pathName: string) => void;
}

const initialUserData: UserLogin = {
  name: "",
  email: "",
};

const AuthContext = createContext<IAuthProps>({
  user: initialUserData,
  contextLogin: () => {},
  handleForceLogin: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const router = useRouter();
  const [user, setUser] = useState<UserLogin>(initialUserData);
  const [lastPathName, setLastPathName] = useState<string>('');

  const contextLogin = (data: UserLogin) => {
    setUser(data);
    router.push(lastPathName);
  };

  const handleForceLogin = (pathName: string) => {
    setLastPathName(pathName)
    router.push("/signin");
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        contextLogin,
        handleForceLogin
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
