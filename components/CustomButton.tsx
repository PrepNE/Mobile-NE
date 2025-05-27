import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import React from 'react'
import { ButtonProps } from '@/types/types'

const getBgVariantStyle = (variant: ButtonProps["bgVariant"], disabled: boolean) => {
  const baseStyle = (() => {
    switch (variant) {
      case "secondary":
        return "bg-gray-500";
      case "danger":
        return "bg-red-500";
      case "success":
        return "bg-green-500";
      case "outline":
        return "bg-transparent border-neutral-300 border-[0.5px]";
      default:
        return "bg-[#0286FF]";
    }
  })();
  
  return disabled ? `${baseStyle} opacity-50` : baseStyle;
};

const getTextVariantStyle = (variant: ButtonProps["textVariant"], disabled: boolean) => {
  const baseStyle = (() => {
    switch (variant) {
      case "primary":
        return "text-black";
      case "secondary":
        return "text-gray-100";
      case "danger":
        return "text-red-100";
      case "success":
        return "text-green-100";
      default:
        return "text-white";
    }
  })();
  
  return disabled ? `${baseStyle} opacity-70` : baseStyle;
};

const CustomButton = ({
    onPress,
    title,
    bgVariant = "primary",
    textVariant = "default",
    IconLeft,
    IconRight,
    className,
    disabled = false,
    loading = false,
    ...props
}: ButtonProps) => {
  const isDisabled = disabled || loading;
  
  return (
     <TouchableOpacity
       onPress={isDisabled ? undefined : onPress}
       disabled={isDisabled}
       className={`w-full rounded-full p-3 flex flex-row justify-center items-center my-5 shadow-md shadow-neutral-400/70 ${getBgVariantStyle(bgVariant, isDisabled)} ${className}`}
       activeOpacity={isDisabled ? 1 : 0.7}
       {...props}
     >
        {loading ? (
          <>
            <ActivityIndicator 
              size="small" 
              color={textVariant === "primary" ? "#000" : "#fff"} 
              style={{ marginRight: 8 }} 
            />
            <Text className={`text-lg font-bold ${getTextVariantStyle(textVariant, isDisabled)}`}>
                {title}
            </Text>
          </>
        ) : (
          <>
            {IconLeft && <IconLeft />}
            <Text className={`text-lg font-bold ${getTextVariantStyle(textVariant, isDisabled)}`}>
                {title}
            </Text>
            {IconRight && <IconRight />}
          </>
        )}
     </TouchableOpacity>
  )
}

export default CustomButton