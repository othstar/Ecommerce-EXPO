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
import { useTranslation } from "react-i18next";

const SignInScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const schema = yup
    .object({
      email: yup
        .string()
        .email(t("sign_in_email_invalid"))
        .required(t("sign_in_email_required")),
      password: yup
        .string()
        .required(t("sign_in_password_required"))
        .min(6, t("sign_in_password_min_length")),
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
        errorMessage = t("sign_in_error_user_not_found");
      } else if (error.code === "auth/invalid-credential") {
        errorMessage = t("sign_in_error_invalid_credential");
      } else {
        errorMessage = t("sign_in_error_default");
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
        placeholder={t("sign_in_email_placeholder")}
      />

      <AppTextInputController
        control={control}
        name={"password"}
        placeholder={t("sign_in_password_placeholder")}
        secureTextEntry
      />

      <AppText style={styles.appName}>Smart E-Commerce</AppText>

      <AppButton
        title={t("sign_in_login_button")}
        onPress={handleSubmit(onSubmit)}
      />

      <AppButton
        title={t("sign_in_signup_button")}
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
