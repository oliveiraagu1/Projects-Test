import Head from "next/head";
import Link from "next/link";
import {
  Flex,
  Text,
  Heading,
  Button,
  Link as ChakraLink,
  useMediaQuery,
} from "@chakra-ui/react";
import { canSSRAuth } from "../../utils/canSSRAuth";
import { Sidebar } from "../../components/sidebar";
import { IoMdPerson } from "react-icons/io";

export default function Dashboard() {
  const [isMobile] = useMediaQuery("(max-width: 500px)");

  return (
    <>
      <Head>
        <title>BarberPro - Minha barbearia</title>
      </Head>
      <Sidebar>
        <Flex direction="row" align="flex-start" justify="flex-start">
          <Flex w="100%" direction="row" align="center" justify="flex-start">
            <Heading fontSize="3xl" mt={4} mb={4} mr={4}>
              Agenda
            </Heading>
            <Link href="/new">
              <Button>Registrar</Button>
            </Link>
          </Flex>
          <ChakraLink
            w='100%'
            m={0}
            p={0}
            mt={1}
            bg='transparent'
            style={{ textDecoration: 'none' }}
          >
            <Flex
              w="100%"
              direction={isMobile ? "column" : "row"}
              p={4}
              rounded={4}
              mb={4}
              bg="barber.400"
              justifyContent="space-between"
              align={isMobile ? "flex-start" : "center"}
            >
              <Flex direction='row' mb={isMobile ? 2 : 0} align='center' justify='center'>
                <IoMdPerson size={24} color="#FFF"/>
                <Text fontWeight='bold' ml={4} noOfLines={1} >Gustavo teste</Text>

              </Flex>

              <Text fontWeight='bold' >
                Corte completo
              </Text>
              <Text fontWeight='bold' >
                R$ 20.00
              </Text>
            </Flex>
          </ChakraLink>
        </Flex>
      </Sidebar>
    </>
  );
}

export const getServerSideProps = canSSRAuth(async (context) => {
  return {
    props: {},
  };
});
