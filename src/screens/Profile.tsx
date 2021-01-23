import React, { useCallback, useState, useRef } from "react";
import { View, Text, StyleSheet, Pressable, StatusBar } from "react-native";
import theme from "../../assets/theme";
import Header from "../components/common/Header";
import * as Permissions from "expo-permissions";
import ToastComponent, { ShowToast } from "../components/common/Toast";
import { useFocusEffect } from "@react-navigation/native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    backgroundColor: "#1E49AF",
    padding: 20,
    width: "80%",
    borderRadius: 10,
    marginBottom: 15,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    color: theme.colors.white,
  },
});

interface ProfileProps {
  navigation: any;
}

const Profile: React.FC<ProfileProps> = ({ navigation }) => {
  const [messageType, setMessageType] = useState("");
  const toastRef = useRef<any>();

  const [
    locationPermission,
    askForLocationPermission,
  ] = Permissions.usePermissions(Permissions.LOCATION);
  const [np, askNotifPerm] = Permissions.usePermissions(
    Permissions.NOTIFICATIONS
  );

  const requestLocationPermession = useCallback(() => {
    if (!locationPermission || locationPermission.status !== "granted") {
      askForLocationPermission();
    } else {
      setMessageType("success");
      toastRef.current.show(
        <ShowToast message={`Location permession granted`} type="success" />
      );
    }
  }, [locationPermission]);

  const requestNotificationPermession = useCallback(() => {
    if (!np || np.status !== "granted") {
      askNotifPerm();
    } else {
      setMessageType("success");
      toastRef.current.show(
        <ShowToast
          message={`Notifications permession granted`}
          type="success"
        />
      );
    }
  }, [np]);

  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle("light-content");
    }, [])
  );

  return (
    <View style={styles.container}>
      <Header title="Profile" rightIcon="shoppingcart" />
      <View style={{ marginTop: 25 }}>
        <Pressable style={styles.button} onPress={() => {}}>
          <Text style={styles.text}>Rtl</Text>
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={requestNotificationPermession}
        >
          <Text style={styles.text}>Enable Notifications</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={requestLocationPermession}>
          <Text style={styles.text}>Enable Location</Text>
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() => {
            navigation.navigate("Addresses");
          }}
        >
          <Text style={styles.text}>Addresses</Text>
        </Pressable>
      </View>
      <ToastComponent
        ref={toastRef}
        position="center"
        messageType={messageType}
      />
    </View>
  );
};

export default Profile;
