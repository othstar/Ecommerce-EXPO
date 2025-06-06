import { StyleSheet } from "react-native";

import FlashMessage from "react-native-flash-message";

import AuthStack from "./src/navigation/AuthStack";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  return (
    <>
      <NavigationContainer>
        <FlashMessage position={"top"} />
        <AuthStack />
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   backgroundColor: "#fff",
  //   alignItems: "center",
  //   justifyContent: "center",
  // },
});
