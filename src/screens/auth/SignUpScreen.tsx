import { StyleSheet, Image, Alert } from "react-native";
import React from "react";
import AppSaveView from "../../components/views/AppSaveView";
import { sharedPaddingHorizontal } from "../../styles/SharedStyles";
import { IMAGES } from "../../constants/imagesPathes";
import { s, vs } from "react-native-size-matters";
import AppText from "../../components/text/AppText";
import AppButton from "../../components/buttons/AppButton";
import { AppColors } from "../../styles/colors";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import AppTextInputController from "../../components/inputs/AppTextInputController";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";
import { showMessage } from "react-native-flash-message";
import { useDispatch } from "react-redux";
import { setUserData } from "../../store/reducers/userSlice";
import { useTranslation } from "react-i18next";

const SignUpScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const schema = yup
    .object({
      userName: yup
        .string()
        .required(t("sign_up_username_required"))
        .min(3, t("sign_up_username_min_length")),
      email: yup
        .string()
        .email(t("sign_up_email_invalid"))
        .required(t("sign_up_email_required")),
      password: yup
        .string()
        .min(6, t("sign_up_password_min_length"))
        .required(t("sign_up_password_required")),
    })
    .required();

  type FormData = yup.InferType<typeof schema>;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      Alert.alert("User Created!");
      navigation.navigate("SignInScreen");
      const uerDataObj = {
        uid: userCredential.user.uid,
      };
      dispatch(setUserData(uerDataObj));
    } catch (error: any) {
      let errorMessage = "";
      if (error.code === "auth/email-already-in-use") {
        errorMessage = "This email is already in use";
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "The email address is invalid";
      } else if (error.code === "auth/weak-password") {
        errorMessage = "The password is too weak";
      } else {
        errorMessage = "An error occurred during sign-up";
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
        name={"userName"}
        placeholder={t("sign_up_username_placeholder")}
      />

      <AppTextInputController
        control={control}
        name={"email"}
        placeholder={t("sign_up_email_placeholder")}
      />

      <AppTextInputController
        control={control}
        name={"password"}
        placeholder={t("sign_up_password_placeholder")}
        secureTextEntry={true}
      />

      <AppText style={styles.appName}>Smart E-Commerce</AppText>
      <AppButton
        title={t("sign_up_create_account_button")}
        onPress={handleSubmit(onSubmit)}
      />
      <AppButton
        title={t("sign_up_goto_signin_button")}
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
