import React, { useEffect } from "react";
import { View, Image, StyleSheet, Text } from "react-native";
import theme from "../../assets/theme";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.black,
    alignItems: "center",
    justifyContent: "center",
  },

  text: {
    fontSize: 18,
    color: theme.colors.white,
  },
});

interface Props {
  navigation: any;
}

const SplashScreen: React.FC<Props> = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: "Main" }],
      });
    }, 1000);
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Ecommerce</Text>
    </View>
  );
};

export default SplashScreen;
