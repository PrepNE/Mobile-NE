import useAuth from "@/hooks/useAuth";
import { router, Stack } from "expo-router";
import { useEffect } from "react";

export default function Layout() {
  const { user } = useAuth();
  useEffect(() => {
    if (user) {
      router.replace("/(root)/(tabs)/expenses");
    }
  }, [user]);
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
