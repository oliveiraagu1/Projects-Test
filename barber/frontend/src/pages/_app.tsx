import type { AppProps } from "next/app";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { colors, styles } from "../theme";
import { AuthProvider } from "../context/AuthContext";

const theme = extendTheme({ styles, colors });

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ChakraProvider>
  );
}

export default MyApp;
