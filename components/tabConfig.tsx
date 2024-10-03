import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'react-native';
import orderIcon from '@/assets/images/orderIcon.png';
import supportIcon from '@/assets/images/supportIcon.png';
import profileIcon from '@/assets/images/profileIcon.png';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export const tabScreens = [
    {
        name: "index",
        options: {
            title: 'Home',
            tabBarIcon: ({ color, focused }) => (
                <Ionicons name={focused ? 'home' : 'home-outline'} size={24} color={color} />
            ),
        }
    },
    {
        name: "order",
        options: {
            title: 'Order',
            tabBarIcon: ({ color, focused }) => (
                <Image source={orderIcon} style={{ width: 24, height: 24 }} />
            ),
        }
    },
    {
        name: "support",
        options: {
            title: 'Support',
            tabBarIcon: ({ color, focused }) => (
                <Image source={supportIcon} style={{ width: 24, height: 24 }} />
            ),
        }
    },
    {
        name: "profile",
        options: {
            title: 'Account',
            tabBarIcon: ({ color, focused }) => (
                <Image source={profileIcon} style={{ width: 24, height: 24 }} />
            ),
        }
    }
];