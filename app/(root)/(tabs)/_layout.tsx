import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        tabBarInactiveTintColor: Colors[colorScheme ?? "light"].tabIconDefault,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: [
          {
            height: Platform.OS === 'ios' ? 90 : 70,
            paddingBottom: Platform.OS === 'ios' ? 25 : 10,
            paddingTop: 10,
            borderTopWidth: 0,
            elevation: 20,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: -3,
            },
            shadowOpacity: 0.1,
            shadowRadius: 6,
          },
          Platform.select({
            ios: {
              position: "absolute",
            },
            default: {},
          }),
        ],
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginTop: 4,
        },
        tabBarIconStyle: {
          marginBottom: -2,
        },
      }}
    >
      <Tabs.Screen
        name="expenses"
        options={{
          title: "Expenses",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon 
              name={focused ? "list" : "list-outline"} 
              color={color} 
              size={24}
            />
          ),
          tabBarAccessibilityLabel: "Expenses - View all your expenses",
        }}
      />

      <Tabs.Screen
        name="create"
        options={{
          title: "Add Expense",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon 
              name={focused ? "add-circle" : "add-circle-outline"} 
              color={color} 
              size={28}
            />
          ),
          tabBarAccessibilityLabel: "Add Expense - Create new expense entry",
          tabBarLabelStyle: {
            fontSize: 11,
            fontWeight: '700',
          },
        }}
      />

      <Tabs.Screen
        name="details"
        options={{
          title: "Details",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon 
              name={focused ? "document-text" : "document-text-outline"} 
              color={color} 
              size={24}
            />
          ),
          tabBarAccessibilityLabel: "Details - View expense details and analytics",
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon 
              name={focused ? "person" : "person-outline"} 
              color={color} 
              size={24}
            />
          ),
          tabBarAccessibilityLabel: "Profile - Manage your account settings",
        }}
      />
    </Tabs>
  );
}