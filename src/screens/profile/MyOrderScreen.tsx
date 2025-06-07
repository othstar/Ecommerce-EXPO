import { StyleSheet, Text, View } from "react-native";
import React from "react";
import AppSaveView from "../../components/views/AppSaveView";
import OrderItemCard from "../../components/Cards/OrderItemCard";
import { sharedPaddingHorizontal } from "../../styles/SharedStyles";
import { FlatList } from "react-native-gesture-handler";

const orderData = [
  {
    id: 1,
    date: "2025-01-01",
    totalAmount: 120.5,
    totalPrice: "$150",
  },
  {
    id: 2,
    date: "2025-01-02",
    totalAmount: 75.0,
    totalPrice: "$90",
  },
  {
    id: 3,
    date: "2025-01-03",
    totalAmount: 200.25,
    totalPrice: "$250",
  },
];

const MyOrderScreen = () => {
  return (
    <AppSaveView style={{ paddingHorizontal: sharedPaddingHorizontal }}>
      <FlatList
        data={orderData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          return <OrderItemCard {...item} />;
        }}
        showsVerticalScrollIndicator={false}
      />
    </AppSaveView>
  );
};

export default MyOrderScreen;

const styles = StyleSheet.create({});
