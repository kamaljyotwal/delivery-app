import { Tabs } from 'expo-router';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Image } from 'react-native';
import orderIcon from '@/assets/images/orderIcon.png';
import supportIcon from '@/assets/images/supportIcon.png';
import profileIcon from '@/assets/images/profileIcon.png';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarStyle: {
          height: 60,
          paddingBottom: 5,
        },
      }}>

      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'home' : 'home-outline'} size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="order"
        options={{
          title: 'Order',
          tabBarIcon: ({ color, focused }) => (
            // <Ionicons name={focused ? 'search' : 'search-outline'} size={24} color={color} />
            <Image source={orderIcon} style={{ width: 24, height: 24 }} />
          ),
        }}
      />
      <Tabs.Screen
        name="support"
        options={{
          title: 'Support',
          tabBarIcon: ({ color, focused }) => (
            // <Ionicons name={focused ? 'list' : 'list-outline'} size={24} color={color} />
            <Image source={supportIcon} style={{ width: 24, height: 24 }} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Account',
          tabBarIcon: ({ color, focused }) => (
            // <Ionicons name={focused ? 'person' : 'person-outline'} size={24} color={color} />
            <Image source={profileIcon} style={{ width: 24, height: 24 }} />
          ),
        }}
      />

    </Tabs>
  );
}
