import React, {
  useEffect,
  useState,
  useMemo,
  useCallback,
  useRef,
} from "react";
import { View, StyleSheet, FlatList, Text } from "react-native";
import { ProductType } from "../types";
import ProductItem from "../components/product/ProductItem";
import FetchResult from "../components/common/FetchResult";
import Header from "../components/common/Header";
import Tabs from "../components/common/Tabs";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, RootState } from "../store";
import ToastComponent, { ShowToast } from "../components/common/Toast";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  tabsContainer: {
    marginVertical: 25,
    marginHorizontal: 15,
  },
});

interface HomeProps {
  navigation: any;
}

const Home: React.FC<HomeProps> = ({ navigation }) => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const { cartReducer } = useSelector((state: RootState) => state);
  const [categories, setCategories] = useState<string[]>([]);
  const [limit, setLimit] = useState<number>(3);

  const [selectedCategory, setSelectedCategory] = useState<any>({
    label: "men clothing",
    value: 0,
  });

  const [messageType, setMessageType] = useState("");

  const dispatch = useDispatch();
  const toastRef = useRef<any>();
  const fetchCategories = useCallback(() => {
    fetch("https://fakestoreapi.com/products/categories")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        let cats = data.map((i: string, index: number) => ({
          label: i,
          value: index,
        }));
        setCategories(cats);
      })
      .catch((e) => console.log("errcat"))
      .finally(() => {
        setIsFetching(false);
        setLoading(false);
      });
  }, []);

  const fetchData = useCallback(() => {
    fetch(
      `https://fakestoreapi.com/products/category/${selectedCategory.label}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setIsFetching(false);
        // let pByCat: any = {};
        // data.map((i: ProductType) => {
        //   if (pByCat[i.category])
        //     pByCat[i.category] = [...pByCat[i.category], i];
        //   else pByCat[i.category] = [];
        // });
        setProducts(data);
      })
      .catch((e) => console.log("errrrr"))
      .finally(() => {
        setIsFetching(false);
        setLoading(false);
      });
  }, [selectedCategory]);

  const onRefresh = async () => {
    setIsFetching(true);
    fetchData();
  };

  useEffect(() => {
    setLoading(true);
    fetchCategories();
    fetchData();
  }, [selectedCategory]);

  console.log(selectedCategory);

  const addProductToCart = useCallback(
    (item: ProductType) => {
      const index = cartReducer.cartProducts.findIndex(
        (i: ProductType) => i.id === item.id
      );

      if (index === -1) {
        dispatch(addToCart(item));
        setMessageType("success");
        toastRef.current.show(
          <ShowToast
            message={`Product ${item.id} has been added to your cart`}
            type="success"
          />
        );
      } else {
        setMessageType("error");
        toastRef.current.show(
          <ShowToast
            message={`Product ${item.id} is already exist`}
            type="error"
          />
        );
      }
    },
    [cartReducer]
  );

  // i didnt use useCallback with this thanks to the extraData in faltlist
  const _renderItem = ({ item }: { item: ProductType }): JSX.Element => {
    return (
      <ProductItem
        item={item}
        buttonLabel="Add to cart"
        onPressItem={() => {
          navigation.navigate("ProductDetails", { id: item.id });
        }}
        onPressButton={() => addProductToCart(item)}
      />
    );
  };

  const keyExtractor = ({ id }: { id: number }): string => id.toString();

  // const tabsCategory = useMemo(() => {
  //   if (productsByCategory)
  //     return Object.keys(productsByCategory).map((i, index) => ({
  //       label: i,
  //       value: index,
  //     }));
  // }, [productsByCategory]);

  const onEndReached = useCallback(() => {}, []);

  return (
    <View style={styles.container}>
      <Header
        title="Product list"
        rightIcon="shoppingcart"
        onRightClick={() => navigation.navigate("Cart")}
      />
      <View style={styles.tabsContainer}>
        <Tabs
          options={categories}
          defaultActiveValue={0}
          onChange={(op) => {
            setSelectedCategory(op);
          }}
        />
      </View>
      <FetchResult loading={loading} dataLength={products.length}>
        <FlatList
          data={products}
          renderItem={_renderItem}
          keyExtractor={keyExtractor}
          extraData={selectedCategory.label}
          refreshing={isFetching}
          onRefresh={onRefresh}
          onEndReached={onEndReached}
          ListEmptyComponent={() => (
            <View
              style={[
                styles.container,
                {
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 50,
                },
              ]}
            >
              <Text>No Products</Text>
            </View>
          )}
        />
      </FetchResult>

      <ToastComponent
        ref={toastRef}
        position="center"
        messageType={messageType}
      />
    </View>
  );
};

export default Home;
