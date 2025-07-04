import React from 'react';
import { Modal, View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { TarotCard } from '../types/TarotCard';
import cardImages from '../assets/images/cardImages';

const formatCardName = (name: string) => {
  return name
    .toLowerCase()
    .replace(/[\s_]+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
};

interface CardModalProps {
  visible: boolean;
  card: TarotCard | null;
  onClose: () => void;
}

const CardModal: React.FC<CardModalProps> = ({ visible, card, onClose }) => {
  if (!card) return null;

  const imageName = formatCardName(card.name);
  const imageSource = cardImages[imageName]
    ? cardImages[imageName]
    : require('../assets/images/back-up-image.png');

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          <Image source={imageSource} style={styles.image} resizeMode="contain" />
          <Text style={styles.title}>{card.name}</Text>
          <Text style={styles.arcana}>{card.arcana} Arcana</Text>
          <Text style={styles.keywords}>{card.keywords.join(' • ')}</Text>
          <Text style={styles.description}>{card.description}</Text>
          <Pressable onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeText}>Close</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 10,
  },
  image: {
    width: 380,
    height: 460,
    marginBottom: 20,
    borderRadius: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1e1e1e',
    marginBottom: 4,
  },
  arcana: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#888',
    marginBottom: 8,
  },
  keywords: {
    fontSize: 14,
    color: '#555',
    marginBottom: 12,
    textAlign: 'center',
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
    color: '#333',
    marginBottom: 24,
    paddingHorizontal: 8,
  },
  closeButton: {
    paddingVertical: 10,
    paddingHorizontal: 24,
    backgroundColor: '#1e1e1e',
    borderRadius: 10,
  },
  closeText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CardModal;
