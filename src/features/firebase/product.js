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

export const getProductsByCategory = async (brandName) => {
  // Type checking for brandName
  if (typeof brandName !== 'string' || brandName.trim() === '') {
    throw new Error('Invalid brandName. It must be a non-empty string.');
  }

  const productsRef = collection(db, 'products');
  const q = query(productsRef, where('brand', '==', brandName));

  try {
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log('No matching documents for brand:', brandName);
      return [];
    }

    const products = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return products;
  } catch (error) {
    // Handle specific errors or rethrow
    console.error('Error querying Firestore:', error.message);
    throw error;
  }
};
// export const getProductByCategory = async (brand) => {
//   const productsRef = collection(db, "products");
//   const q = query(productsRef, where("brand", "==", brand));
//   console.log('Áo sơ mi',q)
//   const querySnapshot = await getDocs(q);

//   const products = querySnapshot.docs.map((doc) => ({
//     id: doc.id,
//     ...doc.data(),
//   }));
//   return products;
// };
