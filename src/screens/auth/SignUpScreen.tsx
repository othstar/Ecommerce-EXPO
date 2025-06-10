import { StyleSheet, Image } from "react-native";
import React from "react";
import AppSaveView from "../../components/views/AppSaveView";
import { sharedPaddingHorizontal } from "../../styles/SharedStyles";
import { IMAGES } from "../../constants/imagesPathes";
import { s, vs } from "react-native-size-matters";
import AppText from "../../components/text/AppText";
import AppButton from "../../components/buttons/AppButton";
import { AppColors } from "../../styles/colors";
import { useNavigation } from "@react-navigation/native";
import { supabase } from "../../config/supabase";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import AppTextInputController from "../../components/inputs/AppTextInputController";

const schema = yup
  .object({
    userName: yup
      .string()
      .required("Username is required")
      .min(3, "Name must be at least 3 characters"),
    email: yup
      .string()
      .email("Please enter a valid email")
      .required("Email is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  })
  .required();

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

      <AppTextInputController
        control={control}
        name={"userName"}
        placeholder="User Name"
      />

      <AppTextInputController
        control={control}
        name={"email"}
        placeholder="Email"
      />

      <AppTextInputController
        control={control}
        name={"password"}
        placeholder="Password"
        secureTextEntry={true}
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
