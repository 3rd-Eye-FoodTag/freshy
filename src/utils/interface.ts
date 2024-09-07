// export interface FoodDetailsProps {
//     id: string | number,
//     name: string;
//     imageUrl?: string;
//     daysLeft?: number;
//     location: 'Fridge' | 'Freezer' | 'Pantry';
//     expiryDate?: string;
//     reminder?: string;
//     category?: string;
//     others?: string;
//     storageTips?: string;
//     quantity: number;
// }

export interface FoodDetailsProps {
    name: string;
    foodWikiId?: string; // Optional reference to FoodWiki
    quantity: number;
    purchaseDate: string; // ISO date string
    expiryDate: string; // ISO date string
    consumed: boolean;
    category: string;
    shared: boolean;
    createdBy: string; // User ID reference
    freshnessScore: number;
    storagePlace: string;
    cost: number;
    groceryStore: string;
    updatedByUser: string; // User ID reference
    consumedAt: string | null; // ISO date string or null
    foodPhoto: string; // URL to the food photo
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
  }