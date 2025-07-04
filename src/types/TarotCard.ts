export interface TarotCard {
    meaning_up: string;
    id: number;
    name: string;
    arcana: 'Major' | 'Minor';
    suit?: 'Cups' | 'Pentacles' | 'Swords' | 'Wands';
    keywords: string[];
    description: string;
    image?: string;
  }
  