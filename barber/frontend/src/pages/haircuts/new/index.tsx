import Head from "next/head";
import Link from "next/link";
import { Sidebar } from "../../../components/sidebar";
import {
  Flex,
  Text,
  Heading,
  Button,
  useMediaQuery,
  Input,
} from "@chakra-ui/react";
import { FiChevronLeft } from "react-icons/fi";
export default function NewHaircuts() {
  const [isMobile] = useMediaQuery("(max-width: 500px)");

  return (
    <>
      <Head>
        <title>BarberPro - Novo modelo de corte</title>
      </Head>

      <Sidebar>
        <Flex
          direction="column"
          alignItems="center"
          justifyContent="flex-start"
        >
          <Flex
            direction={isMobile ? "column" : "row"}
            width="100%"
            alignItems={isMobile ? "flex-start" : "center"}
            mb={isMobile ? 4 : 0}
          >
            <Link href="/haircuts">
              <Button
                p={4}
                display="flex"
                alignItems="center"
                justifyContent="center"
                mr={4}
              >
                <FiChevronLeft size={24} color="#FFF" />
                Voltar
              </Button>
            </Link>

            <Heading
              color="orange.900"
              mt={4}
              mb={4}
              mr={4}
              fontSize={isMobile ? "28px" : "3xl"}
            >
              Modelos de corte
            </Heading>
          </Flex>

          <Flex
            maxW="700px"
            bg="barber.400"
            w="100%"
            align="center"
            justify="center"
            pt={8}
            pb={8}
            direction='column'
          >
            <Heading mb={4} fontSize={isMobile ? "22px" : "3xl"} color="white">
              Cadastrar modelos
            </Heading>
            <Input
                placeholder="Nome do corte"
                size='lg'
                type='text'
                w='85%'
                bg='gray.900'
                mb={3}
                
            />
            <Input
                placeholder="Valor do corte"
                size='lg'
                type='text'
                w='85%'
                bg='gray.900'
                mb={4}
                
            />

            <Button
                width='85%'
                size='lg'
                color='gray.900'
                mb={6}
                bg='button.cta'
                _hover={{ bg: '#FFB13E'}}
            >
                Cadastrar
            </Button>
          </Flex>
        </Flex>
      </Sidebar>
    </>
  );
}
