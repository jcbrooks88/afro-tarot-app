import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  FlatList,
  StyleSheet,
  SafeAreaView,
  Text,
  KeyboardAvoidingView,
  Platform,
  Animated,
} from 'react-native';
import tarotData from '../data/tarot_cards.json';
import CardItem from '../components/CardItem';
import CardModal from '../components/CardModal';
import FilterToggle from '../components/FilterToggle';
import { TarotCard } from '../types/TarotCard';

type FilterOption = 'All' | 'Major' | 'Minor' | 'Cups' | 'Pentacles' | 'Swords' | 'Wands';

const CardLibrary = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<FilterOption>('All');
  const [filteredCards, setFilteredCards] = useState<TarotCard[]>([]);
  const [selectedCard, setSelectedCard] = useState<TarotCard | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [borderAnim] = useState(new Animated.Value(0)); // For animated border

  useEffect(() => {
    const query = searchQuery.toLowerCase();

    const filtered = tarotData.filter((card) => {
      const matchesSearch =
        card.name.toLowerCase().includes(query) ||
        card.keywords.some((kw) => kw.toLowerCase().includes(query));

      const matchesFilter =
        filter === 'All' ||
        card.arcana === filter ||
        (card.arcana === 'Minor' && card.suit?.toLowerCase() === filter.toLowerCase());

      return matchesSearch && matchesFilter;
    });

    setFilteredCards(filtered);
  }, [searchQuery, filter]);

  useEffect(() => {
    Animated.timing(borderAnim, {
      toValue: isFocused ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isFocused]);

  const interpolatedBorderColor = borderAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#ccc', '#8c3030'],
  });

  const handleCardPress = (card: TarotCard) => {
    setSelectedCard(card);
    setModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardContainer}
      >
        <View style={styles.filterWrapper}>
          <FilterToggle selected={filter} onSelect={setFilter} />
        </View>

        <View style={styles.content}>
          <Animated.View style={[styles.searchWrapper, { borderColor: interpolatedBorderColor }]}>
            <TextInput
              placeholder="Search cards..."
              placeholderTextColor="#aaa"
              style={[styles.search, { outline: 'none' } as any]}
              value={searchQuery}
              onChangeText={setSearchQuery}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              autoCorrect={false}
              underlineColorAndroid="transparent"
            />
          </Animated.View>

          {filteredCards.length === 0 ? (
            <Text style={styles.noResults}>No cards match your search.</Text>
          ) : (
            <FlatList
              data={filteredCards}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <CardItem card={item} onPress={() => handleCardPress(item)} />
              )}
              numColumns={2}
              contentContainerStyle={styles.list}
              showsVerticalScrollIndicator={false}
            />
          )}
        </View>

        <CardModal
          visible={modalVisible}
          card={selectedCard}
          onClose={() => setModalVisible(false)}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F1EC',
  },
  keyboardContainer: {
    flex: 1,
  },
  filterWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#F4F1EC',
    zIndex: 10,
    paddingTop: 10,
    paddingBottom: 6,
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  content: {
    flex: 1,
    backgroundColor: '#F4F1EC',
    paddingTop: 70,
    paddingHorizontal: 16,
  },
  searchWrapper: {
    borderWidth: 1,
    borderRadius: 12,
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  search: {
    padding: 12,
    fontSize: 16,
    
  },
  list: {
    paddingBottom: 30,
  },
  noResults: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
    color: '#666',
    fontStyle: 'italic',
  },
});

export default CardLibrary;
