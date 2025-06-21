import { createStackNavigator } from "@react-navigation/stack";
import AuthStack from "./AuthStack";
import MainAppBottomTabs from "./MainAppBottomTabs";
import CheckoutScreen from "../screens/cart/CheckoutScreen";
import MyOrderScreen from "../screens/profile/MyOrderScreen";
import { useTranslation } from "react-i18next";

const Stack = createStackNavigator();

export default function MainAppStack() {
  const { t } = useTranslation();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
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
