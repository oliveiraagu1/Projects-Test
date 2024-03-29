import { useState, ChangeEvent } from "react";
import Head from "next/head";
import Link from "next/link";
import {
  Flex,
  Text,
  Heading,
  Button,
  Stack,
  Switch,
  useMediaQuery,
} from "@chakra-ui/react";
import { Sidebar } from "../../components/sidebar";
import { IoMdPricetag } from "react-icons/io";
import { canSSRAuth } from "../../utils/canSSRAuth";
import { setupApiClient } from "../../services/api";

interface HaircutsItem {
  id: string;
  name: string;
  price: number | string;
  status: boolean;
  user_id: string;
}
interface HaircutsProps {
  haircuts: HaircutsItem[];
}

export default function Haircuts({ haircuts }: HaircutsProps) {
  const [isMobile] = useMediaQuery("(max-width: 500px)");

  const [haircutList, setHaircutList] = useState(haircuts || []);
  const [disableHaircut, setDisableHaircut] = useState("enabled");

  async function handleDisable(e: ChangeEvent<HTMLInputElement>) {

    const apiClient = setupApiClient();


    if (e.target.value === "disabled") {
      setDisableHaircut("enabled");

      const response = await apiClient.get('/haircuts', {
        params: {
          status: true
        }
      });

      setHaircutList(response.data);
    } else {
      setDisableHaircut("disabled");
      
      const response = await apiClient.get('/haircuts', {
        params: {
          status: false
        }
      });

      setHaircutList(response.data);
    }
  }

  return (
    <>
      <Head>
        <title>Modelos de corte - Minha barbearia</title>
      </Head>
      <Sidebar>
        <Flex
          direction="column"
          alignItems="flex-start"
          justifyContent="flex-start"
        >
          <Flex
            direction={isMobile ? "column" : "row"}
            w="100%"
            alignItems={isMobile ? "flex-start" : "center"}
            justifyContent="flex-start"
            mb={8}
          >
            <Heading
              fontSize={isMobile ? "28px" : "3xl"}
              mt={4}
              mb={4}
              mr={4}
              color="orange.900"
            >
              Modelos de corte
            </Heading>
            <Link href="/haircuts/new">
              <Button>Cadastrar novo</Button>
            </Link>

            <Stack ml="auto" alignItems="center" direction="row">
              <Text fontWeight="bold">Ativos</Text>
              <Switch
                colorScheme="green"
                size="lg"
                value={disableHaircut}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleDisable(e)
                }
                isChecked={disableHaircut === 'disabled' ? false : true}
              />
            </Stack>
          </Flex>
          {haircutList.map((item) => (
            <Link key={item.id} href={`/haircuts/${item.id}`}>
              <Flex
                cursor="pointer"
                w="100%"
                p={4}
                bg="barber.400"
                direction={isMobile ? "column" : "row"}
                alignItems={isMobile ? "flex-start" : "center"}
                rounded="4"
                mb={2}
                justifyContent="space-between"
              >
                <Flex
                  mb={isMobile ? 2 : 0}
                  direction="row"
                  alignItems="center"
                  justifyContent="center"
                >
                  <IoMdPricetag size={28} color="#FBA931" />
                  <Text fontWeight="bold" ml={4} noOfLines={1} color="white">
                    {item.name}
                  </Text>
                </Flex>
                <Text fontWeight="bold" color="white">
                  Preço: R$ {item.price}
                </Text>
              </Flex>
            </Link>
          ))}
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
