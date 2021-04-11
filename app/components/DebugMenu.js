import React, { useState } from "react";
import { Appbar, Menu } from "react-native-paper";
import DataStore from "../config/DataStore";

/**
 * A simple menu component to provide useful features for testing
 */
function DebugMenu() {
  const [visible, setVisible] = useState();
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const loginUser = (email, password) => {
    closeMenu();
    DataStore.users.logout();
    DataStore.users.login({ email: email, password: password });
  };

  return (
    <Menu
      visible={visible}
      onDismiss={closeMenu}
      anchor={<Appbar.Action icon="bug" color="white" onPress={openMenu} />}
    >
      <Menu.Item
        title="Reset Places"
        onPress={() => {
          closeMenu();
          DataStore.places.reset();
        }}
      />
      <Menu.Item
        title="Login (User 1)"
        onPress={() => loginUser("1@b.c", "1234")}
      />
      <Menu.Item
        title="Login (User 2)"
        onPress={() => loginUser("2@b.c", "1234")}
      />
      <Menu.Item
        title="Login (User 3)"
        onPress={() => loginUser("3@b.c", "1234")}
      />
    </Menu>
  );
}

export default DebugMenu;
