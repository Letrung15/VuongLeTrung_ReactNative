import { Text, View, Pressable, Image,ToastAndroid } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { getProductById } from "../features/firebase/product";
import ProductContext from "../features/productContext";
import { ScrollView } from "react-native-gesture-handler";
import { addToCart } from "../features/firebase/cart";
import { SafeAreaView } from "react-native-safe-area-context";
import CartContext from "../features/cartContext";


const DetailScreen = ({navigation,route}) => {
  const {currentProduct:product,setCurrentProduct}= useContext(ProductContext);
  const {setCartItems}=useContext(CartContext) 
  const id=route.params.productId;

  const [qty,setQty]=useState(1);

  const increment =()=>{
    setQty(prev=>prev+1)
  }
  const decrement =()=>{
    if(qty>1){
      setQty(prev=>prev-1)
    }
  }

  const goBack =() => {
    navigation.goBack()
  }

  const addItemToCart = async() => {
    const res = await addToCart(id,qty)
    if(res.success===true){
      ToastAndroid.show("Sản phẩm đã thêm vào giỏ hàng",ToastAndroid.BOTTOM)
      setCartItems(res.data)
    }
  }

  const fetchProductById =async(id) =>{
    const result = await getProductById(id)
    setCurrentProduct(result)
  }

  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  const toggleDescription = () => {
    setIsDescriptionExpanded(!isDescriptionExpanded);
  };

  useEffect(()=>{
    fetchProductById(id)
  },[id])

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ backgroundColor: 'black', width: '100%' }}>
        <Pressable onPress={goBack} style={{marginTop: 2,position: 'absolute',zIndex: 10,top: 4,justifyContent: 'center',alignItems: 'center',height: 40,width: 40,marginLeft: 4,borderRadius: 20,backgroundColor: 'black',
          }}>
          <MaterialIcons name="chevron-left" size={34} color={"#fff"} />
        </Pressable>
          <Image source={{uri:product?.image}} style={{resizeMode:"cover" , height: 470}} />
      </View>

      <View style={{ borderRadius: 30, backgroundColor: 'white', marginTop: -20, padding: 5 }}>
        <View>
        <View className="flex-row justify-between">
            <View>
                <Text className="font-extrabold text-lg">{product?.title}</Text>
                <Text className="text-xs text-gray-500">{product?.brand}</Text>
            </View>
            <View>
                <View className="flex-row justify-center items-center">
                <Pressable className="px-3 py-1 bg-gray-300 border border-gray-300 rounded-tl-lg
                 rounded-bl-lg" onPress={decrement}>
                    <Text className="font-semibold">-</Text>
                </Pressable>
                <Text className="bg-white px-2 py-1 border border-gray-300"  >{qty}</Text>
                <Pressable className="px-3 py-1 bg-gray-300 border border-gray-300 rounded-tr-lg rounded-br-lg" onPress={increment}>
                    <Text>+</Text>
                </Pressable>
                </View>
            </View>
        </View>
        {/* <View className="mt-6">
          <Text className="font-extrabold mb-3">Size</Text>
          <View className="flex-row justify-evenly">
          {sizes.map((size) => (
            <View className="justify-center items-center rounded-full w-10 h-10 bg-white border border-gray-300">
                <Text>{size}</Text>
            </View>
          ))}
          </View>
        </View> */}
        <View style={{ marginTop: 6 }}>
          <Text style={{ fontWeight: 'bold', marginBottom: 3 }}>Thông tin sản phẩm</Text>
          <ScrollView style={{ height: 100 }}>
          <Text style={{ color: 'gray', fontSize: 15 }}>
            {isDescriptionExpanded
              ? product?.description
              : `${product?.description.slice(0, 300)}...`}
          </Text>
          </ScrollView>
              {product?.description.length > 300 && (
          <Pressable onPress={toggleDescription} style={{ marginTop: 2 }}>
            <Text style={{ color: 'blue' }}>{isDescriptionExpanded ? 'Thu gọn' : 'Xem thêm'}</Text>
          </Pressable>
          )}
        </View>
        </View>
      </View>
    <View style={{ position: 'absolute', bottom: 10, left: 0, width: '100%', paddingHorizontal: 4 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
        <View >
          <Text className="text-gray-500 mb-[-4px]">Giá </Text>
          <Text className="font-bold text-lg">{product?.price}VNĐ</Text>
        </View>
        <Pressable onPress={addItemToCart} className="items-center bg-black px-6 py-3 rounded-3xl" >
          <Text className="text-white font-semibold">Thêm vào giỏ hàng</Text>
        </Pressable>
      </View>
      </View>
    </SafeAreaView>
  );
};

export default DetailScreen;

