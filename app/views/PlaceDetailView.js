import React from "react";
import { StyleSheet } from "react-native";
import { Card, Chip, Divider, List, Paragraph } from "react-native-paper";
import StarGroup from "../components/StarGroup";
import LightTheme from "../config/theme";
import DataStore from "../config/DataStore";
import strftime from "strftime";

/**
 * @param place {Place}
 * @param navigation
 * @param hideDetailModel
 */
function PlaceDetailView({ place, navigation, hideDetailModel }) {
  return (
    <Card>
      <Card.Cover source={place.image} />
      <Card.Title
        title={place.name}
        subtitle={place.category}
        right={(props) => <StarGroup rating={place.rating} {...props} />}
        rightStyle={styles.starGroup}
      />
      <Card.Content>
        {place.description !== "" && (
          <Paragraph style={styles.description}>{place.description}</Paragraph>
        )}
        <Divider />
        <List.Section style={styles.listSection}>
          <List.Item
            title="Added"
            description={strftime("%A, %e %b %Y, %H:%M", place.created)}
            left={() => (
              <List.Icon
                icon="calendar-blank"
                color={LightTheme.colors.primary}
              />
            )}
          />
        </List.Section>
        <Divider />
      </Card.Content>
      <Card.Actions style={styles.cardActions}>
        <Chip
          icon="pencil"
          mode="outlined"
          selectedColor={LightTheme.colors.primary}
          onPress={() => {
            hideDetailModel();
            navigation.navigate("Add", { placeId: place.uuid });
          }}
          style={styles.action}
        >
          Edit
        </Chip>
        <Chip
          icon="trash-can"
          mode="outlined"
          selectedColor={LightTheme.colors.trash}
          onPress={() => {
            hideDetailModel();
            DataStore.places.remove(place);
          }}
          style={styles.action}
        >
          Delete
        </Chip>
      </Card.Actions>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  bottomButtons: {
    flexDirection: "row",
  },
  listSection: {
    marginLeft: -16,
  },
  description: {
    marginBottom: 16,
  },
  cardActions: {
    marginHorizontal: 8,
    marginVertical: 16,
  },
  starGroup: {
    marginRight: 12,
    marginLeft: 12,
  },
  action: {
    marginRight: 8,
  },
});

export default PlaceDetailView;
