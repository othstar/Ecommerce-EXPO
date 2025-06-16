import { StyleSheet, Text, View } from "react-native";
import React from "react";
import AppSaveView from "../../components/views/AppSaveView";
import HomeHeader from "../../components/headers/HomeHeader";
import ProfileSectionButton from "../../components/buttons/ProfileSectionButton";
import { sharedPaddingHorizontal } from "../../styles/SharedStyles";
import AppText from "../../components/text/AppText";
import { s, vs } from "react-native-size-matters";
import { useNavigation } from "@react-navigation/native";

const ProfileScreen = () => {
  const navigation = useNavigation();
  return (
    <AppSaveView>
      <HomeHeader />

      <View style={{ paddingHorizontal: sharedPaddingHorizontal }}>
        <ProfileSectionButton
          title={"My orders"}
          onPress={() => navigation.navigate("My Orders")}
        />
        <ProfileSectionButton title={"Language"} />
        <ProfileSectionButton title={"Logout"} />
      </View>
    </AppSaveView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
