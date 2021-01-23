import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { ParamList } from "./ParamList";
import SplashScreen from "../screens/SplashScreen";
import TabNavigator from "./TabNavigator";
import ProductDetails from "../screens/ProductDetails";
import Cart from "../screens/Cart";
import Addresses from "../screens/Addresses";
import Map from "../screens/Map";

import * as Linking from "expo-linking";
import { Text } from "react-native";

const Stack = createStackNavigator<ParamList>();

const AppNavigator: React.FC = () => {
  //Configure deep linking

  const prefix = Linking.createURL("/");

  const linking = {
    prefixes: [prefix],
    config: {
      screens: {
        ProductDetails: {
          path: "product/:id",
          parse: {
            id: (id: string) => id,
          },
        },
      },
    },
  };
  console.log({ prefix });

  return (
    <NavigationContainer linking={linking} fallback={<Text>Loading...</Text>}>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Main"
          component={TabNavigator}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ProductDetails"
          component={ProductDetails}
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: "#f4511e",
            },
            headerTintColor: "#fff",

            headerTitleStyle: {
              color: "white",
            },
          }}
        />

        <Stack.Screen
          name="Cart"
          component={Cart}
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: "#f4511e",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              color: "white",
            },
          }}
        />
        <Stack.Screen
          name="Addresses"
          component={Addresses}
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: "#f4511e",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              color: "white",
            },
          }}
        />
        <Stack.Screen
          name="Map"
          component={Map}
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: "#f4511e",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              color: "white",
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
