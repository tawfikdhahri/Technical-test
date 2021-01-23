import { StatusBar } from "expo-status-bar";
import React, { useEffect, useCallback } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AppNavigator from "./src/navigation/AppNavigator";
import * as Notifications from "expo-notifications";

import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import store from "./src/store";

import * as Permissions from "expo-permissions";

export default function App() {
  const [permission, askForPermission] = Permissions.usePermissions(
    Permissions.NOTIFICATIONS,
    {
      ask: true,
    }
  );

  const reqNotifPerm = useCallback(async () => {
    const {
      status: existingStatus,
    } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
  }, []);
  useEffect(() => {
    askForPermission();
    // reqNotifPerm();
  }, []);

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <StatusBar translucent style="light" />
        <AppNavigator />
      </Provider>
    </SafeAreaProvider>
  );
}
