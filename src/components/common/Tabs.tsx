import React, { useCallback, useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import theme from "../../../assets/theme";
import { ScrollView } from "react-native-gesture-handler";

export type Option = {
  label: string;
  value: string | number;
};

interface TabsProps {
  options: Option[];
  defaultActiveValue?: number | string;
  onChange: ({ label, value }: Option) => void;
}

type BorderRadiusType = {
  [key: string]: {
    borderTopLeftRadius?: number;
    borderBottomLeftRadius?: number;
    borderTopRightRadius?: number;
    borderBottomRightRadius?: number;
    borderRadius?: number;
  };
};

const styles = StyleSheet.create({
  wrapper: {
    height: 40,
    width: "100%",
  },
  wrapperItem: {
    minWidth: 150,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.white,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  text: {
    fontSize: 14,
    color: theme.colors.black,
    textAlign: "center",
    textTransform: "capitalize",
  },
});

const borderRadius: BorderRadiusType = {
  left: { borderTopLeftRadius: 18, borderBottomLeftRadius: 18 },
  right: { borderTopRightRadius: 18, borderBottomRightRadius: 18 },
  middle: { borderRadius: 0 },
};

const Tabs: React.FC<TabsProps> = ({
  options,
  defaultActiveValue,
  onChange,
}: TabsProps) => {
  const [activeValue, setActiveValue] = useState(defaultActiveValue);

  useEffect(() => {
    if (
      options &&
      options.length > 0 &&
      options.findIndex((item) => defaultActiveValue === item.value) === -1
    ) {
      setActiveValue(options[0].value);
    }
  }, []);

  const _renderItem = useCallback(
    ({ item: { label, value }, index }) => {
      let styleBorderRadius = borderRadius.middle;

      if (options.length === 1) {
        styleBorderRadius = { ...borderRadius.left, ...borderRadius.right };
      } else if (index === 0 || index === options.length - 1) {
        styleBorderRadius =
          index === 0 ? borderRadius.left : borderRadius.right;
      }

      return (
        <TouchableOpacity
          activeOpacity={0.8}
          key={value}
          style={[
            styles.wrapperItem,
            styleBorderRadius,
            {
              shadowColor:
                activeValue === value ? theme.colors.black : "transparent",
              marginRight: index === options.length - 1 ? 0 : 1,
            },
            activeValue === value && {
              backgroundColor: theme.colors.secondary,
            },
          ]}
          onPress={(): void => {
            setActiveValue(value);
            onChange({ label, value });
          }}
        >
          <Text
            style={[
              styles.text,
              {
                fontWeight: activeValue === value ? "bold" : "400",
                color:
                  activeValue === value
                    ? theme.colors.white
                    : theme.colors.black,
              },
            ]}
          >
            {label}
          </Text>
        </TouchableOpacity>
      );
    },
    [setActiveValue, activeValue, options, onChange]
  );

  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      horizontal
      style={styles.wrapper}
    >
      {/* <View style={[styles.wrapper]}> */}
      {options &&
        options.length > 0 &&
        options.map((item, index) => item && _renderItem({ item, index }))}
      {/* </View> */}
    </ScrollView>
  );
};

export default Tabs;
