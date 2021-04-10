import React, { useState } from "react";
import { FlatList } from "react-native";
import { Chip } from "react-native-paper";

function ChipGroup({ items, onSelectedChange }) {
  const [selected, setSelected] = useState(new Set());
  const handleSelected = (item) => {
    let updatedSet = new Set(selected);
    if (updatedSet.has(item)) updatedSet.delete(item);
    else updatedSet.add(item);

    setSelected(updatedSet);

    // future to ensure we update the selected item, before processing change
    if (onSelectedChange)
      setTimeout(() => {
        onSelectedChange(updatedSet);
      }, 0);
  };

  const renderItem = ({ item }) => (
    <Chip
      mode="outlined"
      style={{ marginLeft: 8 }}
      onPress={() => handleSelected(item)}
      selected={selected.has(item)}
    >
      {item}
    </Chip>
  );
  return (
    <FlatList
      data={items}
      renderItem={renderItem}
      keyExtractor={(item) => item}
      horizontal
      extraData={selected}
    />
  );
}

export default ChipGroup;
