import { createStackNavigator } from "@react-navigation/stack";
import AuthStack from "./AuthStack";
import MainAppBottomTabs from "./MainAppBottomTabs";
import CheckoutScreen from "../screens/cart/CheckoutScreen";
import MyOrderScreen from "../screens/profile/MyOrderScreen";
import { useTranslation } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUserData } from "../store/reducers/userSlice";
import { useEffect } from "react";
import { RootState } from "../store/store";

const Stack = createStackNavigator();

export default function MainAppStack() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { userData, isLoading } = useSelector(
    (state: RootState) => state.useSlice
  );
  const isUserLoggedIn = async () => {
    try {
      const storedUserData = await AsyncStorage.getItem("USER_DATA");
      console.log("====================================");
      console.log(storedUserData);
      console.log("====================================");
      if (storedUserData) {
        dispatch(setUserData(JSON.parse(storedUserData)));
      } else {
        dispatch(setLoading(false));
      }
    } catch (error) {
      console.error("Error reading stored user", error);
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    isUserLoggedIn();
  }, []);

  if (isLoading) {
    return null;
  }
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={userData ? "BottomTabs" : "AuthStack"}
    >
      <Stack.Screen name="AuthStack" component={AuthStack} />
      <Stack.Screen name="BottomTabs" component={MainAppBottomTabs} />
      <Stack.Screen
        name={t("cart_checkout_screen")}
        options={{
          headerShown: true,
          headerBackTitle: "Back",
        }}
        component={CheckoutScreen}
      />
      <Stack.Screen
        name="My Orders"
        options={{
          headerShown: true,
          headerBackTitle: "Back",
        }}
        component={MyOrderScreen}
      />
    </Stack.Navigator>
  );
}
