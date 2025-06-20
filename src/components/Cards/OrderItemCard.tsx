import { StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";
import {
  commonStyles,
  sharedPaddingHorizontal,
} from "../../styles/SharedStyles";
import { s, vs } from "react-native-size-matters";
import { AppColors } from "../../styles/colors";
import AppText from "../text/AppText";
import { useTranslation } from "react-i18next";

interface OrderItemCardProps {
  totalAmount: number;
  date: string;
  totalPrice: string;
}

const OrderItemCard: FC<OrderItemCardProps> = ({
  totalAmount,
  date,
  totalPrice,
}) => {
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <View style={styles.orderContainer}>
        <AppText style={styles.orderTitle}>{t("order_details_title")}</AppText>
      </View>
      <View style={styles.rowContent}>
        <View>
          <AppText>
            {t("order_total_price")} {totalPrice} {t("totals_currency")}
          </AppText>
          <AppText>
            {t("order_date")} {date}
          </AppText>
        </View>
        <View style={{ alignItems: "flex-end" }}>
          <AppText style={{ color: AppColors.secondaryColor }}>
            {totalAmount} {t("totals_currency")}
          </AppText>
        </View>
      </View>
    </View>
  );
};

export default OrderItemCard;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: AppColors.white,
    paddingHorizontal: sharedPaddingHorizontal,
    paddingVertical: vs(15),
    borderWidth: 1,
    borderRadius: s(5),
    borderColor: AppColors.blueGray,
    ...commonStyles.shadow,
    marginBottom: vs(5),
  },

  orderContainer: {
    borderBottomWidth: 1,
    paddingBottom: vs(5),
  },

  orderTitle: {
    fontSize: s(14),
    color: AppColors.primary,
  },

  rowContent: {
    marginTop: vs(5),
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
