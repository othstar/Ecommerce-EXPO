import { StyleSheet, View } from "react-native";
import React from "react";
import HomeHeader from "../../components/headers/HomeHeader";
import AppSaveView from "../../components/views/AppSaveView";
import CartItem from "../../components/cart/CartItem";
import TotalsView from "../../components/cart/TotalsView";
import { FlatList } from "react-native-gesture-handler";
import { sharedPaddingHorizontal } from "../../styles/SharedStyles";
import AppButton from "../../components/buttons/AppButton";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import {
  addItemToCart,
  removeItemFromCart,
  removeProductFromCart,
} from "../../store/reducers/cartSlice";
import { shippingFees, taxes } from "../../constants/constants";
import EmptyCart from "./EmptyCart";
import { useTranslation } from "react-i18next";

const CartScreen = () => {
  const navigation = useNavigation();
  const { items } = useSelector((state: RootState) => state.cartSlice);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const totalProductsPricesSum = items.reduce((acc, item) => acc + item.sum, 0);
  const orderTotal = totalProductsPricesSum + taxes + shippingFees;

  return (
    <AppSaveView>
      <HomeHeader />

      {items.length > 0 ? (
        <View style={{ paddingHorizontal: sharedPaddingHorizontal, flex: 1 }}>
          <FlatList
            data={items}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => {
              return (
                <CartItem
                  {...item}
                  price={item.sum}
                  onDecreasePress={() => dispatch(removeItemFromCart(item))}
                  onDeletePress={() => dispatch(removeProductFromCart(item))}
                  onIncreasePress={() => dispatch(addItemToCart(item))}
                />
              );
            }}
            showsVerticalScrollIndicator={false}
          />

          <TotalsView
            itemsPrice={totalProductsPricesSum}
            orderTotal={orderTotal}
          />
          <AppButton
            onPress={() => navigation.navigate(t("cart_checkout_screen"))}
            title={t("cart_continue_button")}
          />
        </View>
      ) : (
        <EmptyCart />
      )}
    </AppSaveView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({});
