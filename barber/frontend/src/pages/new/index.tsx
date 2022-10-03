import { useState, ChangeEvent } from "react";
import Head from "next/head";
import Router from "next/router";
import { Sidebar } from "../../components/sidebar";
import { Flex, Heading, Text, Button, Input, Select } from "@chakra-ui/react";
import { canSSRAuth } from "../../utils/canSSRAuth";
import { setupApiClient } from "../../services/api";

interface HaircutProps {
  id: string;
  name: string;
  price: string | number;
  status: boolean;
  user_id: string;
}
interface NewProps {
  haircuts: HaircutProps[];
}

export default function New({ haircuts }: NewProps) {
  const [customer, setCustomer] = useState("");
  const [haircutSelected, setHaircutSelected] = useState(haircuts[0]);

  function handleChangeSelect(id: string) {
    const haircutItem = haircuts.find((item) => item.id === id);
    setHaircutSelected(haircutItem);
  }

  async function handleRegister() {

    if(!customer) return;

    try {
      const apiCleint = setupApiClient();
      await apiCleint.post("/schedule", {
        customer,
        haircut_id: haircutSelected?.id,
      });

      alert("cadastrado com sucesso");

      Router.push("/dashboard");
    } catch (err) {
      console.log(err);
      alert("Error!");
    }
  }

  return (
    <>
      <Head>
        <title>BarberPro - Novo agendamento</title>
      </Head>

      <Sidebar>
        <Flex direction="column" align="flex-start" justify="flex-start">
          <Flex direction="row" w="100%" align="center" justify="flex-start">
            <Heading fontSize="3xl" mt={4} mb={4}>
              Novo corte
            </Heading>
          </Flex>
          <Flex
            maxW="700px"
            pt={8}
            pb={8}
            width="100%"
            direction="column"
            align="center"
            justify="center"
            bg="barber.400"
          >
            <Input
              placeholder="Nome do cliente"
              w="85%"
              mb={3}
              size="lg"
              type="text"
              bg="barber.900"
              value={customer}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setCustomer(e.target.value)
              }
            />

            <Select
              mb={3}
              size="lg"
              bg="barber.900"
              w="85%"
              onChange={(e) => handleChangeSelect(e.target.value)}
            >
              {haircuts?.map((item) => (
                <option key={item?.id} value={item?.id}>
                  {item?.name}
                </option>
              ))}
            </Select>

            <Button
              w="85%"
              size="lg"
              color="gray.900"
              bg="button.cta"
              _hover={{ bg: "#FFB13E" }}
              onClick={handleRegister}
            ></Button>
          </Flex>
        </Flex>
      </Sidebar>
    </>
  );
}

export const getServerSideProps = canSSRAuth(async (context) => {
  try {
    const apiClient = setupApiClient(context);
    const response = await apiClient.get("/haircuts", {
      params: {
        status: true,
      },
    });

    if (response.data === null) {
      return {
        redirect: {
          destination: "/dashboard",
          permanent: false,
        },
      };
    }

    return {
      props: {
        haircuts: response.data,
      },
    };
  } catch (err) {
    console.log(err);

    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }
});
