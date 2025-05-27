import CustomInput from '@/components/CustomInput';
import ExpenseCard from '@/components/ui/ExpenseCard';
import useAuth from '@/hooks/useAuth';
import useExpenses from '@/hooks/useExpenses';
import { getInitials } from '@/utils';
import { Ionicons } from '@expo/vector-icons';
import React, { useMemo, useState } from 'react';
import { ActivityIndicator, FlatList, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Expenses = () => {
  const { expenses, fetchingExpenses } = useExpenses();
  const { user } = useAuth();

  const [searchQuery, setSearchQuery] = useState<string>("");

  // ✅ useMemo for filtered expenses (no infinite re-renders)
  const filteredExpenses = useMemo(() => {
    if (!expenses) return [];

    if (!searchQuery.trim()) return expenses;

    return expenses.filter((expense) =>
      expense.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      expense.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [expenses, searchQuery]);

  return (
    <SafeAreaView className='flex-1 bg-white bg-gray-50'>
      <ScrollView className='px-4' showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="pt-3 pb-4 flex-row justify-between items-center">
          <View className="flex-row items-center">
            <Ionicons name="wallet-outline" size={28} color="#3B82F6" />
            <Text className="text-2xl font-bold ml-2 text-gray-800">Expenses</Text>
          </View>
          {user?.username && (
            <TouchableOpacity className="flex-row items-center bg-blue-50 px-4 py-2 rounded-full relative">
              <Ionicons name="person-circle-outline" size={20} color="#3B82F6" />
              <Text className="text-sm font-medium text-blue-600 ml-2">{getInitials(user?.username)}</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Search Input */}
        <View className='mb-4'>
          <CustomInput
            icon={<Ionicons name="search-outline" size={24} color="#9CA3AF" />}
            placeholder="Search expenses..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            containerStyle="bg-white border-gray-200 rounded-xl"
            inputStyle="text-gray-800"
          />
        </View>

        {/* Header Row */}
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-lg font-semibold text-gray-800">Expenses</Text>
          <Text className="text-sm text-gray-500">
            {filteredExpenses?.length || 0} items
          </Text>
        </View>

        {/* Loading */}
        {fetchingExpenses && (
          <View className="flex-1 justify-center items-center py-20">
            <ActivityIndicator size="large" color="#3B82F6" />
            <Text className="text-gray-500 mt-2">Loading expenses...</Text>
          </View>
        )}

        {/* Expense List */}
        {!fetchingExpenses && filteredExpenses.length > 0 && (
          <FlatList
            data={filteredExpenses}
            renderItem={({ item }) => <ExpenseCard expense={item} />}
            keyExtractor={(item) => item.id.toString()}
            scrollEnabled={false}
            contentContainerStyle={{ paddingBottom: 100 }}
          />
        )}

  
        {!fetchingExpenses && filteredExpenses.length === 0 && (
          <View className="flex-1 justify-center items-center py-20">
            <Ionicons name="search-outline" size={64} color="#D1D5DB" />
            <Text className="text-gray-500 text-lg mt-4">No Expense found</Text>
            <Text className="text-gray-400 text-center mt-2">
              Try adjusting your search
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Expenses;
