import { ReactNode } from 'react'
import {
    IconButton,
    Box,
    CloseButton,
    Flex,
    Icon,
    Drawer,
    DrawerContent,
    useColorModeValue,
    Text,
    useDisclosure,
    BoxProps,
    FlexProps
} from '@chakra-ui/react';

import { SidebarContent } from './sidebarContent';
import { MobileNav } from './mobileNav';

interface SideBarProps{
    children: ReactNode;
}

export function Sidebar({children}: SideBarProps){

    const {isOpen, onOpen, onClose} = useDisclosure();

    return(
        <Box minH='100vh' bg="barber.900">
            <SidebarContent
                onClose={() => onClose}
                display={{base: 'none', md: 'block'}}
            />
            <Drawer
                autoFocus={false}
                isOpen={isOpen}
                placement='left'
                returnFocusOnClose={false}
                onOverlayClick={onClose}
                size='full'
                onClose={onClose}

            >
                <DrawerContent>
                    <SidebarContent onClose={() => onClose()}/>
                </DrawerContent>
            </Drawer>
            <MobileNav
                display={{ base: 'flex', md: 'none'}}
                onOpen={onOpen}
            />
            <Box ml={{base: 0, md: 60}} p={4}>
                {children}
            </Box>
        </Box>
    )
}