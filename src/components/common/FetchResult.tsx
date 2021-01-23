import React, { memo } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import theme from "../../../assets/theme";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

interface Props {
  loading: boolean;
  dataLength?: number;
  children: JSX.Element | null;
}

const FetchResult: React.FC<Props> = ({ loading, dataLength, children }) => {
  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={theme.colors.secondary} />
        </View>
      ) : dataLength === 0 ? (
        <View style={styles.center}>
          <Text>Empty list</Text>
        </View>
      ) : (
        children
      )}
    </View>
  );
};

export default memo(FetchResult);
