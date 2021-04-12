import React, { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import DataStore from "../config/DataStore";
import { Modal, Portal, Surface } from "react-native-paper";
import ChipGroup from "../components/ChipGroup";
import EmptyListView from "./EmptyListView";
import { usePlacesList } from "../config/Hooks";
import SwipeableItem from "../components/SwipeableItem";
import PlaceDetailView from "./PlaceDetailView";

function PlacesView({ navigation }) {
  const categories = DataStore.categories.all();
  const places = usePlacesList(DataStore.places.all());
  const [detailModelVisible, setDetailModelVisible] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState(new Set());

  const filteredPlaces =
    (selectedCategories.size !== 0 &&
      places.filter((place) => selectedCategories.has(place.category))) ||
    places;

  const showDetailModel = (place) => {
    setSelectedPlace(place);
    setDetailModelVisible(true);
  };
  const hideDetailModel = () => {
    setDetailModelVisible(false);
  };

  /** @param item {Place} */
  const renderItem = ({ item }) => (
    <SwipeableItem
      navigation={navigation}
      item={item}
      showDetailModel={showDetailModel}
    />
  );

  return (
    <View style={styles.container}>
      <Portal>
        <Modal
          visible={detailModelVisible}
          onDismiss={hideDetailModel}
          style={styles.modal}
        >
          {selectedPlace && (
            <PlaceDetailView
              navigation={navigation}
              place={selectedPlace}
              hideDetailModel={hideDetailModel}
            />
          )}
        </Modal>
      </Portal>
      <FlatList
        data={filteredPlaces}
        renderItem={renderItem}
        keyExtractor={(item) => item.uuid}
        ListEmptyComponent={EmptyListView}
        contentContainerStyle={styles.listContainer}
      />
      <Surface style={styles.chipGroup}>
        <ChipGroup
          multiselect
          items={categories}
          onSelectedChange={(selected) => setSelectedCategories(selected)}
        />
      </Surface>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
  },
  chipGroup: {
    // paddingVertical: 8,
    padding: 8,
  },
  listContainer: {
    flexGrow: 1,
    paddingBottom: 8,
  },
  modal: {
    padding: 20,
  },
});

export default PlacesView;
