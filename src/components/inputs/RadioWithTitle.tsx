import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { FC } from "react";
import { s, vs } from "react-native-size-matters";
import { AppColors } from "../../styles/colors";
import AppText from "../text/AppText";

interface RadioWithTitleProps {
  selected: boolean;
  title?: string;
  onPress?: () => void;
}

const RadioWithTitle: FC<RadioWithTitleProps> = ({
  selected,
  title,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.circle}>
        {selected && <View style={styles.innerCircle} />}
      </View>
      <AppText style={styles.title}>{title}</AppText>
    </TouchableOpacity>
  );
};

export default RadioWithTitle;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: vs(5),
  },
  circle: {
    height: s(20),
    width: s(20),
    borderRadius: s(10),
    borderWidth: 2,
    borderColor: AppColors.black,
    alignItems: "center",
    justifyContent: "center",
  },
  innerCircle: {
    height: s(10),
    width: s(10),
    borderRadius: s(5),
    backgroundColor: AppColors.black,
  },
  title: {
    fontSize: s(16),
    marginStart: s(10),
  },
});
