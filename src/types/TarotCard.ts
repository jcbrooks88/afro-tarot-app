export interface TarotCard {
    id: number;
    name: string;
    arcana: 'Major' | 'Minor';
    suit?: 'Cups' | 'Pentacles' | 'Swords' | 'Wands';
    keywords: string[];
    meaning_rev?: string;
    meaning_up?: string;
    description?: string;
    description_rev?: string;
    description_up?: string;
    image?: string;
  }
  