import React from "react";
import { Appbar } from "react-native-paper";
import * as details from "../../app.json";
import DebugMenu from "./DebugMenu";

function AppHeader({ navigation, previous, scene }) {
  let title = details.expo.name;
  if (scene) {
    title = scene.descriptor.options.title || scene.route.name;
  }
  return (
    <Appbar.Header>
      {previous ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content title={title} />
      <DebugMenu />
    </Appbar.Header>
  );
}

export default AppHeader;
