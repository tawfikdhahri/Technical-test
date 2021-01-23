import React, { memo } from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { ProductType } from "../../types";
import theme from "../../../assets/theme";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    shadowColor: "#000",
    borderRadius: 10,
    overflow: "hidden",
    minHeight: 200,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: theme.colors.white,
    marginBottom: 15,
    marginHorizontal: 20,
  },
  image: {
    height: 100,
    resizeMode: "cover",
  },

  subContainer: {
    padding: 10,
  },
  price: {
    fontWeight: "bold",
    color: theme.colors.secondary,
  },
  addToCartButton: {
    padding: 15,
    backgroundColor: theme.colors.primary,
    marginBottom: 10,
    marginHorizontal: 10,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 100,
  },
  badge: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 30,
    height: 30,
    backgroundColor: "#0CD5B1",
    zIndex: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  number: {
    fontWeight: "bold",
    fontSize: 18,
    color: theme.colors.white,
  },
});

interface Props {
  item: ProductType;
  onPressItem?: () => void;
  onPressButton: () => void;
  buttonLabel: string;
  productsNumber?: number;
}

const ProductItem: React.FC<Props> = ({
  item,
  onPressItem,
  buttonLabel,
  onPressButton,
  productsNumber,
}) => {
  return (
    <Pressable onPress={onPressItem} style={styles.container}>
      {productsNumber && (
        <View style={styles.badge}>
          <Text style={styles.number}>{productsNumber}</Text>
        </View>
      )}
      <Image
        source={{ uri: item.image }}
        style={styles.image}
        resizeMethod="resize"
      />
      <View style={styles.subContainer}>
        <Text>{item.title}</Text>
        <Text style={styles.price}>{`${item.price} AED`}</Text>
      </View>
      <Pressable style={styles.addToCartButton} onPress={onPressButton}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
            color: theme.colors.white,
          }}
        >
          {buttonLabel}
        </Text>
      </Pressable>
    </Pressable>
  );
};

export default memo(ProductItem);
