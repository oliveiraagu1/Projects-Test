import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import logoImg from "../../../public/images/logo.svg";
import { Flex, Button, Center, Input, Text } from "@chakra-ui/react";
import { useState } from "react";

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleRegister(){
    
  }

  return (
    <>
      <Head>
        <title>BarberPro -Crie sua conta no barberPro</title>
      </Head>
      <Flex
        background="barber.900"
        height="100vh"
        alignItems="center"
        justifyContent="center"
      >
        <Flex width={640} direction="column" p={14} rounded={8}>
          <Center p={4}>
            <Image
              src={logoImg}
              quality={100}
              objectFit="fill"
              alt="Logo barberPro"
              width={240}
            />
          </Center>

          <Input
            background="barber.400"
            variant="filled"
            size="lg"
            placeholder="Nome da barbearia"
            type="text"
            mb={3}
            value={name}
            onChange={ (e) => setName(e.target.value)}
          />
          <Input
            background="barber.400"
            variant="filled"
            size="lg"
            placeholder="email@email.com"
            type="email"
            mb={3}
            value={email}
            onChange={ (e) => setEmail(e.target.value)}
          />
          <Input
            background="barber.400"
            variant="filled"
            size="lg"
            placeholder="**********"
            type="text"
            mb={6}
            value={password}
            onChange={ (e) => setPassword(e.target.value)}
          />

          <Button
            background="button.cta"
            mb={6}
            color="gray.900"
            size="lg"
            _hover={{ bg: "#FFB13E" }}
            onClick={handleRegister}
          >
            Cadastrar
          </Button>

          <Center mt={2}>
            <Link href="/login">
              <Text cursor="pointer" color='#FFF'>
                Já possui uma conta?
                <strong> Faça login</strong>
              </Text>
            </Link>
          </Center>
        </Flex>
      </Flex>
    </>
  );
}
