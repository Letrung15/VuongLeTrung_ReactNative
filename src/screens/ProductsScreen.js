import { Text, View, Image, ScrollView, Pressable } from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";

import { SafeAreaView } from "react-native-safe-area-context";
import {
  getProductByName,
  getProductsByName,
} from "../features/firebase/product";
import ProductContext from "../features/productContext";
import NewArrivalsCard from "../components/NewArrivalsCard";

const ProductsScreen = ({ route }) => {
  const { search } = route.params;
  const [products, setProducts] = useState([]);

  const fetchProductsByName = async (productName) => {
    try {
      const result = await getProductsByName(productName);
      setProducts(result);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProductsByName(search);
  }, [search]);
  return (
    <View className="mt-9">
      <View className="flex-row justify-between items-center px-5">
        <Text className="text-lg font-extrabold">Tìm kiếm: <Text style={{ color: "green" }}>{search}</Text></Text>
       
      </View>
      <ScrollView
        className="mt-4 ml-5"
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        {products?.map((product) => (
          <Pressable
            key={product.id}
            onPress={() =>
              navigation.navigate("detailscreen", { productId: product.id })
            }
          >
            <NewArrivalsCard
              title={product.title}
              image={product.image}
              price={product.price}
              brand={product.brand}
            />
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
};

export default ProductsScreen;
