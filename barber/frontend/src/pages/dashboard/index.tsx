import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import {
  Flex,
  Text,
  Heading,
  Button,
  Link as ChakraLink,
  useMediaQuery,
  useDisclosure,
} from "@chakra-ui/react";
import { canSSRAuth } from "../../utils/canSSRAuth";
import { Sidebar } from "../../components/sidebar";
import { IoMdPerson } from "react-icons/io";
import { setupApiClient } from "../../services/api";
import { ModalInfo } from "../../components/modal";

export interface ScheduleItem {
  id: string;
  customer: String;
  haircut: {
    id: string;
    name: string;
    price: string | number;
    user_id: string;
  };
}

interface DashboardProps {
  schedule: ScheduleItem[];
}

export default function Dashboard({ schedule }: DashboardProps) {
  const [isMobile] = useMediaQuery("(max-width: 500px)");
  const [list, setList] = useState(schedule);
  const [service, setService] = useState<ScheduleItem>();
  const { isOpen, onOpen, onClose } = useDisclosure();

  function handleOpenModal(item: ScheduleItem) {
    setService(item);
    onOpen();
  }

  async function handleFinish(id: string) {
    try {
      const apiClient = setupApiClient();
      await apiClient.delete("/schedule", {
        params: {
          schedule_id: id,
        },
      });

      const filterItem = list.filter((item) => {
        return item?.id !== id;
      });

      setList(filterItem);

      alert("finalizado com sucesso!");

      onClose();
    } catch (err) {
      console.log(err);
      onClose();
      alert("Error");
    }
  }

  return (
    <>
      <Head>
        <title>BarberPro - Minha barbearia</title>
      </Head>
      <Sidebar>
        <Flex direction="column" align="flex-start" justify="flex-start">
          <Flex w="100%" direction="row" align="center" justify="flex-start">
            <Heading fontSize="3xl" mt={4} mb={4} mr={4}>
              Agenda
            </Heading>
            <Link href="/new">
              <Button>Registrar</Button>
            </Link>
          </Flex>
          {list.map((item) => (
            <ChakraLink
              onClick={() => handleOpenModal(item)}
              key={item?.id}
              w="100%"
              m={0}
              p={0}
              mt={1}
              bg="transparent"
              style={{ textDecoration: "none" }}
            >
              <Flex
                w="100%"
                direction={isMobile ? "column" : "row"}
                p={4}
                rounded={4}
                mb={2}
                bg="barber.400"
                justifyContent="space-between"
                align={isMobile ? "flex-start" : "center"}
              >
                <Flex
                  direction="row"
                  mb={isMobile ? 2 : 0}
                  align="center"
                  justify="center"
                >
                  <IoMdPerson size={24} color="#FFF" />
                  <Text fontWeight="bold" ml={4} noOfLines={1}>
                    {item?.customer}
                  </Text>
                </Flex>

                <Text fontWeight="bold">{item?.haircut?.name}</Text>
                <Text fontWeight="bold">R$ {item?.haircut?.price}</Text>
              </Flex>
            </ChakraLink>
          ))}
        </Flex>
      </Sidebar>
      <ModalInfo
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        data={service}
        finshiService={() => handleFinish(service.id)}
      />
    </>
  );
}

export const getServerSideProps = canSSRAuth(async (context) => {
  try {
    const apliClient = setupApiClient(context);
    const response = await apliClient.get("/schedule");

    return {
      props: {
        schedule: response.data,
      },
    };
  } catch (err) {
    console.log(err);
    return {
      props: {
        schedule: [],
      },
    };
  }
});
