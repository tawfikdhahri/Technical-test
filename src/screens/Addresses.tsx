import React from "react";
import { View, Text, FlatList, StyleSheet, Pressable } from "react-native";
import { Entypo as Icon, AntDesign } from "@expo/vector-icons";

import theme from "../../assets/theme";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 14,
    color: "black",
    marginLeft: 15,
  },
  addressContainer: {
    paddingHorizontal: 15,
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderColor: theme.colors.primary,
    marginBottom: 15,
    borderRadius: 15,
  },
  addButton: {
    position: "absolute",
    bottom: 30,
    right: 30,
    width: 40,
    height: 40,
    borderRadius: 25,
    backgroundColor: theme.colors.secondary,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 100,
  },
});

interface AddressesProps {
  navigation: any;
}

const Addresses: React.FC<AddressesProps> = ({ navigation }) => {
  const {
    addresseReducer: { addresses },
  } = useSelector((state: RootState) => state);

  const _renderAddresse = ({ item }: { item: string }): JSX.Element => {
    return (
      <View style={styles.addressContainer}>
        <Icon name="location-pin" size={24} color={theme.colors.black} />
        <Text style={styles.text}>{item}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        style={{
          flex: 1,
          marginTop: 30,
          marginHorizontal: 20,
        }}
        data={addresses}
        renderItem={_renderAddresse}
        keyExtractor={(item, index) => `${item}${index}`}
        ListEmptyComponent={() => (
          <View
            style={[
              styles.container,
              {
                alignItems: "center",
                justifyContent: "center",
              },
            ]}
          >
            <Text>No addresses</Text>
          </View>
        )}
      />
      <Pressable
        style={styles.addButton}
        onPress={() => navigation.navigate("Map")}
      >
        <AntDesign name="plus" size={24} color={theme.colors.white} />
      </Pressable>
    </View>
  );
};

export default Addresses;
