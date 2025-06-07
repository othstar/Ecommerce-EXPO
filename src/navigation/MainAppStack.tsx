import { createStackNavigator } from "@react-navigation/stack";
import AuthStack from "./AuthStack";
import MainAppBottomTabs from "./MainAppBottomTabs";
import CheckoutScreen from "../screens/cart/CheckoutScreen";
import MyOrderScreen from "../screens/profile/MyOrderScreen";

const Stack = createStackNavigator();

export default function MainAppStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="AuthStack" component={AuthStack} />
      <Stack.Screen name="BottomTabs" component={MainAppBottomTabs} />
      <Stack.Screen
        name="CheckoutScreen"
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
