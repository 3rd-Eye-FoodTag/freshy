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
  storagePlace: 'Fridge' | 'Freezer' | 'Pantry';
  cost: number;
  groceryStore: string;
  updatedByUser: string; // User ID reference
  consumedAt: string | null; // ISO date string or null
  foodPhoto: string; // URL to the food photo
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  foodID: string;
  selected?: boolean;
  predictedFreshDurations: {
    fridge?: number;
    freezer?: number;
    room?: number;
  };
  foodName?: string;
  imageName?: string;
}

export interface FoodItem {
  foodName: string;
  quantity?: number;
  category: string;
  predictedFreshDurations?: {fridge?: number};
  storagePlace?: string;
  imageName?: string;
  foodWikiID?: string;
  alternativeNames?: string[];
  comment?: string;
}

export interface AddFoodRequestBody extends FoodItem {
  foodID: string;
  consumed: boolean;
  share: boolean;
  freshnessScore: number;
  storagePlace: string;
  cost: number;
  groceryStore: string;
  consumedAt: string;
  updatedByUser: string;
  createdBy: string;
  purchaseDate: string;
  createdAt: string;
  updatedAt: string;
  expiryDate: string;
  storageTip?: string;
  isFoodFromWiki?: boolean;
}
