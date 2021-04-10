import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import ProfileView from "../views/ProfileView";
import MaterialCommunityIcon from "react-native-paper/src/components/MaterialCommunityIcon";
import { Appbar, Avatar } from "react-native-paper";
import LightTheme from "../themes/theme";
import DataStore from "../config/DataStore";
import PlacesView from "../views/PlacesView";
import AddPlaceView from "../views/AddPlaceView";
import { useUserData } from "../config/Hooks";

const Tab = createMaterialBottomTabNavigator();

function MainStack() {
  const user = useUserData(DataStore.users.current());

  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="Uber Deets" />
      </Appbar.Header>
      <Tab.Navigator initialRouteName="Profile" shifting={true}>
        <Tab.Screen
          name="Places"
          component={PlacesView}
          options={{
            tabBarIcon: () => (
              <MaterialCommunityIcon
                name="format-list-bulleted"
                size={24}
                color="white"
              />
            ),
            tabBarColor: LightTheme.colors.listing,
          }}
        />
        <Tab.Screen
          name="Add"
          component={AddPlaceView}
          options={{
            tabBarIcon: () => (
              <MaterialCommunityIcon name="plus" size={24} color="white" />
            ),
            tabBarColor: LightTheme.colors.account,
          }}
        />
        {console.log("Theme", LightTheme)}
        <Tab.Screen
          name="Profile"
          component={ProfileView}
          options={{
            tabBarIcon: () =>
              user.image ? (
                <Avatar.Image
                  source={user.image}
                  size={24}
                  style={{ backgroundColor: "white" }}
                />
              ) : (
                <MaterialCommunityIcon name="account" size={24} color="white" />
              ),
            tabBarColor: LightTheme.colors.primary,
          }}
        />
      </Tab.Navigator>
    </>
  );
}

export default MainStack;
