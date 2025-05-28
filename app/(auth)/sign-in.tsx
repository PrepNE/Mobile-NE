import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import CustomInput from '@/components/CustomInput';
import CustomButton from '@/components/CustomButton';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import useAuth from '@/hooks/useAuth';

const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [formErrors, setFormErrors] = useState<Record<string, string | null>>({});
  const { login, loading, error, user } = useAuth();

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () =>
      setKeyboardVisible(true)
    );
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () =>
      setKeyboardVisible(false)
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  useEffect(() => {
    if (user) {
      router.replace("/(root)/(tabs)/expenses");
    }
  }, [user]);

  useEffect(() => {
    if (formErrors.username && username) {
      setFormErrors(prev => ({ ...prev, username: null }));
    }
    if (formErrors.password && password) {
      setFormErrors(prev => ({ ...prev, password: null }));
    }
  }, [username, password]);

  useEffect(() => {
    if (error) {
      setFormErrors({});
    }
  }, [error]);

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!username.trim()) {
      errors.username = 'Username is required';
    } else if (username.length < 3) {
      errors.username = 'Username must be at least 3 characters';
    }
    if (!password.trim()) {
      errors.password = 'Password is required';
    } else if (password.length < 4) {
      errors.password = 'Password must be at least 4 characters';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSignIn = async () => {
    setFormErrors({});
    if (!validateForm()) return;

    try {
      await login(username.trim(), password);
    } catch (err) {
      console.log('Login error:', err);
    }
  };

  const handleForgotPassword = () => {
    Alert.alert("Forgot Password", "Please contact your administrator to reset your password.", [
      { text: "OK" },
    ]);
  };

  const handleSignUp = () => {
    Alert.alert("Sign Up", "Please contact your administrator to create a new account.", [
      { text: "OK" },
    ]);
  };

  const handleTestCredentials = () => {
    Alert.alert(
      "Test Credentials",
      "Try using existing usernames from the API. Check your MockAPI dashboard for available users.",
      [{ text: "OK" }]
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1, backgroundColor: '#fff' }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 20, justifyContent: 'center' }}>
          <View className="w-full items-center mb-8">
            <View className="bg-[#0286FF] w-16 h-16 rounded-full items-center justify-center mb-4">
              <Ionicons name="wallet-outline" size={32} color="white" />
            </View>
            <Text className="text-3xl font-bold text-[#0286FF] text-center">Personal Finance Tracker</Text>
            <Text className="text-neutral-500 mt-2 text-center">
              Login to manage your expenses and budgets
            </Text>
          </View>

          {error && (
            <View className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4 flex-row items-center">
              <Ionicons name="alert-circle-outline" size={20} color="#DC2626" />
              <Text className="text-red-600 text-sm ml-2 flex-1">{error}</Text>
            </View>
          )}

          <CustomInput
            label="Username"
            placeholder="Enter your username or email"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
            autoCorrect={false}
            icon={<Ionicons name="person-outline" size={22} color="#666" />}
            error={formErrors.username ?? undefined}
            editable={!loading}
          />

          <CustomInput
            label="Password"
            placeholder="Enter your password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            icon={<Ionicons name="lock-closed-outline" size={22} color="#666" />}
            error={formErrors.password ?? undefined}
            editable={!loading}
          />

          <TouchableOpacity
            onPress={handleForgotPassword}
            className="self-end mt-2 mb-2"
            disabled={loading}
          >
            <Text className="text-[#0286FF] text-sm">Forgot Password?</Text>
          </TouchableOpacity>

          {!isKeyboardVisible && (
            <CustomButton
              title={loading ? "Signing In..." : "Sign In"}
              onPress={handleSignIn}
              className="mt-4"
              disabled={loading || !username.trim() || !password.trim()}
              loading={loading}
            />
          )}

          {!isKeyboardVisible && (
            <TouchableOpacity
              onPress={handleTestCredentials}
              className="self-center mt-4 p-2"
              disabled={loading}
            >
              <Text className="text-neutral-500 text-sm underline">Need test credentials?</Text>
            </TouchableOpacity>
          )}

          <View className="mt-8 p-4 bg-blue-50 rounded-lg">
            <Text className="text-xs text-neutral-600 text-center">
              🔗 Connected to MockAPI{'\n'}
              Personal Finance Tracker v1.0
            </Text>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default SignIn;
