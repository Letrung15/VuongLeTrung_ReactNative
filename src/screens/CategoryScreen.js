import { Text, View, Image, ScrollView, Pressable } from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";

import { SafeAreaView } from "react-native-safe-area-context";
import {
    getProductByCategory,
  getProductByName,
  getProductsByName,
} from "../features/firebase/product";
import ProductContext from "../features/productContext";
import NewArrivalsCard from "../components/NewArrivalsCard";

const CategoryScreen = ({ route }) => {
  // const categories = ["Áo sơ mi", "Áo thun", "Quần tây", "Quần âu"];
  const categories = [category, setCategory];
  const [products, setProducts] = useState([]);

  const fetchProductsByCategory = async (category) => {
    try {
      const result = await getProductByCategory(category);
      setProducts(result);
    } catch (error) {
      console.error(error);
    }
  };
   useEffect(() => {
    // Fetch products for the default category (Áo sơ mi in this case)
    fetchProductsByCategory(categories[0]);
  }, []);
   const handleCategoryPress = (category) => {
    // Fetch products for the selected category
    fetchProductsByCategory(category);
  };
  return (
     <View className="mt-12">
      <View className="flex-row justify-between items-center px-3">
        <Text className="text-lg font-extrabold">Danh mục sản phẩm</Text>
      </View>
      <ScrollView
        style={{ marginTop: 4, marginLeft: 5 }}
        horizontal={false} // Set to false to arrange buttons in columns
        showsVerticalScrollIndicator={false}
      >
        {categories.map((category, index) => (
          <Pressable
            key={index}
            style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1 })}
            onPress={() => handleCategoryPress(category)}
          >
            <View
              style={{
                backgroundColor: "#e0e0e0",
                paddingVertical: 10,
                paddingHorizontal: 15,
                marginVertical: 5,
                borderRadius: 8,
              }}
            >
              <Text>{category}</Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>
      {/* Display your products here using the 'products' state */}
      {/* For example, you can map through 'products' and render NewArrivalsCard */}
      {products.map((product, index) => (
        <NewArrivalsCard key={index} product={product} />
      ))}
    </View>
  );
};

export default CategoryScreen;
