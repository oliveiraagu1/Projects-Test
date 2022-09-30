import { createContext, ReactNode, useState, useEffect } from "react";
import { destroyCookie, setCookie, parseCookies } from "nookies";
import Router from "next/router";

import { api } from "../services/apiClient";

interface AuthContextData {
  user: UserProps;
  isAuthenticated: boolean;
  signIn: (credentials: SignInProps) => Promise<void>;
  signUp: (credentials: SignInProps) => Promise<void>;
  logoutUser: () => Promise<void>;
}

interface UserProps {
  id: string;
  name: string;
  email: string;
  endereco?: string;
  subscriptions?: SubscriptionsProps;
}

interface SubscriptionsProps {
  id: string;
}

interface AuthProviderProps {
  children: ReactNode;
}

interface SignInProps {
  email: string;
  password: string;
}

interface SignupProps {
  name: string;
  email: string;
  password: string;
}

export const AuthContext = createContext({} as AuthContextData);

export function signOut() {
  try {
    destroyCookie(null, "@barber.token", { path: "/" });
    Router.push("/");
  } catch (err) {
    console.log(err);
  }
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps>();
  const isAuthenticated = !!user;

  useEffect(() => {
    async function handleUser() {
      const { "@volo.token": token } = parseCookies();

      try {
        if (token) {
          const response = await api.get("/me");
          const { id, name, email, endereco, subscriptions } = response.data;

          setUser({
            id,
            name,
            email,
            endereco,
            subscriptions,
          });
        }
      } catch (err) {
        signOut();
      }
    }

    handleUser();
  }, []);

  async function signIn({ email, password }: SignInProps) {
    try {
      const response = await api.post("/session", {
        email,
        password,
      });

      const { id, name, token, endereco, subscriptions } = response.data;

      setCookie(undefined, "@barber.token", token, {
        maxAge: 60 * 60 * 24, // 1 dia
        path: "/",
      });

      setUser({
        id,
        name,
        email,
        endereco,
        subscriptions,
      });

      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      Router.push("/dashboard");
    } catch (err) {
      console.log(err);
    }
  }

  async function signUp({ name, email, password }: SignupProps) {
    try {
      await api.post("/users", {
        name,
        email,
        password,
      });

      Router.push("/login");
    } catch (err) {
      console.log(err);
    }
  }

  async function logoutUser() {
    try {
      destroyCookie(null, "@barber.token", { path: "/" });
      Router.push("/login");
      setUser(null);
    } catch (err) {
      console.log("Error ao sair", err);
    }
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, signIn, signUp, logoutUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}
