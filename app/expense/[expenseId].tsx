import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import useExpenses from "@/hooks/useExpenses";
import { usePathname, useRouter } from "expo-router";
import { useToast } from "react-native-toast-notifications";
import { Expenses } from "@/types";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { formatAmount, formatDate } from "@/utils";

const ExpenseDetails = () => {
  const { getExpenseById, deleteExpense } = useExpenses();
  const router = useRouter();
  const toast = useToast();
  const pathname = usePathname();
  const [expense, setExpense] = useState<Expenses | null>(null);
  const [loading, setLoading] = useState(true);

  const expenseId = useMemo(() => {
    return parseInt(pathname.split("/")[2]);
  }, [pathname]);

  useEffect(() => {
    const fetchExpenseDetails = async () => {
      setLoading(true);
      try {
        const expenseData = await getExpenseById(expenseId);
        if (expenseData) {
          setExpense(expenseData);
        } else {
          toast.show("Expense not found", { type: "error" });
          router.back();
        }
      } catch (error) {
        toast.show("Failed to load expense", { type: "error" });
        router.back();
      } finally {
        setLoading(false);
      }
    };

    if (expenseId) {
      fetchExpenseDetails();
    }
  }, [expenseId]);

  const handleDeleteExpense = async () => {
    await deleteExpense(expenseId);
  }



  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-white justify-center items-center">
        <ActivityIndicator size="large" color="#3B82F6" />
        <Text className="text-gray-500 mt-4">Loading expense details...</Text>
      </SafeAreaView>
    );
  }

  if (!expense) {
    return (
      <SafeAreaView className="flex-1 bg-white justify-center items-center">
        <Ionicons name="alert-circle-outline" size={64} color="#EF4444" />
        <Text className="text-red-500 text-lg mt-4">Expense not found</Text>
        <TouchableOpacity
          onPress={() => router.back()}
          className="bg-blue-500 px-6 py-3 rounded-full mt-4"
        >
          <Text className="text-white font-medium">Go Back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row justify-between items-center px-4 py-3 border-b border-gray-100">
        <TouchableOpacity
          onPress={() => router.back()}
          className="p-2 rounded-full bg-gray-100"
        >
          <Ionicons name="arrow-back" size={24} color="#374151" />
        </TouchableOpacity>

        <Text className="text-lg font-semibold text-gray-800">
          Expense Details
        </Text>

        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: "/expense/edit/[expenseId]",
              params: { expenseId: String(expense.id) },
            })
          }
          className="p-2 rounded-full bg-gray-100"
        >
          <Ionicons name="create-outline" size={24} color="#374151" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Expense Icon Header */}
        <View className="bg-gradient-to-r from-blue-50 to-indigo-50 px-4 py-8 items-center">
          <View className="w-20 h-20 bg-blue-500 rounded-full justify-center items-center mb-4 shadow-lg">
            <Ionicons name="receipt-outline" size={32} color="white" />
          </View>
          <Text className="text-2xl font-bold text-gray-800 text-center mb-2">
            {expense.name}
          </Text>
          <View className="bg-white px-4 py-2 rounded-full shadow-sm">
            <Text className="text-xs text-gray-500 uppercase tracking-wide">
              Expense ID: {expense.id}
            </Text>
          </View>
        </View>

        {/* Amount Card */}
        <View className="mx-4 -mt-6 bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-6">
          <View className="items-center">
            <Text className="text-sm text-gray-500 mb-2">Total Amount</Text>
            <Text className="text-4xl font-bold text-green-600">
              {formatAmount(parseFloat(expense.amount || "0"))}
            </Text>
          </View>
        </View>

        <View className="px-4">
          {/* Date Information */}
          <View className="bg-gray-50 rounded-xl p-4 mb-4">
            <View className="flex-row items-center mb-2">
              <Ionicons name="calendar-outline" size={20} color="#6B7280" />
              <Text className="text-lg font-semibold text-gray-800 ml-2">
                Date & Time
              </Text>
            </View>
            <Text className="text-gray-600 ml-7">
              {formatDate(expense.createdAt)}
            </Text>
          </View>

          {/* Description */}
          <View className="bg-gray-50 rounded-xl p-4 mb-6">
            <View className="flex-row items-center mb-3">
              <Ionicons name="document-text-outline" size={20} color="#6B7280" />
              <Text className="text-lg font-semibold text-gray-800 ml-2">
                Description
              </Text>
            </View>
            <Text className="text-gray-600 leading-6 ml-7">
              {expense.description || "No description provided"}
            </Text>
          </View>

          {/* Quick Stats */}
          <View className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 mb-6">
            <View className="flex-row items-center mb-3">
              <Ionicons name="analytics-outline" size={20} color="#8B5CF6" />
              <Text className="text-lg font-semibold text-gray-800 ml-2">
                Quick Stats
              </Text>
            </View>
            <View className="ml-7 space-y-2">
              <View className="flex-row justify-between">
                <Text className="text-gray-600">Amount:</Text>
                <Text className="font-semibold text-gray-800">
                  {formatAmount(parseFloat(expense.amount || "0"))}
                </Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="text-gray-600">Created:</Text>
                <Text className="font-semibold text-gray-800">
                  {new Date(expense.createdAt).toLocaleDateString()}
                </Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="text-gray-600">Status:</Text>
                <View className="bg-green-100 px-2 py-1 rounded-full">
                  <Text className="text-xs text-green-700 font-medium">
                    Recorded
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Action Buttons */}
      <View className="px-4 py-4 border-t border-gray-100 bg-white">
        <View className="flex-row space-x-3">
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: "/expense/edit/[expenseId]",
                params: { expenseId: String(expense.id) },
              })
            }
            className="flex-1 bg-blue-500 py-4 rounded-xl flex-row justify-center items-center"
          >
            <Ionicons name="create-outline" size={20} color="white" />
            <Text className="text-white font-bold text-lg ml-2">
              Edit Expense
            </Text>
          </TouchableOpacity>
          

          <TouchableOpacity
            onPress={handleDeleteExpense}
            className="bg-red-500 px-6 py-4 rounded-xl justify-center items-center"
          >
            <Ionicons name="trash-outline" size={20} color="white" />
          </TouchableOpacity>
        </View>

        
      </View>
    </SafeAreaView>
  );
};

export default ExpenseDetails;