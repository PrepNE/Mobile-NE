import React from 'react';
import { View, Text, Image, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import useAuth from '@/hooks/useAuth';

const Profile = () => {
  const { user , logout } = useAuth()

  const stats = [
    { label: 'Expenses', value: '124', icon: 'receipt-outline' },
    { label: 'This Month', value: '$2,345', icon: 'trending-up-outline' },
    { label: 'Categories', value: '8', icon: 'grid-outline' },
  ];




  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        <LinearGradient
          colors={['#3B82F6', '#1D4ED8']}
          className="px-6 pt-8 pb-12 rounded-b-3xl"
        >
          <View className="items-center">
            <View className="relative">
              {/* <Image
                source={{ uri: user.avatar }}
                className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
              /> */}
              <View className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-white" />
            </View>
            
            <Text className="mt-4 text-2xl font-bold text-white">{user?.username}</Text>
            {/* <Text className="text-blue-100 text-base mt-1">{user.role}</Text>
            <Text className="text-blue-200 text-sm mt-1">{user.joinDate}</Text> */}
          </View>
        </LinearGradient>

        {/* Stats Cards */}
        <View className="px-6 -mt-8 mb-6">
          <View className="bg-white rounded-2xl shadow-lg p-5">
            <View className="flex-row justify-between">
              {stats.map((stat, index) => (
                <View key={index} className="items-center flex-1">
                  <View className="w-12 h-12 bg-blue-50 rounded-full items-center justify-center mb-2">
                    <Ionicons name={stat.icon as any} size={24} color="#3B82F6" />
                  </View>
                  <Text className="text-xl font-bold text-gray-800">{stat.value}</Text>
                  <Text className="text-sm text-gray-500 text-center">{stat.label}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Contact Information */}        <View className="px-6 mb-6">
          <Text className="text-lg font-semibold text-gray-800 mb-4">Contact Information</Text>
          <View className="bg-white rounded-2xl shadow-sm p-5 space-y-4">
            <View className="flex-row items-center">
              <View className="w-10 h-10 bg-blue-50 rounded-full items-center justify-center">
                <Ionicons name="mail-outline" size={20} color="#3B82F6" />
              </View>
              <View className="ml-4 flex-1">
                <Text className="text-sm text-gray-500">Email</Text>
                <Text className="text-base text-gray-800 font-medium">{user?.username}</Text>
              </View>
            </View>
            
            <View className="h-px bg-gray-100" />
            
            <View className="flex-row items-center">
              <View className="w-10 h-10 bg-green-50 rounded-full items-center justify-center">
                <Ionicons name="call-outline" size={20} color="#10B981" />
              </View>
              <View className="ml-4 flex-1">
                <Text className="text-sm text-gray-500">Phone</Text>
                <Text className="text-base text-gray-800 font-medium">+250789935658</Text>
              </View>
            </View>
          </View>
        </View>

       
 
        <View className="px-6 pb-8 space-y-3">
        
          <TouchableOpacity
            onPress={logout}
            className="bg-white border border-red-200 py-4 rounded-2xl items-center"
          >
            <View className="flex-row items-center">
              <Ionicons name="log-out-outline" size={20} color="#EF4444" />
              <Text className="text-red-500 font-semibold text-base ml-2">Logout</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;