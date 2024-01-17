import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../../firebase";

export const getProducts = async () => {
  try {
    const productsRef = collection(db, "products");
    console.log(productsRef);
    const productsSnapshot = await getDocs(productsRef);
    const products = productsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return products;
  } catch (error) {
    console.error(error);
  }
};

export const getProductById = async (productId) => {
  try {
    // console.log("prod", productId);
    const productRef = doc(db, "products", productId);
    // console.log(productRef);
    const productSnapshot = await getDoc(productRef);
    const product = { id: productSnapshot.id, ...productSnapshot.data() };
    return product;
  } catch (error) {
    console.error(error);
  }
};
export const getProductsByName = async (productName) => {
  const productsRef = collection(db, "products");

  const q = query(productsRef, where("title", ">=", productName));

  const querySnapshot = await getDocs(q);

  const products = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return products;
};
export const getProductByCategory = async (brand) => {
  const productsRef = collection(db, "products");
  const q = query(productsRef, where("brand", "==", brand));
  console.log('Áo sơ mi',q)
  const querySnapshot = await getDocs(q);

  const products = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
console.log(products)
  return products;
};
