import { useState, ChangeEvent } from "react";
import Head from "next/head";
import Link from "next/link";
import {
  Flex,
  Heading,
  Text,
  Button,
  useMediaQuery,
  Input,
  Stack,
  Switch,
} from "@chakra-ui/react";
import { Sidebar } from "../../components/sidebar";
import { FiChevronLeft } from "react-icons/fi";
import { canSSRAuth } from "../../utils/canSSRAuth";
import { setupApiClient } from "../../services/api";

interface HaircutProps {
  id: string;
  name: string;
  price: string | number;
  status: boolean;
  user_id: string;
}

interface SubscritpionsProps {
  id: string;
  status: string;
}

interface EditHaircutProps {
  haircut: HaircutProps;
  subscription?: SubscritpionsProps;
}

export default function EditHaircut({
  subscription,
  haircut,
}: EditHaircutProps) {
  const [isMobile] = useMediaQuery("(max-width: 500px)");

  return (
    <>
      <Head>
        <title>Editando modelo de corte - BarberPro</title>
      </Head>
      <Sidebar>
        <Flex direction="column" align="flex-start" justifyContent="flex-start">
          <Flex
            w="100%"
            direction={isMobile ? "column" : "row"}
            alignItems={isMobile ? "flex-start" : "center"}
            mb={isMobile ? 4 : 0}
            justifyContent="flex-start"
          >
            <Link href="/haircuts">
              <Button
                mr={3}
                p={4}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <FiChevronLeft size={24} color="#FFF" />
                Voltar
              </Button>
            </Link>
            <Heading fontSize={isMobile ? "22px" : "3xl"} color="#FFF">
              Editar corte
            </Heading>
          </Flex>

          <Flex
            maxW="700px"
            pt={8}
            pb={8}
            w="100%"
            bg="barber.400"
            direction="column"
            align="center"
            justify="center"
            mt={4}
          >
            <Heading fontSize={isMobile ? "22px" : "3xl"} mb={4}>
              Editar corte
            </Heading>

            <Flex w="85%" direction="column">
              <Input
                placeholder="Nome do corte"
                bg="gray.900"
                mb={3}
                size="lg"
                type="text"
                w="100%"
              />
              <Input
                placeholder="Valor do seu corte"
                bg="gray.900"
                mb={3}
                size="lg"
                type="number"
                w="100%"
              />

              <Stack mb={6} alignItems="center" direction="row">
                <Text fontWeight="bold">Desativar corte</Text>
                <Switch size="lg" colorScheme="red" />
              </Stack>

              <Button
                mb={6}
                w="100%"
                bg="button.cta"
                color="gray.900"
                _hover={{ bg: "#FFB13E" }}
                disabled={subscription?.status !== "active"}
              >
                Salvar
              </Button>
              {subscription?.status !== "active" && (
                <Flex direction="row" align="center" justify="center">
                  <Link href="/planos">
                    <Text
                      fontWeight="bold"
                      mr={1}
                      color="#31FB6A"
                      cursor="pointer"
                    >
                      Seja premuim
                    </Text>
                  </Link>
                  <Text> e tenha todos acessos liberados</Text>
                </Flex>
              )}
            </Flex>
          </Flex>
        </Flex>
      </Sidebar>
    </>
  );
}

export const getServerSideProps = canSSRAuth(async (context) => {
  const { id } = context.params;

  try {
    const apiClient = setupApiClient(context);
    const response = await apiClient.get("/haircut/detail", {
      params: {
        haircut_id: id,
      },
    });

    const check = await apiClient.get("/check");

    return {
      props: {
        haircut: response.data,
        subscription: check.data?.subscriptions,
      },
    };
  } catch (err) {
    console.log(err);
    return {
      redirect: {
        destination: "/haircuts",
        permanent: false,
      },
    };
  }
});
