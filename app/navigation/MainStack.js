import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import ProfileView from "../views/ProfileView";
import MaterialCommunityIcon from "react-native-paper/src/components/MaterialCommunityIcon";
import { Avatar } from "react-native-paper";
import LightTheme from "../config/theme";
import DataStore from "../config/DataStore";
import PlacesView from "../views/PlacesView";
import AddPlaceView from "../views/AddPlaceView";
import { useUserData } from "../config/Hooks";
import AppHeader from "../components/AppHeader";

const Tab = createMaterialBottomTabNavigator();

function MainStack() {
  const user = useUserData(DataStore.users.current());

  return (
    <>
      <AppHeader />
      <Tab.Navigator
        initialRouteName="Profile"
        shifting={true}
        barStyle={{ backgroundColor: LightTheme.colors.surface }}
        activeColor={LightTheme.colors.primary}
      >
        <Tab.Screen
          name="Places"
          component={PlacesView}
          options={{
            tabBarIcon: (props) => (
              <MaterialCommunityIcon
                name="format-list-bulleted"
                size={24}
                {...props}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Add"
          component={AddPlaceView}
          options={{
            tabBarIcon: (props) => (
              <MaterialCommunityIcon name="plus" size={24} {...props} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileView}
          options={{
            tabBarIcon: (props) =>
              user.image ? (
                <Avatar.Image source={user.image} size={24} {...props} />
              ) : (
                <MaterialCommunityIcon name="account" size={24} {...props} />
              ),
          }}
        />
      </Tab.Navigator>
    </>
  );
}

export default MainStack;
