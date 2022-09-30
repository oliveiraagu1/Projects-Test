import {
  FlexProps,
  Flex,
  useColorModeValue,
  IconButton,
  Text
} from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi";

interface MobileProps extends FlexProps {
  onOpen: () => void;
}

export function MobileNav({ onOpen, ...rest }: MobileProps) {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("gray.900", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent="flex-start"
      {...rest}
    >
      <IconButton
        variant="outline"
        onClick={onOpen}
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Flex direction="row">
        <Text ml={8} fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Barber
        </Text>
        <Text
          fontSize="2xl"
          fontFamily="monospace"
          fontWeight="bold"
          color="button.cta"
        >
          PRO
        </Text>
      </Flex>
    </Flex>
  );
}
