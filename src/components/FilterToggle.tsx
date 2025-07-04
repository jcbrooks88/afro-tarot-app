import React from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView } from 'react-native';

type FilterOption = 'All' | 'Major' | 'Minor' | 'Cups' | 'Pentacles' | 'Swords' | 'Wands';

interface FilterToggleProps {
  selected: FilterOption;
  onSelect: (filter: FilterOption) => void;
}

const filters: FilterOption[] = [
  'All',
  'Major',
  'Minor',
  'Cups',
  'Pentacles',
  'Swords',
  'Wands',
];

const FilterToggle: React.FC<FilterToggleProps> = ({ selected, onSelect }) => {
  return (
    <ScrollView
  horizontal
  contentContainerStyle={styles.scrollContainer}
  showsHorizontalScrollIndicator={false}
>
  <View style={styles.innerContainer}>
    {filters.map((filter) => (
      <Pressable
        key={filter}
        onPress={() => onSelect(filter)}
        style={({ pressed }) => [
          styles.button,
          selected === filter && styles.activeButton,
          pressed && styles.pressedButton,
        ]}
      >
        <Text style={[styles.text, selected === filter && styles.activeText]}>
          {filter}
        </Text>
      </Pressable>
    ))}
  </View>
</ScrollView>

  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    paddingHorizontal: 10,
    marginBottom: 12,
    marginTop: 4,
  },
  innerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    minWidth: '100%', // ensures full width so space-around works
  },
  button: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginHorizontal: 6,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#f9f9f9',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  activeButton: {
    backgroundColor: '#a54a4a',
    borderColor: '#8c3030',
  },
  pressedButton: {
    opacity: 0.85,
  },
  text: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    letterSpacing: 0.5,
  },
  activeText: {
    color: '#fff',
  },
});


export default FilterToggle;
