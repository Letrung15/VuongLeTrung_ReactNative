import React, { useEffect, useState } from "react";
import { Text, View, ScrollView, TouchableOpacity, Pressable } from "react-native";
import { getProductsByCategory } from "../features/firebase/product";
import NewArrivalsCard from "../components/NewArrivalsCard";

const CategoryScreen = ({ route, navigation }) => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("");
  const { brandName = "" } = route.params || {};

  useEffect(() => {
    if (brandName) {
      fetchProductsByCategory(brandName);
      setCategory(brandName);
    }
  }, [brandName]);

  const fetchProductsByCategory = async (brandName) => {
    try {
      const result = await getProductsByCategory(brandName);
      setProducts(result);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View className="mt-9">
      <View className="flex-row justify-between items-center px-3">
        <Text className="text-lg text-2xl font-extrabold">Danh mục:</Text>
      </View>
      <ScrollView
        style={{ marginTop: 5, marginLeft: 13}}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        <TouchableOpacity
          onPress={() => {
            setCategory("Áo sơ mi");
            navigation.setParams({ brandName: "Áo sơ mi" });
            fetchProductsByCategory("Áo sơ mi");
          }}
          style={{padding: 15, borderWidth:1, borderColor: "gray", borderRadius: 5, flex: 1}}
        >
          <Text>Áo sơ mi</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setCategory("Quần tây");
            navigation.setParams({ brandName: "Quần tây" });
            fetchProductsByCategory("Quần tây");
          }}
          style={{padding: 15,borderWidth: 1,borderColor: "gray",borderRadius: 5, flex: 1}}
        >
          <Text>Quần tây</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setCategory("Quần short");
            navigation.setParams({ brandName: "Quần short" });
            fetchProductsByCategory("Quần short");
          }}
          style={{padding: 15, borderWidth:1, borderColor: "gray", borderRadius: 5, flex: 1}}
        >
          <Text>Quần short</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setCategory("Quần jeans");
            navigation.setParams({ brandName: "Quần jeans" });
            fetchProductsByCategory("Quần jeans");
          }}
          style={{padding: 15, borderWidth:1, borderColor: "gray", borderRadius: 5, flex: 1}}
        >
          <Text>Quần jeans</Text>
        </TouchableOpacity>
      </ScrollView>
      <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between'}}>
      {products.map((products) => (
        <Pressable key={products.id}
        onPress={() => navigation.navigate("detailscreen",
            {productId:products.id})}
        style={{ width: '48%', marginBottom: 10, padding: 10, backgroundColor: 'white', borderRadius: 5 }}>
          <NewArrivalsCard
            title={products.title}
            image={products.image}
            price={products.price}
            brand={products.brand}

          />
          {/* Các thông tin khác về sản phẩm */}
        </Pressable>
      ))}
      </View>
    </View>
  );
};

export default CategoryScreen;
