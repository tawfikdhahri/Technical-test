import React, { forwardRef, Component, memo } from "react";

import Toast from "react-native-easy-toast";
import { View, Text } from "react-native";
import theme from "../../../assets/theme";

import { AntDesign as Icon } from "@expo/vector-icons";

interface ToastProps {
  messageType: string;
  position: any;
}

export const ShowToast = memo(
  ({ message, type }: { type: string; message: string }): JSX.Element => (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        padding: 10,
      }}
    >
      <Icon
        name={type === "success" ? "checkcircle" : "exclamationcircle"}
        size={25}
        color={theme.colors.white}
      />
      <Text
        style={{
          color: theme.colors.white,
          marginLeft: 20,
          fontSize: 18,
          lineHeight: 21,
        }}
      >
        {message}
      </Text>
    </View>
  )
);

const ToastComponent = forwardRef<any, ToastProps>(
  ({ messageType, position }, ref) => {
    return (
      <Toast
        ref={ref}
        position={position}
        positionValue={200}
        fadeInDuration={750}
        fadeOutDuration={1000}
        opacity={1}
        style={{
          backgroundColor:
            messageType === "success"
              ? theme.colors.secondary
              : theme.colors.labelError,
          marginHorizontal: 15,
          marginTop: 150,
        }}
      />
    );
  }
);

ToastComponent.displayName = "Toast";

export default memo(ToastComponent);
