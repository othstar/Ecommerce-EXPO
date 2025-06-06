import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import React, { FC } from "react";
import { AppColors } from "../../styles/colors";
import { IS_ANDROID } from "../../constants/constants";

interface AppSaveViewProps {
  children: React.ReactNode;
  style: ViewStyle;
}

const AppSaveView: FC<AppSaveViewProps> = ({ children, style }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={[styles.container, style]}>{children}</View>
    </SafeAreaView>
  );
};

export default AppSaveView;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: AppColors.white,
    paddingTop: IS_ANDROID ? StatusBar.currentHeight || 0 : 0,
  },
  container: {
    flex: 1,
  },
});
