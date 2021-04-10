import React from "react";
import { Appbar } from "react-native-paper";

function NavBar({ navigation, previous, scene }) {
  return (
    <Appbar.Header>
      {previous ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content
        title={scene.descriptor.options.title || scene.route.name}
      />
    </Appbar.Header>
  );
}

export default NavBar;
