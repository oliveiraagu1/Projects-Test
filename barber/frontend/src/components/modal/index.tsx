import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  Button,
  Flex,
} from "@chakra-ui/react";
import { FiUser, FiScissors } from "react-icons/fi";
import { FaMoneyBillAlt } from "react-icons/fa";

import { ScheduleItem } from "../../pages/dashboard";

interface ModalInfoProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  data: ScheduleItem;
  finshiService: () => Promise<void>;
}

export function ModalInfo({
  isOpen,
  onClose,
  onOpen,
  data,
  finshiService,
}: ModalInfoProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg="barber.400">
        <ModalHeader>Próximo</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Flex align="center" mb={3}>
            <FiUser size={28} color="#FFB13E" />
            <Text ml={3} fontSize="2xl" fontWeight="bold" color="#FFF">
                {data?.customer}
            </Text>
          </Flex>
          <Flex align="center" mb={3}>
            <FiScissors size={28} color="#FFF" />
            <Text ml={3} fontSize="large" fontWeight="bold" color="#FFF">
                {data?.haircut?.name}
            </Text>
          </Flex>
          <Flex align="center" mb={3}>
            <FaMoneyBillAlt size={28} color="#46EF75" />
            <Text ml={3} fontSize="large" fontWeight="bold" color="#FFF">
              R$ {data?.haircut?.price}
            </Text>
          </Flex>

          <ModalFooter>
            <Button
              bg="button.cta"
              _hover={{ bg: "#FFB13E" }}
              color="#FFF"
              mr={3}
              onClick={() => finshiService()}
            >
              Finalizar Serviço
            </Button>
          </ModalFooter>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
