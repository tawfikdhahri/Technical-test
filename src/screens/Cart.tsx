import React, { useCallback, useMemo } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { RootState, removeFromCart } from "../store";
import ProductItem from "../components/product/ProductItem";
import { ProductType } from "../types";
import FetchResult from "../components/common/FetchResult";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 30,
  },
});

interface CartProps {}

const Cart: React.FC<CartProps> = () => {
  const { cartReducer } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  const removeProductToCart = useCallback(
    (id: number) => {
      dispatch(removeFromCart(id));
    },

    [cartReducer]
  );

  const _renderItem = ({ item }: { item: ProductType }): JSX.Element => {
    return (
      <ProductItem
        item={item}
        buttonLabel="Remove from cart"
        onPressButton={() => removeProductToCart(item.id)}
      />
    );
  };
  const keyExtractor = useCallback(
    ({ id }: { id: number }): string => id.toString(),
    []
  );

  return (
    <View style={styles.container}>
      <FetchResult loading={false} dataLength={cartReducer.cartProducts.length}>
        <FlatList
          data={cartReducer.cartProducts}
          renderItem={_renderItem}
          keyExtractor={keyExtractor}
        />
      </FetchResult>
    </View>
  );
};

export default Cart;
