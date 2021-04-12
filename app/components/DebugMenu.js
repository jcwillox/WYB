import React, { useState } from "react";
import { Appbar, Divider, Menu } from "react-native-paper";
import DataStore from "../config/DataStore";
import defaultUsers from "../config/users";

/**
 * A simple menu component to provide useful features for testing
 */
function DebugMenu() {
  const [visible, setVisible] = useState();
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  const users = defaultUsers();

  const loginUser = (index) => {
    closeMenu();
    let user = users[index];
    if (!user) return;
    DataStore.users.logout();
    DataStore.users.login(user);
  };

  return (
    <Menu
      visible={visible}
      onDismiss={closeMenu}
      anchor={<Appbar.Action icon="bug" color="white" onPress={openMenu} />}
    >
      <Menu.Item title="Debug Menu" icon="bug" disabled />
      <Divider />
      <Menu.Item
        title="Reset Places"
        icon="restart"
        onPress={() => {
          closeMenu();
          DataStore.places.reset();
        }}
      />
      <Menu.Item
        title="User 1"
        icon="account-circle-outline"
        onPress={() => loginUser(0)}
      />
      <Menu.Item
        title="User 2"
        icon="account-circle-outline"
        onPress={() => loginUser(1)}
      />
      <Menu.Item
        title="User 3"
        icon="account-circle-outline"
        onPress={() => loginUser(2)}
      />
    </Menu>
  );
}

export default DebugMenu;
