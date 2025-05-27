import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    RefreshControl,
    ActivityIndicator,
    TextInput,
    StatusBar
} from 'react-native';
import React, { useState, useMemo } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router, useRouter } from 'expo-router';
import useExpenses from '@/hooks/useExpenses';
import { Expenses as ExpenseType } from '@/types';
import { formatAmount, formatDate, getCategoryIcon } from '@/utils';

const ExpenseCard = ({ expense }: { expense: ExpenseType }) => {
    return (
        <TouchableOpacity
         onPress={() => router.push({ pathname: "/expense/[expenseId]", params: { expenseId: expense.id } })}
        className="bg-white rounded-xl mb-3 shadow-sm"
            activeOpacity={0.7}
        >
            <View className="flex-row items-center p-4">
                <View className="w-12 h-12 rounded-full bg-indigo-50 justify-center items-center mr-3">
                    <Ionicons
                        name="wallet-outline" 
                        size={24}
                        color="#6366F1"
                    />
                </View>

                <View className="flex-1">
                    <Text className="text-base font-semibold text-gray-900 mb-1" numberOfLines={1}>
                        {expense.name || 'No description'}
                    </Text>
                    <Text className="text-sm text-gray-500">
                        {formatDate(expense.createdAt)}
                    </Text>
                </View>

                <View className="flex-row items-center">
                    <Text className="text-base font-bold text-red-500 mr-2">
                        -{formatAmount(parseFloat(expense.amount || '0'))}
                    </Text>
                    <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
                </View>
            </View>
        </TouchableOpacity>
    );
};
export default ExpenseCard