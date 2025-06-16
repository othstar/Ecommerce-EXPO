import { StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import AppSaveView from "../../components/views/AppSaveView";
import HomeHeader from "../../components/headers/HomeHeader";
import ProductCard from "../../components/Cards/ProductCard";
import { FlatList } from "react-native-gesture-handler";
import { s, vs } from "react-native-size-matters";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../../store/reducers/cartSlice";
import { getProductsData } from "../../config/dataServices";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const fetchData = async () => {
    const data = await getProductsData();
    setProducts(data);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <AppSaveView>
      <HomeHeader />
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ProductCard
            imageURL={item.imageURL}
            title={item.title}
            price={item.price}
            onAddToCartPress={() => {
              dispatch(addItemToCart(item));
            }}
          />
        )}
        columnWrapperStyle={{
          justifyContent: "space-between",
          marginBottom: vs(10),
        }}
        contentContainerStyle={{
          paddingHorizontal: s(10),
        }}
        showsVerticalScrollIndicator={false}
        numColumns={2}
      />
    </AppSaveView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
