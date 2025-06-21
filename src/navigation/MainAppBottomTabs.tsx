import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/home/HomeScreen";
import CartScreen from "../screens/cart/CartScreen";
import ProfileScreen from "../screens/profile/ProfileScreen";
import { AppColors } from "../styles/colors";
import { s, vs } from "react-native-size-matters";
import { Ionicons } from "@expo/vector-icons";
import { IS_ANDROID } from "../constants/constants";
import { useTranslation } from "react-i18next";

const Tab = createBottomTabNavigator();

export default function MainAppBottomTabs() {
  const { t } = useTranslation();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: AppColors.primary,
        tabBarLabelStyle: {
          marginTop: vs(4),
          fontSize: s(12),
        },
        tabBarStyle: IS_ANDROID && { height: vs(60) },
      }}
    >
      <Tab.Screen
        name={t("tab_home")}
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
          title: t("tab_home"),
        }}
      />
      <Tab.Screen
        name={t("tab_cart")}
        component={CartScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cart" size={size} color={color} />
          ),
          title: t("tab_cart"),
        }}
      />
      <Tab.Screen
        name={t("tab_profile")}
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
          title: t("tab_profile"),
        }}
      />
    </Tab.Navigator>
  );
}
