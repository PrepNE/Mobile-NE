import axios from "@/lib/axios.config";
import { Expenses } from "@/types";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useToast } from "react-native-toast-notifications";
import useSWR from "swr";



export default function useExpenses() {

    const router = useRouter();
    const toast = useToast();

    const [deletingExpense, setDeletingExpense] = useState(false)
    const [addingExpense, setAddingExpense] = useState(false);
    const [updatingExpense, setUpdatingExpense] = useState(false);

    const { data: allExpenses, mutate: mutatingExpenses, error: errorFetchingExpenses } = useSWR<Expenses[]>("/expenses",
        async (url: string) => {
            const { data } = await axios.get(url);
            return data;
        }
    )


    const expenses = allExpenses ? allExpenses.slice(0, 100) : [];

    const getExpenseById = async (expenseId: number) => {
        try {
            const { data } = await axios.get(`/expenses/${expenseId}`);
            return data;
        } catch (error: any) {
            toast.show("Error while retrieving expense detail", {
                type: "danger",
            });
            console.error("Error while retrieving expense detail: ", error?.message)
            router.replace("/(root)/(tabs)/expenses");
        }
    }

    const createExpense = async (expenseData: Partial<Expenses>) => {
        setAddingExpense(true);
        try {
            await axios.post("/expenses", expenseData);
            await mutatingExpenses();
            toast.show("Expense created successfully", { type: "success" });
            router.replace("/(root)/(tabs)/expenses");
        } catch (error: any) {
            toast.show("Failed to create expense", { type: "danger" });
            console.error("Create expense error:", error?.message);
        } finally {
            setAddingExpense(false);
        }
    };

    const updateExpense = async (expenseId: number, expenseData: Partial<Expenses>) => {
        setUpdatingExpense(true);
        try {
            await axios.put(`/expenses/${expenseId}`, expenseData);
            await mutatingExpenses();
            toast.show("Expense updated successfully", { type: "success" });
            router.back();
        } catch (error: any) {
            toast.show("Failed to update expense", { type: "danger" });
            console.error("Update expense error:", error?.message);
        } finally {
            setUpdatingExpense(false);
        }
    };

    const deleteExpense = async (expenseId: number) => {
        setDeletingExpense(true);
        try {
            await axios.delete(`/expenses/${expenseId}`);
            await mutatingExpenses();
            router.replace("/(root)/(tabs)/expenses");
            toast.show("Expense deleted successfully", { type: "success" });
        } catch (error: any) {
            toast.show("Failed to delete expense", { type: "danger" });
            console.error("Delete expense error:", error?.message);
        } finally {
            setDeletingExpense(false);
        }
    };

    return {
        expenses,
        errorFetchingExpenses,
        fetchingExpenses: !expenses && !errorFetchingExpenses,
        mutatingExpenses,
        deletingExpense,
        addingExpense,
        getExpenseById,
        createExpense,
        deleteExpense,
        updateExpense,
        updatingExpense
    }
}