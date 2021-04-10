import React, { useEffect } from "react";
import { Platform, StyleSheet, View } from "react-native";
import DataStore from "../config/DataStore";
import {
  Avatar,
  Card,
  Colors,
  Divider,
  IconButton,
  List,
  Text,
} from "react-native-paper";
import LightTheme from "../themes/theme";
import { useUserData } from "../config/Hooks";
import StarGroup from "../components/StarGroup";
import * as ImagePicker from "expo-image-picker";

function ProfileView(props) {
  const user = useUserData(DataStore.users.current());
  const places = DataStore.places.all();

  const updateProfilePicture = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert(
        "Permission to access photos is required to update your profile picture!"
      );
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync();
    console.log(result);

    if (!result.cancelled) DataStore.users.edit({ image: { uri: result.uri } });
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
              style={[props.style, { backgroundColor: Colors.grey100 }]}
            />
          ) : (
            <Avatar.Icon icon="account" {...props} />
          )
        }
        right={(props) => (
          <View style={{ flexDirection: "row" }}>
            {/*<IconButton*/}
            {/*  icon="pencil-outline"*/}
            {/*  color={LightTheme.colors.account}*/}
            {/*  {...props}*/}
            {/*  onPress={() => DataStore.users.logout()}*/}
            {/*/>*/}
            <IconButton
              icon="dots-vertical"
              {...props}
              onPress={updateProfilePicture}
            />
          </View>
        )}
        rightStyle={{ marginRight: 12 }}
      />
      <Divider />
      <List.Section title="Details">
        <List.Item
          title="Places Been"
          left={() => (
            <List.Icon icon="map-marker" color={LightTheme.colors.primary} />
          )}
          right={(props) => (
            <View
              {...props}
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginRight: 12,
              }}
            >
              <Text style={{ fontSize: 16 }}>{places.length}</Text>
            </View>
          )}
        />
        <List.Item
          title="Average Rating"
          left={() => (
            <List.Icon icon="star" color={LightTheme.colors.primary} />
          )}
          right={(props) => (
            <StarGroup
              initialRating={
                places.reduce((a, b) => a + (b.rating || 0), 0) / places.length
              }
              size={24}
              editable
              style={{ marginRight: 8 }}
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
    // flexDirection: "row",
    // alignItems: "space-around",
    // justifyContent: "space-around",
  },
});

export default ProfileView;
