import React, { useEffect, useState, useRef, useCallback } from "react";
import MapView, { Marker } from "react-native-maps";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Animated,
  Modal,
  Pressable,
} from "react-native";
import * as Location from "expo-location";
import theme from "../../assets/theme";
import { useDispatch } from "react-redux";
import { addAddresse } from "../store";

const AnimatedMapView = Animated.createAnimatedComponent(MapView);
const AnimatedMarker = Animated.createAnimatedComponent(Marker);

interface MapProps {
  navigation: any;
}

const Map: React.FC<MapProps> = ({ navigation }) => {
  const [location, setLocation] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();

  const requestPermession = useCallback(async () => {
    let { status } = await Location.requestPermissionsAsync();
    if (status !== "granted") {
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location?.coords);
  }, [Location]);

  const handlePermessionReq = useCallback(() => {
    requestPermession()
      .then((res) => {})
      .catch((e) => handlePermessionReq());
  }, [location]);

  React.useEffect(() => {
    handlePermessionReq();
  }, []);

  const saveAdd = useCallback(() => {
    location &&
      Location.reverseGeocodeAsync({
        latitude: location.latitude,
        longitude: location.longitude,
      })
        .then((res) => {
          if (res.length > 0) {
            let item = res[0];
            const adddress = `${item.city}-${item.subregion || ""}-${
              item.street || ""
            }`;
            dispatch(addAddresse(adddress));
            setModalVisible(!modalVisible);
            navigation.navigate("Addresses");
          }
        })
        .catch((e) => {
          alert(e);
        });
  }, [location]);

  return (
    <View style={styles.container}>
      <AnimatedMapView
        style={styles.map}
        region={{
          latitude: location ? location.latitude : 37.78825,
          longitude: location ? location.longitude : -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <AnimatedMarker
          draggable
          onDragEnd={(e) => {
            setLocation(e.nativeEvent.coordinate);
            setModalVisible(!modalVisible);
          }}
          coordinate={{
            latitude: location ? location.latitude : 37.78825,
            longitude: location ? location.longitude : -122.4324,
          }}
          title={"Position"}
        />
      </AnimatedMapView>
      <Modal
        style={{
          backgroundColor: "red",
          alignItems: "center",
          justifyContent: "center",
        }}
        transparent
        animationType="slide"
        visible={modalVisible}
      >
        <View style={styles.centeredView}>
          <Text style={styles.modalText}>Add this Addresse?</Text>
          <View style={styles.buttonContainer}>
            <Pressable
              style={[styles.openButton, { backgroundColor: "#2196F3" }]}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={styles.buttonLabel}>Cancel</Text>
            </Pressable>
            <Pressable
              style={[styles.openButton]}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={styles.buttonLabel} onPress={saveAdd}>
                Confirm
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  centeredView: {
    backgroundColor: theme.colors.white,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    height: 200,
    width: "80%",
    alignSelf: "center",
    borderRadius: 15,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonLabel: {
    color: "white",
    fontSize: 14,
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginLeft: 10,
    width: 100,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Map;
