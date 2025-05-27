import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  AccessibilityRole,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import useAuth from '@/hooks/useAuth';
import useExpenses from '@/hooks/useExpenses';
import { formatDate, getInitials } from '@/utils';

const Profile = () => {
  const { user, logout } = useAuth();
  const { expenses } = useExpenses();

  const stats = [
    { label: 'Expenses', value: expenses?.length ?? 0, icon: 'receipt-outline' },
    { label: 'This Month', value: '$2,345', icon: 'trending-up-outline' },
    { label: 'Categories', value: '8', icon: 'grid-outline' },
  ];

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        {/* Header Section with Gradient */}
        <LinearGradient
          colors={['#3B82F6', '#1D4ED8']}
          className="px-6 pt-12 pb-12 rounded-b-3xl"
        >
          <View className="items-center">
            <View className="relative">
              <View className="w-28 h-28 rounded-full bg-gray-200 mb-4 flex items-center justify-center">
                <Text className="text-3xl font-extrabold text-gray-800">
                  {getInitials(user?.username ?? '')}
                </Text>
              </View>
              {/* Online Indicator */}
              <View className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-white" />
            </View>
            <Text
              accessibilityRole="header"
              className="text-3xl font-bold text-white"
            >
              {user?.username?.includes('@')
                    ? user.username.split('@')[0]
                    : user?.username}
            </Text>
            <Text className="text-blue-200 text-sm mt-1">Joined At {formatDate(user?.createdAt ?? '')}</Text> 
          </View>
        </LinearGradient>

        {/* Statistics Cards */}
        <View className="px-6 -mt-10 mb-8">
          <View className="bg-white rounded-2xl shadow-lg p-6 flex-row justify-between">
            {stats.map((stat, index) => (
              <View key={index} className="items-center flex-1 mx-1">
                <View className="w-14 h-14 bg-blue-50 rounded-full items-center justify-center mb-3">
                  <Ionicons
                    name={stat.icon as any}
                    size={28}
                    color="#3B82F6"
                    accessibilityLabel={`${stat.label} icon`}
                  />
                </View>
                <Text className="text-2xl font-semibold text-gray-800">
                  {stat.value}
                </Text>
                <Text className="text-sm text-gray-500 text-center mt-1">
                  {stat.label}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Contact Information */}
        <View className="px-6 mb-8">
          <Text className="text-lg font-semibold text-gray-800 mb-5">
            Contact Information
          </Text>
          <View className="bg-white rounded-2xl shadow-sm p-6 space-y-6">
            {/* Email */}
            <View className="flex-row items-center">
              <View className="w-12 h-12 bg-blue-50 rounded-full items-center justify-center">
                <Ionicons
                  name="mail-outline"
                  size={22}
                  color="#3B82F6"
                  accessibilityLabel="Email icon"
                />
              </View>
              <View className="ml-5 flex-1">
                <Text className="text-sm text-gray-500">Email</Text>
                <Text
                  className="text-base text-gray-800 font-medium"
                  accessibilityRole="text"
                >
                  {user?.username}
                </Text>
              </View>
            </View>

            <View className="h-px bg-gray-100" />

            {/* Phone */}
            <View className="flex-row items-center">
              <View className="w-12 h-12 bg-green-50 rounded-full items-center justify-center">
                <Ionicons
                  name="call-outline"
                  size={22}
                  color="#10B981"
                  accessibilityLabel="Phone icon"
                />
              </View>
              <View className="ml-5 flex-1">
                <Text className="text-sm text-gray-500">Phone</Text>
                <Text
                  className="text-base text-gray-800 font-medium"
                  accessibilityRole="text"
                >
                  +250789935658
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Logout Button */}
        <View className="px-6 pb-10">
          <TouchableOpacity
            onPress={logout}
            className="bg-white border border-red-300 py-4 rounded-2xl items-center flex-row justify-center"
            accessibilityRole="button"
            accessibilityLabel="Logout"
          >
            <Ionicons name="log-out-outline" size={22} color="#EF4444" />
            <Text className="text-red-600 font-semibold text-lg ml-3">
              Logout
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
