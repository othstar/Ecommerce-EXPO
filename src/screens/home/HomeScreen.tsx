import { StyleSheet, Text, View } from "react-native";
import React from "react";
import AppSaveView from "../../components/views/AppSaveView";
import HomeHeader from "../../components/headers/HomeHeader";
import { s } from "react-native-size-matters";
import { AppFonts } from "../../styles/fonts";

const HomeScreen = () => {
  return (
    <AppSaveView>
      <HomeHeader />
      <Text style={{ fontSize: s(50) }}>HomeScreen</Text>
      <Text style={{ fontSize: s(50), fontFamily: AppFonts.Medium }}>
        HomeScreen
      </Text>
      <Text style={{ fontSize: s(50), fontFamily: AppFonts.Bold }}>
        HomeScreen
      </Text>
    </AppSaveView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
