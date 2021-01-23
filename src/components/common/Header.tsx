import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import theme from "../../../assets/theme";
import { AntDesign as Icon } from "@expo/vector-icons";
import { RootState } from "../../store";
import { useSelector } from "react-redux";

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingHorizontal: 30,
    height: 150,
    backgroundColor: "#f4511e",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  title: {
    fontSize: 18,
    color: theme.colors.white,
    fontWeight: "bold",
  },

  circledBadge: {
    backgroundColor: theme.colors.primary,
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: -5,
    right: -5,
  },
  badgeText: { fontSize: 12, color: theme.colors.white, fontWeight: "bold" },
});

interface Props {
  title: string;
  rightIcon: any;
  onRightClick?: () => void;
}

const Header: React.FC<Props> = ({ title, rightIcon, onRightClick }) => {
  const { cartReducer } = useSelector((state: RootState) => state);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {onRightClick && (
        <Pressable onPress={onRightClick}>
          <Icon size={30} color={theme.colors.white} name={rightIcon} />
          <View style={styles.circledBadge}>
            <Text style={styles.badgeText}>
              {cartReducer.cartProducts.length}
            </Text>
          </View>
        </Pressable>
      )}
    </View>
  );
};

export default Header;
