import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import { Chip } from "react-native-paper";
import { callFuture } from "../utils/utils";

/**
 * @callback onSelectedChange
 * @param {Set | string} selected
 */

/**
 * @param {Array.<Category>} items
 * @param {boolean} multiselect
 * @param {Set} [selected]
 * @param {onSelectedChange} onSelectedChange
 */
function ChipGroup({ items, multiselect, selected, onSelectedChange }) {
  const [internalSelected, setSelected] = useState(selected || new Set());

  useEffect(() => {
    setSelected(selected || new Set());
  }, [selected]);

  const handleSelected = (item) => {
    let updatedSet = new Set((multiselect && internalSelected) || [item]);

    if (multiselect) {
      if (updatedSet.has(item)) {
        updatedSet.delete(item);
      } else {
        updatedSet.add(item);
      }
    }

    setSelected(updatedSet);
    // use future to ensure we render the updated items before processing change
    if (multiselect) {
      callFuture(onSelectedChange, updatedSet);
    } else {
      callFuture(onSelectedChange, item);
    }
  };

  /**
   * @param item {Category}
   * @param index {number}
   */
  const renderItem = ({ item, index }) => (
    <Chip
      mode="outlined"
      style={index !== items.length - 1 && styles.chip}
      onPress={() => handleSelected(item.name)}
      selected={internalSelected.has(item.name)}
      selectedColor={item.color}
      icon={item.icon}
    >
      {item.name}
    </Chip>
  );

  return (
    <FlatList
      data={items}
      renderItem={renderItem}
      keyExtractor={(item) => item.name}
      horizontal
      extraData={internalSelected}
    />
  );
}

const styles = StyleSheet.create({
  chip: {
    marginRight: 8,
  },
});

export default ChipGroup;
