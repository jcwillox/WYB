import React, { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import DataStore from "../config/DataStore";
import { Avatar, Card, Chip, Divider, Surface } from "react-native-paper";
import ChipGroup from "../components/ChipGroup";
import StarGroup from "../components/StarGroup";
import EmptyListView from "./EmptyListView";

function PlacesView(props) {
  const [places, setPlaces] = useState(DataStore.places.all());
  console.log("Places", places);

  /** @param item {Place} */
  const renderItem = ({ item }) => (
    <Card
      // theme={{ roundness: 0 }}
      style={{ marginHorizontal: 8, marginTop: 8 }}
    >
      <Card.Cover source={item.image} />
      <Card.Title
        title={item.name}
        subtitle={item.category}
        // left={(props) => (
        //   <Avatar.Image
        //     source={item.image}
        //     {...props}
        //     style={{ backgroundColor: "transparent" }}
        //   />
        // )}
        right={(props) => <StarGroup initialRating={4} {...props} />}
        rightStyle={{ marginRight: 12 }}
      />

      {/*<Chip {...props}>{item.category}</Chip>*/}
    </Card>
  );

  /** @param selected {Set} */
  const updatePlaces = (selected) => {
    if (selected.size === 0) {
      setPlaces(DataStore.places.all());
    } else {
      setPlaces(DataStore.places.byCategory(selected));
    }
    console.log(places);
  };

  return (
    <View style={styles.container}>
      {/*<View*/}
      {/*  style={{*/}
      {/*    flexDirection: "row",*/}
      {/*    alignItems: "center",*/}
      {/*    justifyContent: "center",*/}
      {/*  }}*/}
      {/*>*/}
      {/*  <View style={{ flex: 1, maxWidth: 400, flexDirection: "row" }}>*/}
      <FlatList
        data={places}
        renderItem={renderItem}
        keyExtractor={(item) => item.uuid}
        ListEmptyComponent={EmptyListView}
        contentContainerStyle={{ flexGrow: 1 }}
        // ItemSeparatorComponent={Divider}
      />
      {/*</View>*/}
      {/*</View>*/}
      <Surface style={styles.chipGroup}>
        <ChipGroup
          items={["Shopping", "Restaurants", "Hotels"]}
          onSelectedChange={updatePlaces}
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
    paddingVertical: 8,
  },
});

export default PlacesView;
