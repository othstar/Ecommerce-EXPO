import AsyncStorage from "@react-native-async-storage/async-storage";
import cartSlice from "../reducers/cartSlice";
import { persistReducer } from "redux-persist";

const persistConfig = {
  key: "cart",
  storage: AsyncStorage,
  whitelist: ["items"],
};

export const persistedCartSlice = persistReducer(persistConfig, cartSlice);
