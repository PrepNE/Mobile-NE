import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import useExpenses from "@/hooks/useExpenses";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useToast } from "react-native-toast-notifications";

const CreateExpense = () => {
  const toast = useToast();
  const { createExpense, addingExpense } = useExpenses();

  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    description: "",
  });

  const handleCreateExpense = async () => {
    const specialCharStartPattern = /^[!@#\$%\^\&*\)\(+=._-]/;

    if (!formData.name.trim() || !formData.amount.trim()) {
      toast.show("Please fill in name and amount", {
        type: "danger",
      });
      return;
    }

    if (specialCharStartPattern.test(formData.name.charAt(0))) {
      toast.show("Name cannot start with a special character", {
        type: "danger",
      });
      return;
    }

    // Validate that amount is a valid number
    const amountPattern = /^\d+(\.\d{1,2})?$/;
    if (!amountPattern.test(formData.amount.trim())) {
      toast.show("Amount must be a valid number (e.g., 12.50)", {
        type: "danger",
      });
      return;
    }

    const amount = parseFloat(formData.amount);
    if (isNaN(amount) || amount <= 0) {
      toast.show("Please enter a valid amount greater than 0", {
        type: "danger",
      });
      return;
    }

    const maxNameLength = 100;
    const maxDescriptionLength = 250;

    if (formData.name.length > maxNameLength) {
      toast.show(`Name cannot be longer than ${maxNameLength} characters`, {
        type: "danger",
      });
      return;
    }

    if (formData.description.length > maxDescriptionLength) {
      toast.show(
        `Description cannot be longer than ${maxDescriptionLength} characters`,
        {
          type: "danger",
        }
      );
      return;
    }

    createExpense(formData);
    handleReset();
  };

  const handleReset = () => {
    setFormData({ name: "", amount: "", description: "" });
  };

  const nameCharCount = formData.name.length;
  const descriptionCharCount = formData.description.length;
  const maxNameLength = 100;
  const maxDescriptionLength = 250;

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
          {/* Header */}
          <View className="px-4 pt-4 pb-3 border-b border-gray-200 bg-white shadow-sm flex-row justify-between items-center">
            <View className="flex-row items-center">
              <Ionicons name="wallet-outline" size={22} color="#3B82F6" />
              <Text className="text-lg font-semibold ml-2 text-gray-800">
                New Expense
              </Text>
            </View>
          </View>

          {/* Content */}
          <View className="p-5 flex-1">
            <View className="mb-6">
              <Text className="text-2xl font-bold text-gray-800">
                Create Expense
              </Text>
              <Text className="text-gray-600 text-base mt-1">
                Track your spending with details
              </Text>
            </View>

            <View className="bg-white p-5 rounded-2xl shadow-md border border-gray-100">
              <View className="mb-6">
                <View className="flex-row justify-between items-center mb-1">
                  <Text
                    className={`text-xs font-medium ${
                      nameCharCount > maxNameLength
                        ? "text-red-500"
                        : nameCharCount > maxNameLength - 20
                        ? "text-yellow-500"
                        : "text-gray-400"
                    }`}
                  >
                    {nameCharCount}/{maxNameLength}
                  </Text>
                </View>
                <CustomInput
                  value={formData.name}
                  label="Expense Name"
                  placeholder="e.g., Lunch at Restaurant"
                  onChangeText={(val) =>
                    setFormData({ ...formData, name: val })
                  }
                  icon={
                    <Ionicons
                      name="receipt-outline"
                      size={20}
                      color="#6B7280"
                    />
                  }
                />
              </View>

              <View className="mb-6">
                <CustomInput
                  value={formData.amount}
                  label="Amount"
                  placeholder="0.00"
                  
                  onChangeText={(val) =>
                    setFormData({ ...formData, amount: val })
                  }
                  keyboardType="decimal-pad"
                  icon={
                    <Ionicons name="cash-outline" size={20} color="#6B7280" />
                  }
                />
              </View>

              <View className="mb-2">
                <View className="flex-row justify-between items-center mb-1">
                  <Text
                    className={`text-xs font-medium ${
                      descriptionCharCount > maxDescriptionLength
                        ? "text-red-500"
                        : descriptionCharCount > maxDescriptionLength - 30
                        ? "text-yellow-500"
                        : "text-gray-400"
                    }`}
                  >
                    {descriptionCharCount}/{maxDescriptionLength}
                  </Text>
                </View>
                <CustomInput
                  value={formData.description}
                  label="Description (Optional)"
                  placeholder="Add notes about this expense..."
                  onChangeText={(val) =>
                    setFormData({ ...formData, description: val })
                  }
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                  icon={
                    <Ionicons
                      name="document-text-outline"
                      size={20}
                      color="#6B7280"
                    />
                  }
                />
              </View>
            </View>

            <View className="flex-row justify-between items-center mt-10 space-x-4">
              <TouchableOpacity
                onPress={handleReset}
                className="flex-row items-center px-4 py-2 bg-gray-100 rounded-lg"
              >
                <Ionicons name="refresh-outline" size={16} color="#6B7280" />
                <Text className="text-gray-600 ml-2 font-medium text-sm">
                  Reset
                </Text>
              </TouchableOpacity>

              <CustomButton
                title="Create Expense"
                onPress={handleCreateExpense}
                loading={addingExpense}
                className="rounded-lg px-8 w-[60%] text-base font-medium"
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default CreateExpense;
