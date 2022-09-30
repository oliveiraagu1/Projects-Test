import { ReactNode } from "react";
import { FlexProps, Flex, Icon} from "@chakra-ui/react";
import Link from "next/link";
import { IconType } from "react-icons";

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactNode;
  route: string;
}

export function NavItem({ icon, children, route, ...rest }: NavItemProps) {
  return (
    <Link href={route} style={{ textDecoration: "none" }}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "barber.900",
          color: "white",
        }}
        {...rest}
      >
        {icon && (
            <Icon
                mr={4}
                fontSize='16'
                as={icon}
                _groupHover={{
                    color: 'white'
                }}
            />
        )}
        {children}
      </Flex>
    </Link>
  );
}
