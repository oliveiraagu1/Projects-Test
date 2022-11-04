import { useContext } from "react";

import { AuthContext, AuthContenxtProps } from "../contexts/AuthContext";

export function useAuth(): AuthContenxtProps {
  const context = useContext(AuthContext);

  return context;
}
