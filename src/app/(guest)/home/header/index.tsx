import {
    HoverCard,
    Group,
    Button,
    UnstyledButton,
    Text,
    SimpleGrid,
    ThemeIcon,
    Anchor,
    Divider,
    Center,
    Box,
    Burger,
    Drawer,
    Collapse,
    ScrollArea,
    rem,
    useMantineTheme,
    Input,
    CloseButton,
    useMantineColorScheme,
    useComputedColorScheme,
    ActionIcon,
} from '@mantine/core';
import { MantineLogo } from '@mantinex/mantine-logo';
import { useDisclosure } from '@mantine/hooks';
import {
    IconNotification,
    IconCode,
    IconBook,
    IconChartPie3,
    IconFingerprint,
    IconCoin,
    IconChevronDown,
    IconSearch,
    IconMoonStars,
    IconSun,
} from '@tabler/icons-react';
import classes from './Header.module.css';
import { useState } from 'react';

const mockdata = [
    {
        icon: IconCode,
        title: 'Open source',
        description: 'This Pokémon’s cry is very loud and distracting',
    },
    {
        icon: IconCoin,
        title: 'Free for everyone',
        description: 'The fluid of Smeargle’s tail secretions changes',
    },
    {
        icon: IconBook,
        title: 'Documentation',
        description: 'Yanma is capable of seeing 360 degrees without',
    },
    {
        icon: IconFingerprint,
        title: 'Security',
        description: 'The shell’s rounded shape and the grooves on its.',
    },
    {
        icon: IconChartPie3,
        title: 'Analytics',
        description: 'This Pokémon uses its flying ability to quickly chase',
    },
    {
        icon: IconNotification,
        title: 'Notifications',
        description: 'Combusken battles with the intensely hot flames it spews',
    },
];

export function Header() {
    const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
    const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
    const theme = useMantineTheme();
    const [value, setValue] = useState('Search');
    const { colorScheme, setColorScheme } = useMantineColorScheme();
    const computedColorScheme = useComputedColorScheme("light", {
        getInitialValueInEffect: true,
    });
    const links = mockdata.map((item) => (
        <UnstyledButton className={classes.subLink} key={item.title}>
            <Group wrap="nowrap" align="flex-start">
                <ThemeIcon size={34} variant="default" radius="md">
                    <item.icon style={{ width: rem(22), height: rem(22) }} color={theme.colors.blue[6]} />
                </ThemeIcon>
                <div>
                    <Text size="sm" fw={500}>
                        {item.title}
                    </Text>
                    <Text size="xs" c="dimmed">
                        {item.description}
                    </Text>
                </div>
            </Group>
        </UnstyledButton>
    ));

    return (
        <Box pb={120} flex={"content"}>
            <header className={classes.header}>
                <Group justify="space-between" h="100%">
                    <a href="#" className={"text-[25px]"}>
                        CELLINA GLASSESS
                    </a>

                    <Group h="100%" gap={0} visibleFrom="md" flex={1}>
                        <a href="#" className={classes.link}>
                            Shop
                        </a>
                        <a href="#" className={classes.link}>
                            Offer
                        </a>
                        <a href="#" className={classes.link}>
                            Contact
                        </a>
                        <Input
                            placeholder="Search"
                            value={value}
                            onChange={(event) => setValue(event.currentTarget.value)}
                            rightSectionPointerEvents="all"
                            flex={1}
                            visibleFrom='md'
                            rightSection={
                                value ? <CloseButton
                                    aria-label="Search"
                                    onClick={() => setValue('')}
                                    style={{ display: value ? undefined : 'none' }}
                                /> : <IconSearch />
                            }
                            pointer
                        />

                    </Group>

                    <Group visibleFrom="sm">
                        <ActionIcon
                            onClick={() =>
                                setColorScheme(computedColorScheme === "light" ? "dark" : "light")
                            }
                            variant="default"
                            size="lg"
                            aria-label="Toggle color scheme"
                        >
                            {colorScheme === "light" ? (
                                <IconMoonStars color="var(--mantine-color-blue-7)" />
                            ) : (
                                <IconSun color="var(--mantine-color-yellow-4)" />
                            )}
                        </ActionIcon>
                        <Button variant="default">Log in</Button>
                        <Button>Sign up</Button>
                    </Group>

                    <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" />
                </Group>
            </header>

            <Drawer
                opened={drawerOpened}
                onClose={closeDrawer}
                size="100%"
                padding="md"
                title="CELLINA GLASSES"
                hiddenFrom="sm"
                zIndex={1000000}
            >
                <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
                    <Divider my="sm" />

                    <a href="#" className={classes.link}>
                        Shop
                    </a>
                    <Collapse in={linksOpened}>{links}</Collapse>
                    <a href="#" className={classes.link}>
                        Offer
                    </a>
                    <a href="#" className={classes.link}>
                        Contact
                    </a>



                    <Divider my="sm" />

                    <Group justify="center" grow pb="xl" px="md">
                        <Button variant="default">Log in</Button>
                        <Button>Sign up</Button>
                    </Group>
                </ScrollArea>
            </Drawer>
        </Box>
    );
}