import React from "react";
import {
  createBottomTabNavigator,
  BottomTabBarProps,
} from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Profile from "../screens/Profile";
import TabBar from "../components/navigation/TabBar";

export type TabParamList = {
  Home: undefined;
  Profile: undefined;
};

const TABS: {
  [key: string]: {
    label: string;
    icon: string;
  };
} = {
  Home: {
    label: "Home",
    icon: "list",
  },
  Profile: {
    label: "Profile",
    icon: "user",
  },
};

const Tab = createBottomTabNavigator<TabParamList>();

const TabBarComponent: React.FC<BottomTabBarProps> = ({
  navigation,
  state,
}): JSX.Element => {
  const items = state.routes.map((route) => {
    return {
      value: route.name,
      //TODO CHANGE TYPE HERE
      icon: TABS[route.name].icon as any,
      label: TABS[route.name].label,
      onPress: (): void => navigation.navigate(route.name),
    };
  });

  return <TabBar items={items} focusedValue={items[state.index].value} />;
};

const TabNavigator: React.FC = () => {
  return (
    <Tab.Navigator tabBar={TabBarComponent}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};
export default TabNavigator;
