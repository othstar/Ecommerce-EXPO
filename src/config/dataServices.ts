import { collection, doc, getDocs } from "firebase/firestore";
import { auth, db } from "./firebase";
import { store } from "../store/store";

export const getProductsData = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "products"));
    const list = [];

    querySnapshot.forEach((doc) => {
      list.push(doc.data());
    });
    return list;
  } catch (error) {
    console.error("Error fetching data", error);
  }
};

export const fetchUserOrders = async () => {
  try {
    const userIdFromRedux = store.getState().useSlice.userData.uid;
    const userIdFromFireBase = auth.currentUser?.uid;
    const userOrderRef = collection(
      doc(db, "users", userIdFromFireBase),
      "orders"
    );

    const querySnapshot = await getDocs(userOrderRef);

    const orderList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return orderList;
  } catch (error) {
    console.error("Error fetching orders", error);
  }
};
