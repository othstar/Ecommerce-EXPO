import { StyleSheet } from "react-native";
import React from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import AppTextInput from "./AppTextInput";
import { AppColors } from "../../styles/colors";
import AppText from "../text/AppText";
import { s, vs } from "react-native-size-matters";

interface AppTextInputControllerProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  rules?: object;
  placeholder: string;
  secureTextEntry?: boolean;
  keyboardType?: "default" | "email-address" | "numeric";
}

const AppTextInputController = <T extends FieldValues>({
  control,
  name,
  rules,
  placeholder,
  secureTextEntry,
  keyboardType,
}: AppTextInputControllerProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <>
          <AppTextInput
            value={value}
            onChangeText={onChange}
            placeholder={placeholder}
            secureTextEntry={secureTextEntry}
            keyboardType={keyboardType}
            style={error && styles.errorInput}
          />

          {error && <AppText style={styles.textError}>{error.message}</AppText>}
        </>
      )}
    />
  );
};

export default AppTextInputController;

const styles = StyleSheet.create({
  errorInput: {
    borderColor: AppColors.redColor,
  },
  textError: {
    color: AppColors.redColor,
    fontSize: s(12),
    textAlign: "center",
    marginBottom: vs(10),
    marginTop: -vs(5),
  },
});
