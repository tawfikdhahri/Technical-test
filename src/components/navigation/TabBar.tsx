import React from "react";
import { View, StyleSheet, GestureResponderEvent } from "react-native";
import TabItem from "./TabItem";
import theme from "../../../assets/theme";
import { Feather } from "@expo/vector-icons";

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    backgroundColor: theme.colors.white,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    justifyContent: "center",
    shadowColor: theme.colors.black,
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  itemsWrapper: {},
  tab: {
    paddingHorizontal: 15,
    alignItems: "center",
  },
  text: {
    fontSize: 12,
  },
});

type ItemType = {
  label: string;
  icon: typeof Feather;
  value: string;
  onPress: (event: GestureResponderEvent) => void;
};

interface TabBarProps {
  items: ItemType[];
  focusedValue: string;
}

const TabBar: React.FC<TabBarProps> = ({ items, focusedValue }) => {
  const renderItem = (item: ItemType): JSX.Element => (
    <TabItem
      key={item.value}
      iconName={item.icon}
      label={item.label}
      isFocused={focusedValue === item.value}
      onPress={item.onPress}
      activeColor={theme.colors.secondary}
      inactiveColor={theme.colors.black}
    />
  );

  return (
    <View style={styles.container}>
      {items.map((item) => renderItem(item))}
    </View>
  );
};

export default React.memo(TabBar);
