import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import AppSaveView from "../../components/views/AppSaveView";
import OrderItemCard from "../../components/Cards/OrderItemCard";
import { sharedPaddingHorizontal } from "../../styles/SharedStyles";
import { FlatList } from "react-native-gesture-handler";
import { fetchUserOrders } from "../../config/dataServices";
import { getDateFromFireStoreTimeStampObject } from "../../helpers/dateTimeHelper";

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
  const [orderList, setOrderList] = useState([]);
  const getOrders = async () => {
    const response = await fetchUserOrders();
    setOrderList(response);
  };

  useEffect(() => {
    getOrders();
  }, []);
  return (
    <AppSaveView style={{ paddingHorizontal: sharedPaddingHorizontal }}>
      <FlatList
        data={orderList}
        keyExtractor={(item, index) => item?.id.toString()}
        renderItem={({ item }) => {
          console.log("================ITEM====================");
          console.log(JSON.stringify(item, null, 3));
          console.log("====================================");

          return (
            <OrderItemCard
              date={getDateFromFireStoreTimeStampObject(item.createdAt)}
              totalAmount={item.totalProductsPricesSum}
              totalPrice={item.orderTotal}
            />
          );
        }}
        showsVerticalScrollIndicator={false}
      />
    </AppSaveView>
  );
};

export default MyOrderScreen;

const styles = StyleSheet.create({});
