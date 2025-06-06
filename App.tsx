import { StyleSheet, Text, View } from "react-native";
import AppText from "./src/components/text/AppText";
import AppSaveView from "./src/components/views/AppSaveView";
import FlashMessage, { showMessage } from "react-native-flash-message";
import AppButton from "./src/components/buttons/AppButton";
import AppTextInput from "./src/components/inputs/AppTextInput";
import SignInScreen from "./src/screens/auth/SignInScreen";

export default function App() {
  return (
    <>
      <FlashMessage position={"top"} />
      <SignInScreen />
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
