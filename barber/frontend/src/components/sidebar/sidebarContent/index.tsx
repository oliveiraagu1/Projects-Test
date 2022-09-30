import Link from "next/link";
import {
  BoxProps,
  Box,
  useColorModeValue,
  Flex,
  Text,
  CloseButton,
} from "@chakra-ui/react";
import { LinkItems } from '../conf';
import { NavItem } from "../navItem";

interface SideBarProps extends BoxProps {
  onClose: () => void;
}

export function SidebarContent({ onClose, ...rest }: SideBarProps) {
  return (
    <Box
      bg="barber.400"
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" justifyContent="space-between" mx={8}>
        <Link href="/dashboard">
          <Flex cursor="pointer" userSelect="none" direction="row">
            <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
              Barber
            </Text>
            <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold" color="button.cta">
              PRO
            </Text>
          </Flex>
        </Link>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>

      {LinkItems.map(item => (
        <NavItem
            icon={item.icon}
            route={item.route}
            key={item.name}
        >
            {item.name}
        </NavItem>
      ))}
    </Box>
  );
}
