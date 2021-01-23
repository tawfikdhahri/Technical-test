import React, { useEffect, useState } from "react";
import { View, StyleSheet, Image, Text, ScrollView } from "react-native";
import { useRoute } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import theme from "../../assets/theme";
import { ProductType } from "../types";
import FetchResult from "../components/common/FetchResult";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 300,
    resizeMode: "contain",
    backgroundColor: "gray",
  },
  subContainer: {
    flex: 1,
    backgroundColor: theme.colors.white,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  description: {
    fontSize: 15,
    fontWeight: "500",
    lineHeight: 20,
    marginTop: 15,
    color: theme.colors.grey2,
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    lineHeight: 20,
    marginTop: 15,
    color: theme.colors.secondary,
  },
});

interface ProductDetailsProps {}

const ProductDetails: React.FC<ProductDetailsProps> = () => {
  const [product, setProduct] = useState<ProductType | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const {
    params: { id },
  } = useRoute();

  useEffect(() => {
    setLoading(true);
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((p) => {
        setProduct(p);
      })
      .catch((e) => console.log(e))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <FetchResult loading={loading}>
        {product && (
          <>
            <Image style={styles.image} source={{ uri: product.image }} />
            <View style={styles.subContainer}>
              <Text style={styles.title}>{product.title}</Text>
              <Text style={styles.description}>{product.description}</Text>
              <Text style={styles.price}>{`${product.price} AED`}</Text>
            </View>
          </>
        )}
      </FetchResult>
    </ScrollView>
  );
};

export default ProductDetails;
