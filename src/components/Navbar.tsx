import React from 'react';
import { useColorMode, ColorMode, Flex, IconButton } from '@chakra-ui/react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';

type Props = Record<string, unknown>;

export const Navbar: React.FC<Props> = () => {
    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <Flex justifyContent='flex-end' alignItems='center' position='absolute' padding='2em' height='2rem' width='100vw'>
            <IconButton
                aria-label='Toggle color mode'
                onClick={toggleColorMode}
                icon={colorMode === 'light' ? <MoonIcon width={'1.5em'} height={'1.5em'} /> : <SunIcon width={'1.5em'} height={'1.5em'} />}
            />
        </Flex>
    );
};
