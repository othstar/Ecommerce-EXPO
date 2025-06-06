import { StyleSheet } from "react-native";

import FlashMessage from "react-native-flash-message";

import SignInScreen from "./src/screens/auth/SignInScreen";
import SignUpScreen from "./src/screens/auth/SignUpScreen";

export default function App() {
  return (
    <>
      <FlashMessage position={"top"} />
      {/* <SignInScreen /> */}
      <SignUpScreen />
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
