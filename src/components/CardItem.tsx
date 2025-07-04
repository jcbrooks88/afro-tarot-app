import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { TarotCard } from '../types/TarotCard';
import cardImages from '../assets/images/cardImages';

const formatCardName = (name: string) => {
  return name
    .toLowerCase()
    .replace(/[\s_]+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
};

interface CardItemProps {
  card: TarotCard;
  onPress: () => void;
}

const CardItem: React.FC<CardItemProps> = ({ card, onPress }) => {
  const imageName = formatCardName(card.name);
  const imageSource = cardImages[imageName]
    ? cardImages[imageName]
    : require('../assets/images/back-up-image.png');

  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <Image
        source={imageSource}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.title}>{card.name}</Text>
      <Text style={styles.keywords}>{card.keywords.join(', ')}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 10,
    padding: 16,
    backgroundColor: '#fafafa',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'flex-start',
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  image: {
    width: 200,
    height: 250,
    marginBottom: 12,
    borderRadius: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
    textAlign: 'center',
    marginBottom: 6,
  },
  keywords: {
    fontSize: 13,
    color: '#555',
    textAlign: 'center',
    lineHeight: 18,
  },
});

export default CardItem;
