import { StyleSheet, Image } from "react-native";
import React, { useState } from "react";
import AppSaveView from "../../components/views/AppSaveView";
import { sharedPaddingHorizontal } from "../../styles/SharedStyles";
import { IMAGES } from "../../constants/imagesPathes";
import { s, vs } from "react-native-size-matters";
import AppTextInput from "../../components/inputs/AppTextInput";
import AppText from "../../components/text/AppText";
import AppButton from "../../components/buttons/AppButton";
import { AppColors } from "../../styles/colors";
import { useNavigation } from "@react-navigation/native";
import { supabase } from "../../config/supabase";
import { useForm, Controller } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = Yup.object().shape({
  userName: Yup.string().required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const SignUpScreen = () => {
  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: {
    userName: any;
    email: any;
    password: any;
  }) => {
    const { userName, email, password } = data;
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { username: userName },
      },
    });
    if (error) {
      alert("Sign up failed: " + error.message);
    } else {
      alert("Sign up successful! Please check your email.");
      navigation.navigate("SignInScreen");
    }
  };

  return (
    <AppSaveView style={styles.container}>
      <Image source={IMAGES.appLogo} style={styles.logo} />

      <Controller
        control={control}
        name="userName"
        render={({ field: { onChange, value } }) => (
          <>
            <AppTextInput
              placeholder="Username"
              onChangeText={onChange}
              value={value}
            />
            {errors.userName && (
              <AppText style={{ color: "red" }}>
                {errors.userName.message}
              </AppText>
            )}
          </>
        )}
      />

      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <>
            <AppTextInput
              placeholder="Email"
              onChangeText={onChange}
              value={value}
              keyboardType="email-address"
            />
            {errors.email && (
              <AppText style={{ color: "red" }}>{errors.email.message}</AppText>
            )}
          </>
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value } }) => (
          <>
            <AppTextInput
              placeholder="Password"
              onChangeText={onChange}
              value={value}
              secureTextEntry
            />
            {errors.password && (
              <AppText style={{ color: "red" }}>
                {errors.password.message}
              </AppText>
            )}
          </>
        )}
      />

      <AppText style={styles.appName}>Smart E-Commerce</AppText>
      <AppButton
        title={"Create New Account"}
        onPress={handleSubmit(onSubmit)}
      />
      <AppButton
        title={"Go To Signin"}
        style={styles.signinButton}
        textColor={AppColors.primary}
        onPress={() => navigation.navigate("SignInScreen")}
      />
    </AppSaveView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingHorizontal: sharedPaddingHorizontal,
  },
  logo: {
    height: s(150),
    width: s(150),
    marginBottom: vs(30),
  },
  appName: {
    fontSize: s(16),
    marginBottom: vs(15),
  },
  signinButton: {
    backgroundColor: AppColors.white,
    borderWidth: s(1),
    marginTop: vs(15),
    borderColor: AppColors.primary,
  },
});
