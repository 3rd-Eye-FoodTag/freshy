export interface FoodDetailsProps {
    name: string;
    imageUrl: string;
    daysLeft: number;
    location: 'Fridge' | 'Freezer' | 'Pantry';
    expiryDate: string;
    reminder: string;
    category: string;
    others: string;
    storageTips: string;
    quantity: number;
}