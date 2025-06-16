import { Alert, StyleSheet, View } from "react-native";
import React from "react";
import AppSaveView from "../../components/views/AppSaveView";
import {
  commonStyles,
  sharedPaddingHorizontal,
} from "../../styles/SharedStyles";
import { s, vs } from "react-native-size-matters";
import { AppColors } from "../../styles/colors";
import AppTextInputController from "../../components/inputs/AppTextInputController";
import AppButton from "../../components/buttons/AppButton";
import {
  IS_ANDROID,
  IS_IOS,
  shippingFees,
  taxes,
} from "../../constants/constants";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { addDoc, collection, doc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { showMessage } from "react-native-flash-message";
import { useNavigation } from "@react-navigation/native";
import { emptyCart } from "../../store/reducers/cartSlice";

const schema = yup
  .object({
    fullName: yup
      .string()
      .required("Full name is required")
      .min(3, "Name must be at least 3 characters"),

    phoneNumber: yup
      .string()
      .required("Phone number is required")
      .matches(/^[0-9]+$/, "Must be only digits")
      .min(10, "Phone number must be at least 10 digits"),

    detailedAddress: yup
      .string()
      .required("Detailed address is required")
      .min(15, "Please provide a detailed address with at least 15 characters"),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

const CheckoutScreen = () => {
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { userData } = useSelector((state: RootState) => state.useSlice);
  const { items } = useSelector((state: RootState) => state.cartSlice);
  const totalProductsPricesSum = items.reduce((acc, item) => acc + item.sum, 0);
  const orderTotal = totalProductsPricesSum + taxes + shippingFees;
  console.log("=================USERDATA===================");
  console.log(JSON.stringify(userData, null, 3));
  console.log("====================================");

  const saveOrder = async (formData: FormData) => {
    try {
      const orderBody = {
        ...formData,
        items,
        totalProductsPricesSum,
        createdAt: new Date(),
        orderTotal,
      };
      const userOrderRef = collection(doc(db, "users", userData.uid), "orders");
      await addDoc(userOrderRef, orderBody);
      const ordersRef = collection(db, "orders");
      await addDoc(ordersRef, orderBody);

      showMessage({
        type: "success",
        message: "Order placed succesfully",
      });
      navigation.goBack();
      dispatch(emptyCart());
    } catch (error) {
      console.error("Error saving order:", error);
      showMessage({
        type: "danger",
        message: "Error Happen",
      });
    }
  };
  return (
    <AppSaveView>
      <View style={{ paddingHorizontal: sharedPaddingHorizontal }}>
        <View style={styles.inputsContainer}>
          <AppTextInputController
            control={control}
            name={"fullName"}
            placeholder="Full Name"
          />
          <AppTextInputController
            control={control}
            name={"phoneNumber"}
            placeholder="Phone Number"
          />
          <AppTextInputController
            control={control}
            name={"detailedAddress"}
            placeholder="Detailed Address"
          />
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <AppButton title="Confirm" onPress={handleSubmit(saveOrder)} />
      </View>
    </AppSaveView>
  );
};

export default CheckoutScreen;

const styles = StyleSheet.create({
  inputsContainer: {
    ...commonStyles.shadow,
    padding: s(8),
    borderRadius: s(8),
    backgroundColor: AppColors.white,
    marginTop: IS_IOS ? vs(15) : undefined,
    paddingTop: vs(15),
  },
  buttonContainer: {
    paddingHorizontal: sharedPaddingHorizontal,
    position: "absolute",
    width: "100%",
    bottom: IS_ANDROID ? vs(15) : 0,
    borderTopWidth: 1,
    borderColor: AppColors.lightGray,
    paddingTop: vs(10),
  },
});
