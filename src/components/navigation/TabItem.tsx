import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  GestureResponderEvent,
  Text,
} from "react-native";

import { Feather as Icon } from "@expo/vector-icons";

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    alignItems: "center",
  },
  text: {
    fontSize: 12,
    textAlign: "center",
    marginTop: 2,
  },
});

export interface TabItemProps {
  label: string;
  onPress?: (event: GestureResponderEvent) => void;
  isFocused: boolean;
  activeColor: string;
  inactiveColor: string;
  iconName: any;
}

const TabItem: React.FC<TabItemProps> = ({
  label,
  onPress,
  isFocused,
  activeColor,
  inactiveColor,
  iconName,
}) => {
  return (
    <TouchableOpacity activeOpacity={0.9} style={styles.tab} onPress={onPress}>
      <Icon
        size={20}
        color={isFocused ? activeColor : inactiveColor}
        name={iconName}
      />
      <Text
        style={[
          styles.text,
          { color: isFocused ? activeColor : inactiveColor },
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default React.memo(TabItem);
