import React, { useMemo } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import useExpenses from '@/hooks/useExpenses';

const ExpenseDetails = () => {
  const { expenses } = useExpenses();

 const totalAmount = useMemo(() => {
  return expenses
    ?.filter(expense => !isNaN(parseFloat(expense.amount)))
    .reduce((sum, expense) => sum + parseFloat(expense.amount), 0) || 0;
}, [expenses]);


  return (
    <SafeAreaView className="flex-1 bg-white px-4">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 24 }}>
        
        {/* Header */}
        <View className="flex-row justify-between items-center py-4 border-b border-gray-200">
          <TouchableOpacity
            onPress={() => router.back()}
            className="p-2 rounded-full bg-gray-100"
            accessibilityLabel="Go back"
          >
            <Ionicons name="chevron-back" size={26} color="#1f2937" />
          </TouchableOpacity>
          <Text className="text-xl font-semibold text-gray-900">Expense Summary</Text>
          <TouchableOpacity
            className="p-2 rounded-full bg-gray-100"
            accessibilityLabel="Edit expenses"
          >
            <Ionicons name="create-outline" size={22} color="#1f2937" />
          </TouchableOpacity>
        </View>

        {/* Total Amount Card */}
        <View className="bg-white mt-6 p-6 rounded-2xl shadow shadow-gray-200 border border-gray-100">
          <Text className="text-base text-gray-500">Total Spent</Text>
          <Text className="text-4xl font-extrabold text-indigo-600 mt-2">
            ${totalAmount.toFixed(2)}
          </Text>
        </View>

        {/* Recent Activity */}
        <View className="mt-6 bg-white p-6 rounded-2xl shadow shadow-gray-200 border border-gray-100">
          <Text className="text-base font-semibold text-gray-700 mb-4">Recent Activity</Text>
          {expenses?.length ? (
            expenses.slice(0, 5).map(({ id, name, amount }) => (
              <View
                key={id}
                className="flex-row justify-between items-center py-3 border-b border-gray-100 last:border-0"
              >
                <Text className="text-gray-800 text-sm font-medium">{name}</Text>
                <Text className="text-sm font-semibold text-gray-700">
                  ${parseFloat(amount).toFixed(2)}
                </Text>
              </View>
            ))
          ) : (
            <Text className="text-gray-400 italic text-center py-6">No recent expenses to display.</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ExpenseDetails;
