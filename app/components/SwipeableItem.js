import React from "react";
import { Platform, StyleSheet, View } from "react-native";
import { Card, IconButton } from "react-native-paper";
import LightTheme from "../config/theme";
import DataStore from "../config/DataStore";
import StarGroup from "./StarGroup";
import Swipeable from "react-native-gesture-handler/Swipeable";

// this is a simple wrapper object to disable the `Swipeable` component
// on web-based platforms as it not properly supported
let SwipeableWrapper;
if (Platform.OS === "web") {
  SwipeableWrapper = ({ innerRef, ...props }) => {
    return props.children;
  };
} else {
  SwipeableWrapper = ({ innerRef, ...props }) => {
    return (
      <Swipeable ref={innerRef} {...props}>
        {props.children}
      </Swipeable>
    );
  };
}

/**
 * @param navigation
 * @param item {Place}
 * @param showDetailModel
 */
function SwipeableItem({ navigation, item, showDetailModel }) {
  let reference;
  return (
    <SwipeableWrapper
      innerRef={(ref) => (reference = ref)}
      containerStyle={styles.swipeable}
      renderRightActions={() => (
        <View style={styles.container}>
          <IconButton
            icon="pencil"
            size={24}
            color={LightTheme.colors.primary}
            onPress={() => {
              reference.close();
              navigation.navigate("Add", { placeId: item.uuid });
            }}
          />
          <IconButton
            icon="trash-can"
            size={24}
            color={LightTheme.colors.trash}
            onPress={() => {
              reference.close();
              setTimeout(() => {
                DataStore.places.remove(item);
              }, 150);
            }}
          />
        </View>
      )}
    >
      <Card style={styles.card} onPress={() => showDetailModel(item)}>
        <Card.Cover source={item.image} />
        <Card.Title
          title={item.name}
          subtitle={item.category}
          right={(props) => <StarGroup rating={item.rating} {...props} />}
          rightStyle={styles.starGroup}
        />
      </Card>
    </SwipeableWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  swipeable: {
    // prevent swipeable from cutting off drop shadows
    overflow: "visible",
  },
  card: {
    marginHorizontal: 8,
    marginTop: 8,
  },
  starGroup: {
    marginRight: 12,
    marginLeft: 12,
  },
});

export default SwipeableItem;
