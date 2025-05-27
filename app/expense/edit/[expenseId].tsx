import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import useExpenses from "@/hooks/useExpenses";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text, View, KeyboardAvoidingView, Platform, ScrollView, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const EditExpense = () => {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const { getExpenseById, updateExpense, updatingExpense } = useExpenses();

    const [formData, setFormData] = useState({ name: "", amount: "", description: "" });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const expense = await getExpenseById(Number(id));
            console.log("Fetched expense:", expense);
            if (expense) {
                setFormData({
                    name: expense.name,
                    amount: String(expense.amount),
                    description: expense.description || "",
                });
            }
            setLoading(false);
        };
        fetchData();
    }, [id]);

    const handleUpdate = async () => {
        await updateExpense(Number(id), {
            name: formData.name,
            amount: formData.amount,
            description: formData.description,
        });
    };

    if (loading) {
        return (
            <SafeAreaView className="flex-1 items-center justify-center">
                <ActivityIndicator size="large" color="#3B82F6" />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView className="flex-1 bg-white">
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                className="flex-1"
            >
                <ScrollView className="p-5">
                    <Text className="text-2xl font-bold mb-4 text-gray-800">Edit Expense</Text>

                    <CustomInput
                        label="Name"
                        value={formData.name}
                        onChangeText={(val) => setFormData({ ...formData, name: val })}
                        icon={<Ionicons name="receipt-outline" size={20} color="#6B7280" />}
                    />

                    <CustomInput
                        label="Amount"
                        keyboardType="decimal-pad"
                        value={formData.amount}
                        onChangeText={(val) => setFormData({ ...formData, amount: val })}
                        icon={<Ionicons name="cash-outline" size={20} color="#6B7280" />}
                        className="mt-4"
                    />

                    <CustomInput
                        label="Description"
                        multiline
                        numberOfLines={4}
                        value={formData.description}
                        onChangeText={(val) => setFormData({ ...formData, description: val })}
                        icon={<Ionicons name="document-text-outline" size={20} color="#6B7280" />}
                        className="mt-4"
                    />

                    <View className="mt-6">
                        <CustomButton title="Update Expense" onPress={handleUpdate} loading={updatingExpense} />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default EditExpense;
