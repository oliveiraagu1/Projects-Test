import { useContext, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { Flex, Text, Heading, Box, Input, Button } from "@chakra-ui/react";
import { Sidebar } from "../../components/sidebar";
import { canSSRAuth } from "../../utils/canSSRAuth";
import { AuthContext } from "../../context/AuthContext";
import { setupApiClient } from "../../services/api";

interface UserProps {
  id: string;
  name: string;
  email: string;
  endereco?: string;
}

interface ProfileProps {
  user: UserProps;
  premium: boolean;
}

export default function Profile({ user, premium }: ProfileProps) {
  const { logoutUser } = useContext(AuthContext);

  const [name, setName] = useState(user && user?.name);
  const [endereco, setEndereco] = useState(user && user?.endereco);

  async function handleUpdateUser() {
    if (name === "") return;

    try {
      const apiClient = setupApiClient();
      await apiClient.put("/users", {
        name,
        endereco,
      });
    } catch (err) {
      console.log(err);
    }
  }

  async function handleLogout() {
    await logoutUser();
  }

  return (
    <>
      <Head>
        <title>Minha conta - BarberPro</title>
      </Head>
      <Sidebar>
        <Flex
          direction="column"
          alignItems="flex-start"
          justifyContent="flex-start"
        >
          <Flex
            w="100%"
            direction="row"
            alignItems="center"
            justifyContent="flex-start"
          >
            <Heading fontSize="3xl" mt={4} mb={4} mr={4} color="orange.900">
              Minha conta
            </Heading>
          </Flex>

          <Flex
            maxW="700px"
            w="100%"
            direction="column"
            alignItems="center"
            justifyContent="center"
            background="barber.400"
            pt={8}
            pb={8}
          >
            <Flex direction="column" w="85%">
              <Text mb={2} fontSize="xl" fontWeight="bold" color="white">
                Nome da barbearia:
              </Text>
              <Input
                w="100%"
                background="gray.900"
                placeholder="Nome da sua barbearia"
                size="lg"
                type="text"
                mb={3}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <Text mb={2} fontSize="xl" fontWeight="bold" color="white">
                Endereço
              </Text>
              <Input
                w="100%"
                background="gray.900"
                placeholder="Endereço da barbearia"
                size="lg"
                type="text"
                mb={3}
                value={endereco}
                onChange={(e) => setEndereco(e.target.value)}
              />

              <Text mb={2} fontSize="xl" fontWeight="bold" color="white">
                Plano atual
              </Text>
              <Flex
                direction="row"
                w="100%"
                mb={3}
                p={1}
                borderWidth={1}
                rounded={6}
                backgroundColor="barber.900"
                alignItems="center"
                justifyContent="space-between"
              >
                <Text
                  p={2}
                  fontSize="lg"
                  color={premium ? "#FBA931" : "#4DFFB4"}
                >
                  Plano {premium ? "Premium" : "Grátis"}
                </Text>
                <Link href="/planos">
                  <Box
                    cursor="pointer"
                    p={1}
                    pl={2}
                    pr={2}
                    background="#00CD52"
                    rounded={4}
                    color="white"
                  >
                    Mudar plano
                  </Box>
                </Link>
              </Flex>
            </Flex>

            <Button
              w="85%"
              mt={3}
              mb={4}
              bg="button.cta"
              size="lg"
              _hover={{ bg: "#FFB13E" }}
              onClick={handleUpdateUser}
            >
              Salvar
            </Button>
            <Button
              w="85%"
              mb={6}
              bg="transparent"
              borderWidth={2}
              borderColor="red.500"
              color="red.500"
              size="lg"
              _hover={{ bg: "transparent" }}
              onClick={handleLogout}
            >
              Sair da conta
            </Button>
          </Flex>
        </Flex>
      </Sidebar>
    </>
  );
}

export const getServerSideProps = canSSRAuth(async (context) => {
  try {
    const apiClient = setupApiClient(context);
    const response = await apiClient.get("/me");

    const user = {
      id: response.data.id,
      name: response.data.name,
      email: response.data.email,
      endereco: response.data.endereco,
    };

    return {
      props: {
        user: user,
        premium:
          response.data?.subscriptions?.status === "active" ? true : false,
      },
    };
  } catch (err) {
    console.log(err);

    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
});
