import React from "react";
import { StyleSheet, Image } from "react-native";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import AppSaveView from "../../components/views/AppSaveView";
import { sharedPaddingHorizontal } from "../../styles/SharedStyles";
import { IMAGES } from "../../constants/imagesPathes";
import { s, vs } from "react-native-size-matters";
import AppTextInputController from "../../components/inputs/AppTextInputController";
import AppText from "../../components/text/AppText";
import AppButton from "../../components/buttons/AppButton";
import { AppColors } from "../../styles/colors";
import { useNavigation } from "@react-navigation/native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";
import { showMessage } from "react-native-flash-message";
import { useDispatch } from "react-redux";
import { setUserData } from "../../store/reducers/userSlice";

const schema = yup
  .object({
    email: yup
      .string()
      .email("Please enter a valid email")
      .required("Email is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

const SignInScreen = () => {
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      navigation.navigate("BottomTabs");
      console.log(JSON.stringify(userCredential, null, 3));

      const uerDataObj = {
        uid: userCredential.user.uid,
      };
      dispatch(setUserData(uerDataObj));
    } catch (error: any) {
      let errorMessage = "";

      if (error.code === "auth/user-not-found") {
        errorMessage = "User not found";
      } else if (error.code === "auth/invalid-credential") {
        errorMessage = "Wrong Email or Password";
      } else {
        errorMessage = "An error occured during sign-in";
      }
      showMessage({
        type: "danger",
        message: errorMessage,
      });
    }
  };

  return (
    <AppSaveView style={styles.container}>
      <Image source={IMAGES.appLogo} style={styles.logo} />

      <AppTextInputController
        control={control}
        name={"email"}
        placeholder={"Email"}
      />

      <AppTextInputController
        control={control}
        name={"password"}
        placeholder={"Password"}
        secureTextEntry
      />

      <AppText style={styles.appName}>Smart E-Commerce</AppText>

      <AppButton title={"Login"} onPress={handleSubmit(onSubmit)} />

      <AppButton
        title={"Sign Up"}
        style={styles.registerButton}
        textColor={AppColors.primary}
        onPress={() => navigation.navigate("SignUpScreen")}
      />
    </AppSaveView>
  );
};

export default SignInScreen;

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
  registerButton: {
    backgroundColor: AppColors.white,
    borderWidth: s(1),
    marginTop: vs(15),
    borderColor: AppColors.primary,
  },
});
