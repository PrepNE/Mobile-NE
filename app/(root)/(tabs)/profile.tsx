import React from 'react';
import { View, Text, Image, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const Profile = () => {
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+250 788 123 456',
    avatar: 'https://i.pravatar.cc/150?img=3',
    joinDate: 'Member since March 2024',
    role: 'Premium User'
  };

  const stats = [
    { label: 'Expenses', value: '124', icon: 'receipt-outline' },
    { label: 'This Month', value: '$2,345', icon: 'trending-up-outline' },
    { label: 'Categories', value: '8', icon: 'grid-outline' },
  ];

  const menuItems = [
    { 
      title: 'Account Settings', 
      icon: 'settings-outline', 
      color: '#3B82F6',
      onPress: () => Alert.alert('Account Settings', 'Navigate to account settings') 
    },
    { 
      title: 'Notifications', 
      icon: 'notifications-outline', 
      color: '#8B5CF6',
      onPress: () => Alert.alert('Notifications', 'Navigate to notification settings') 
    },
    { 
      title: 'Privacy & Security', 
      icon: 'shield-checkmark-outline', 
      color: '#10B981',
      onPress: () => Alert.alert('Privacy', 'Navigate to privacy settings') 
    },
    { 
      title: 'Help & Support', 
      icon: 'help-circle-outline', 
      color: '#F59E0B',
      onPress: () => Alert.alert('Support', 'Navigate to help center') 
    },
    { 
      title: 'About', 
      icon: 'information-circle-outline', 
      color: '#6B7280',
      onPress: () => Alert.alert('About', 'App version and info') 
    },
  ];

  const handleEditProfile = () => {
    Alert.alert('Edit Profile', 'You tapped edit profile.');
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', style: 'destructive', onPress: () => console.log('Logged out') }
      ]
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        {/* Header with Gradient Background */}
        <LinearGradient
          colors={['#3B82F6', '#1D4ED8']}
          className="px-6 pt-8 pb-12 rounded-b-3xl"
        >
          <View className="items-center">
            {/* Avatar with Status Indicator */}
            <View className="relative">
              <Image
                source={{ uri: user.avatar }}
                className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
              />
              <View className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-white" />
            </View>
            
            <Text className="mt-4 text-2xl font-bold text-white">{user.name}</Text>
            <Text className="text-blue-100 text-base mt-1">{user.role}</Text>
            <Text className="text-blue-200 text-sm mt-1">{user.joinDate}</Text>
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

        {/* Contact Information */}
        <View className="px-6 mb-6">
          <Text className="text-lg font-semibold text-gray-800 mb-4">Contact Information</Text>
          <View className="bg-white rounded-2xl shadow-sm p-5 space-y-4">
            <View className="flex-row items-center">
              <View className="w-10 h-10 bg-blue-50 rounded-full items-center justify-center">
                <Ionicons name="mail-outline" size={20} color="#3B82F6" />
              </View>
              <View className="ml-4 flex-1">
                <Text className="text-sm text-gray-500">Email</Text>
                <Text className="text-base text-gray-800 font-medium">{user.email}</Text>
              </View>
            </View>
            
            <View className="h-px bg-gray-100" />
            
            <View className="flex-row items-center">
              <View className="w-10 h-10 bg-green-50 rounded-full items-center justify-center">
                <Ionicons name="call-outline" size={20} color="#10B981" />
              </View>
              <View className="ml-4 flex-1">
                <Text className="text-sm text-gray-500">Phone</Text>
                <Text className="text-base text-gray-800 font-medium">{user.phone}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Menu Items */}
        <View className="px-6 mb-6">
          <Text className="text-lg font-semibold text-gray-800 mb-4">Settings</Text>
          <View className="bg-white rounded-2xl shadow-sm overflow-hidden">
            {menuItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={item.onPress}
                className={`flex-row items-center p-4 ${
                  index !== menuItems.length - 1 ? 'border-b border-gray-100' : ''
                }`}
              >
                <View 
                  className="w-10 h-10 rounded-full items-center justify-center"
                  style={{ backgroundColor: `${item.color}15` }}
                >
                  <Ionicons name={item.icon as any} size={20} color={item.color} />
                </View>
                <Text className="ml-4 text-base text-gray-800 font-medium flex-1">
                  {item.title}
                </Text>
                <Ionicons name="chevron-forward-outline" size={20} color="#9CA3AF" />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Action Buttons */}
        <View className="px-6 pb-8 space-y-3">
          <TouchableOpacity
            onPress={handleEditProfile}
            className="bg-blue-600 py-4 rounded-2xl items-center shadow-md"
          >
            <View className="flex-row items-center">
              <Ionicons name="pencil-outline" size={20} color="white" />
              <Text className="text-white font-semibold text-base ml-2">Edit Profile</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleLogout}
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