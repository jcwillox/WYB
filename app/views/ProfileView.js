import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import DataStore from "../config/DataStore";
import {
  Avatar,
  Card,
  Divider,
  IconButton,
  List,
  Menu,
  Text,
} from "react-native-paper";
import LightTheme from "../config/theme";
import { usePlacesList, useUserData } from "../config/Hooks";
import StarGroup from "../components/StarGroup";
import * as ImagePicker from "expo-image-picker";

function ProfileView({ navigation }) {
  const user = useUserData(DataStore.users.current());
  const places = usePlacesList(DataStore.places.all());

  const [menuVisible, setMenuVisible] = useState(false);
  const showMenu = () => setMenuVisible(true);
  const hideMenu = () => setMenuVisible(false);

  const updateProfilePicture = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert(
        "Permission to access photos is required to update your profile picture!"
      );
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync();
    if (!result.cancelled) {
      DataStore.users.edit({ image: { uri: result.uri } });
    }
  };

  return (
    <View style={styles.container}>
      <Card.Title
        title={user.name}
        subtitle={user.email}
        left={(props) =>
          user.image ? (
            <Avatar.Image
              source={user.image}
              {...props}
              style={[
                props.style,
                { backgroundColor: LightTheme.colors.lightGrey },
              ]}
            />
          ) : (
            <Avatar.Icon icon="account" {...props} />
          )
        }
        right={(props) => (
          <Menu
            visible={menuVisible}
            onDismiss={hideMenu}
            anchor={
              <IconButton icon="dots-vertical" {...props} onPress={showMenu} />
            }
          >
            <Menu.Item
              onPress={() => {
                hideMenu();
                updateProfilePicture();
              }}
              title="Change Picture"
              icon="face-profile"
            />
            <Divider />
            <Menu.Item
              onPress={() => DataStore.users.logout()}
              title="Logout"
              icon="logout-variant"
            />
          </Menu>
        )}
        rightStyle={styles.profileMenuButton}
      />
      <Divider />
      <List.Section title="Details">
        <List.Item
          title="Places"
          left={() => (
            <List.Icon icon="map-marker" color={LightTheme.colors.primary} />
          )}
          right={(props) => (
            <View {...props} style={styles.listItemValue}>
              <Text style={styles.listItemValueText}>{places.length}</Text>
            </View>
          )}
        />
        <List.Item
          title="Average Rating"
          left={() => (
            <List.Icon icon="star" color={LightTheme.colors.primary} />
          )}
          right={() => (
            <StarGroup
              rating={
                places.reduce((a, b) => a + (b.rating || 0), 0) / places.length
              }
              size={24}
              style={styles.starGroup}
            />
          )}
        />
      </List.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: LightTheme.colors.surface,
  },
  starGroup: {
    marginHorizontal: 16,
  },
  listItemValue: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
  },
  listItemValueText: {
    fontSize: 16,
  },
  profileMenuButton: {
    marginHorizontal: 12,
  },
});

export default ProfileView;
