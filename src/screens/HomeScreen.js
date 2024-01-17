import { Text, View, Image, ScrollView, Pressable } from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { TextInput } from "react-native-gesture-handler";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import UserLogo from "../../assets/user.png";
import OfferCard from "../components/OfferCard";
import NewArrivalsCard from "../components/NewArrivalsCard";
import { SafeAreaView } from "react-native-safe-area-context";
import AuthenticationModal from "../components/AuthenticationModal";
import AuthContext from "../features/authContext";
import ProductContext from "../features/productContext";
import { getProducts } from "../features/firebase/product";


const Home = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(true);
  const { isLoggedIn,currentUser} = useContext(AuthContext);
  const {products,setProducts} = useContext(ProductContext);
const [search, setSearch] = useState();
  const fetchAllProducts = async () => {
    const result = await getProducts()
    setProducts(result)
  }

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });

    fetchAllProducts()
  }, []);
  const handSearch=()=> {
    navigation.navigate('productsScreen', {search})
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView>
        <View className="flex-row px-5 mt-6 justify-between items-center">
          <View className="bg-black rounded-full w-10 h-10 justify-center items-center">
            <MaterialIcons name="menu" size={24} color={"#fff"} />
          </View>
          {!isLoggedIn &&(
            <Pressable onPress={() => setModalVisible(!modalVisible)} className="flex-row items-center justify-center border border-slate-400 rounded-full ">
              <Image
                source={UserLogo}
                style={{
                  height: 40,
                  width: 40,
                  backgroundColor: "#aaaaaa",
                  borderRadius: 50,
                }}
                />
                <Text className="font-semibold py-2 pr-4 pl-2">Đăng nhập</Text>
            </Pressable>
          )}
        </View>

        <View className="mt-6 px-5">
          <Text className="font-bold text-2xl">Xin chào, <Text className="font-bold text-slate-500">{currentUser?.name}</Text></Text>
        </View>

        <View className="mt-6 px-5">
          <View className="flex-row bg-gray-200 p-2 px-3 items-center rounded-3xl">
            <Pressable onPress={handSearch}>
            <MaterialIcons name="search" size={24} color={"#111"}  className=" columns-1" />
        </Pressable>
             <View className="">
            
            </View>
            <TextInput
              placeholder="Tìm kiếm..."
              placeholderTextColor={"#666666"}
              className="px-2 columns-11"
              value={search}
              onChangeText={(text)=>setSearch(()=>text)}
            />
           
          </View>
        </View>

        <View className="mt-6 p-5">
          <OfferCard />
        </View>
        <View className="mt-4">
          <View className="flex-row justify-between items-center px-5">
            <Text className="text-lg font-extrabold">Tất cả sản phẩm</Text>
            <Pressable onPress={() => navigation.navigate("productlistscreen")}>
              <Text className="text-xs text-gray-500">Xem tất cả</Text>
            </Pressable>
          </View>
          <ScrollView
            className="mt-4 ml-5"
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          >
            {products?.map(product=>
            <Pressable key={product.id} 
            onPress={() => navigation.navigate("detailscreen",
            {productId:product.id})}>
              <NewArrivalsCard title={product.title} image={product.image} price={product.price} brand={product.brand} />
            </Pressable>
              )}
            
          </ScrollView>
        </View>
        <AuthenticationModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
