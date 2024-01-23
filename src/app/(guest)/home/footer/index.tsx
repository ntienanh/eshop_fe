"use client"
import {
    ActionIcon,
    Box,
    Burger,
    Button,
    CloseButton,
    Collapse,
    Divider,
    Drawer,
    Group,
    Input,
    ScrollArea,
    Text,
    ThemeIcon,
    UnstyledButton,
    rem,
    useComputedColorScheme,
    useMantineColorScheme,
    useMantineTheme
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
    IconBook,
    IconChartPie3,
    IconCode,
    IconCoin,
    IconFingerprint,
    IconMoonStars,
    IconNotification,
    IconSearch,
    IconSun
} from '@tabler/icons-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { ReactNode, useState } from 'react';

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
interface HeaderProps {
    children?: ReactNode;
}

const Footer: React.FC<HeaderProps> = ({ children }) => {
    return (
        <div>Footer</div>
    );
}
export default Footer