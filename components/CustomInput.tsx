import { View, Text, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, Image, TextInput } from 'react-native'
import React from 'react'
import { InputFieldProps } from '@/types/types'

const CustomInput = ({
    label,
    icon,
    secureTextEntry = false,
    labelStyle,
    containerStyle,
    inputStyle,
    iconStyle,
    className,
    error,
    editable = true,
    ...props
}: InputFieldProps) => {
  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? 'padding' : 'height'}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View className='my-1 w-full'>
                <Text className={`text-lg mb-3 font-medium ${labelStyle}`}>{label}</Text>
                <View className={`flex flex-row justify-start items-center bg-neutral-200 rounded-full border ${
                    error 
                        ? 'border-red-300 bg-red-50' 
                        : editable 
                        ? 'border-neutral-100' 
                        : 'border-neutral-200 bg-neutral-100'
                } ${containerStyle}`}>
                   {icon && (
                        <View className={`ml-4 ${iconStyle} ${!editable ? 'opacity-50' : ''}`}>
                            {icon}
                        </View>
                   )}
                    <TextInput 
                        className={`rounded-full p-4 text-[15px] flex-1 ${
                            !editable ? 'opacity-50' : ''
                        } ${inputStyle}`}  
                        secureTextEntry={secureTextEntry} 
                        editable={editable}
                        placeholderTextColor={editable ? "#9CA3AF" : "#D1D5DB"}
                        {...props} 
                    />
                </View>
                
                {/* Error Message */}
                {error && (
                    <Text className="text-red-500 text-sm mt-2 ml-4">
                        {error}
                    </Text>
                )}
            </View>
        </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

export default CustomInput