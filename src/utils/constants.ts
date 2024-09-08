import {FoodDetailsProps} from './interface';

export const getImageURL = imageName =>
  `https://firebasestorage.googleapis.com/v0/b/freshfoodv1.appspot.com/o/images%2FfoodWiki%2F${imageName}.png?alt=media`;
export const defaultFoodImage =
  'data:image/png;base64,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';

export const dummyFoodData: FoodDetailsProps[] = [
  {
    id: '1',
    name: 'Apple',
    imageUrl: 'https://example.com/apple.jpg',
    daysLeft: 5,
    location: 'Fridge',
    expiryDate: '01/25/2024',
    reminder: '1 Day Before Exp',
    category: 'Fruit',
    others: 'None',
    storageTips: 'Store in a cool, dry place.',
    quantity: 10,
  },
  {
    id: '2',
    name: 'Banana',
    imageUrl: 'https://example.com/banana.jpg',
    daysLeft: 3,
    location: 'Fridge',
    expiryDate: '01/23/2024',
    reminder: '2 Days Before Exp',
    category: 'Fruit',
    others: 'Keep at room temperature until ripe.',
    storageTips: 'Do not refrigerate until ripe.',
    quantity: 6,
  },
  {
    id: '3',
    name: 'Carrot',
    imageUrl: 'https://example.com/carrot.jpg',
    daysLeft: 10,
    location: 'Fridge',
    expiryDate: '02/01/2024',
    reminder: '3 Days Before Exp',
    category: 'Vegetable',
    others: 'Remove tops for longer storage.',
    storageTips: 'Store in a plastic bag in the fridge.',
    quantity: 12,
  },
  {
    id: '4',
    name: 'Broccoli',
    imageUrl: 'https://example.com/broccoli.jpg',
    daysLeft: 7,
    location: 'Fridge',
    expiryDate: '01/28/2024',
    reminder: '2 Days Before Exp',
    category: 'Vegetable',
    others: 'Keep in a loose plastic bag.',
    storageTips: 'Store in the fridge crisper drawer.',
    quantity: 4,
  },
  {
    id: '5',
    name: 'Chicken Breast',
    imageUrl: 'https://example.com/chicken.jpg',
    daysLeft: 2,
    location: 'Freezer',
    expiryDate: '03/01/2024',
    reminder: '5 Days Before Exp',
    category: 'Meat',
    others: 'Defrost in the fridge overnight.',
    storageTips: 'Store in an airtight container in the freezer.',
    quantity: 8,
  },
  {
    id: '6',
    name: 'Salmon Fillet',
    imageUrl: 'https://example.com/salmon.jpg',
    daysLeft: 4,
    location: 'Freezer',
    expiryDate: '03/05/2024',
    reminder: '7 Days Before Exp',
    category: 'Meat',
    others: 'Cook thoroughly before eating.',
    storageTips: 'Store in an airtight container in the freezer.',
    quantity: 5,
  },
  {
    id: '7',
    name: 'Milk',
    imageUrl: 'https://example.com/milk.jpg',
    daysLeft: 8,
    location: 'Fridge',
    expiryDate: '01/29/2024',
    reminder: '2 Days Before Exp',
    category: 'Dairy',
    others: 'Keep sealed after opening.',
    storageTips: 'Store in the fridge door.',
    quantity: 2,
  },
  {
    id: '8',
    name: 'Yogurt',
    imageUrl: 'https://example.com/yogurt.jpg',
    daysLeft: 6,
    location: 'Fridge',
    expiryDate: '01/27/2024',
    reminder: '3 Days Before Exp',
    category: 'Dairy',
    others: 'Consume after opening within 7 days.',
    storageTips: 'Store in the fridge.',
    quantity: 8,
  },
  {
    id: '9',
    name: 'Cheddar Cheese',
    imageUrl: 'https://example.com/cheese.jpg',
    daysLeft: 14,
    location: 'Fridge',
    expiryDate: '02/07/2024',
    reminder: '5 Days Before Exp',
    category: 'Dairy',
    others: 'Wrap in wax paper and store in a sealed container.',
    storageTips: 'Store in the fridge cheese drawer.',
    quantity: 3,
  },
  {
    id: '10',
    name: 'Eggplant',
    imageUrl: 'https://example.com/eggplant.jpg',
    daysLeft: 7,
    location: 'Pantry',
    expiryDate: '01/30/2024',
    reminder: '2 Days Before Exp',
    category: 'Vegetable',
    others: 'Store in a cool, dry place.',
    storageTips: 'Do not refrigerate.',
    quantity: 5,
  },
  {
    id: '11',
    name: 'Cucumber',
    imageUrl: 'https://example.com/cucumber.jpg',
    daysLeft: 4,
    location: 'Fridge',
    expiryDate: '01/26/2024',
    reminder: '1 Day Before Exp',
    category: 'Vegetable',
    others: 'Wrap in a paper towel before storing.',
    storageTips: 'Store in the fridge crisper drawer.',
    quantity: 10,
  },
  {
    id: '12',
    name: 'Tomato',
    imageUrl: 'https://example.com/tomato.jpg',
    daysLeft: 3,
    location: 'Pantry',
    expiryDate: '01/24/2024',
    reminder: '1 Day Before Exp',
    category: 'Vegetable',
    others: 'Keep at room temperature until ripe.',
    storageTips: 'Do not refrigerate until ripe.',
    quantity: 12,
  },
  {
    id: '13',
    name: 'Orange Juice',
    imageUrl: 'https://example.com/orangejuice.jpg',
    daysLeft: 5,
    location: 'Fridge',
    expiryDate: '01/25/2024',
    reminder: '2 Days Before Exp',
    category: 'Dairy',
    others: 'Shake well before consuming.',
    storageTips: 'Store in the fridge door.',
    quantity: 3,
  },
  {
    id: '14',
    name: 'Butter',
    imageUrl: 'https://example.com/butter.jpg',
    daysLeft: 12,
    location: 'Fridge',
    expiryDate: '02/05/2024',
    reminder: '3 Days Before Exp',
    category: 'Dairy',
    others: 'Keep covered when not in use.',
    storageTips: 'Store in the fridge butter compartment.',
    quantity: 4,
  },
  {
    id: '15',
    name: 'Spinach',
    imageUrl: 'https://example.com/spinach.jpg',
    daysLeft: 2,
    location: 'Fridge',
    expiryDate: '01/23/2024',
    reminder: '1 Day Before Exp',
    category: 'Vegetable',
    others: 'Wash before eating.',
    storageTips: 'Store in a plastic bag in the fridge.',
    quantity: 6,
  },
  {
    id: '16',
    name: 'Avocado',
    imageUrl: 'https://example.com/avocado.jpg',
    daysLeft: 1,
    location: 'Pantry',
    expiryDate: '01/22/2024',
    reminder: '1 Day Before Exp',
    category: 'Fruit',
    others: 'Keep at room temperature until ripe.',
    storageTips: 'Do not refrigerate until ripe.',
    quantity: 4,
  },
  {
    id: '17',
    name: 'Pasta',
    imageUrl: 'https://example.com/pasta.jpg',
    daysLeft: 90,
    location: 'Pantry',
    expiryDate: '04/20/2024',
    reminder: '7 Days Before Exp',
    category: 'Other',
    others: 'Store in an airtight container.',
    storageTips: 'Keep in a cool, dry place.',
    quantity: 5,
  },
  {
    id: '18',
    name: 'Rice',
    imageUrl: 'https://example.com/rice.jpg',
    daysLeft: 180,
    location: 'Pantry',
    expiryDate: '07/20/2024',
    reminder: '14 Days Before Exp',
    category: 'Other',
    others: 'Store in an airtight container.',
    storageTips: 'Keep in a cool, dry place.',
    quantity: 20,
  },
  {
    id: '19',
    name: 'Lettuce',
    imageUrl: 'https://example.com/lettuce.jpg',
    daysLeft: 3,
    location: 'Fridge',
    expiryDate: '01/24/2024',
    reminder: '1 Day Before Exp',
    category: 'Vegetable',
    others: 'Rinse before use.',
    storageTips: 'Store in the fridge crisper drawer.',
    quantity: 4,
  },
  {
    id: '20',
    name: 'Bell Pepper',
    imageUrl: 'https://example.com/bellpepper.jpg',
    daysLeft: 5,
    location: 'Fridge',
    expiryDate: '01/26/2024',
    reminder: '2 Days Before Exp',
    category: 'Vegetable',
    others: 'Store in a plastic bag.',
    storageTips: 'Keep in the fridge crisper drawer.',
    quantity: 6,
  },
  {
    id: '21',
    name: 'Ground Beef',
    imageUrl: 'https://example.com/groundbeef.jpg',
    daysLeft: 3,
    location: 'Freezer',
    expiryDate: '03/20/2024',
    reminder: '5 Days Before Exp',
    category: 'Meat',
    others: 'Defrost in the fridge before cooking.',
    storageTips: 'Store in an airtight container in the freezer.',
    quantity: 2,
  },
  {
    id: '22',
    name: 'Grapes',
    imageUrl: 'https://example.com/grapes.jpg',
    daysLeft: 7,
    location: 'Fridge',
    expiryDate: '01/30/2024',
    reminder: '2 Days Before Exp',
    category: 'Fruit',
    others: 'Rinse before eating.',
    storageTips: 'Store in the fridge crisper drawer.',
    quantity: 25,
  },
  {
    id: '23',
    name: 'Blueberries',
    imageUrl: 'https://example.com/blueberries.jpg',
    daysLeft: 5,
    location: 'Fridge',
    expiryDate: '01/25/2024',
    reminder: '1 Day Before Exp',
    category: 'Fruit',
    others: 'Rinse before eating.',
    storageTips: 'Store in the fridge crisper drawer.',
    quantity: 20,
  },
  {
    id: '24',
    name: 'Sour Cream',
    imageUrl: 'https://example.com/sourcream.jpg',
    daysLeft: 10,
    location: 'Fridge',
    expiryDate: '02/01/2024',
    reminder: '3 Days Before Exp',
    category: 'Dairy',
    others: 'Keep sealed after opening.',
    storageTips: 'Store in the fridge.',
    quantity: 3,
  },
  {
    id: '25',
    name: 'Bacon',
    imageUrl: 'https://example.com/bacon.jpg',
    daysLeft: 4,
    location: 'Freezer',
    expiryDate: '03/05/2024',
    reminder: '5 Days Before Exp',
    category: 'Meat',
    others: 'Cook thoroughly before eating.',
    storageTips: 'Store in an airtight container in the freezer.',
    quantity: 5,
  },
  {
    id: '26',
    name: 'Oranges',
    imageUrl: 'https://example.com/oranges.jpg',
    daysLeft: 12,
    location: 'Pantry',
    expiryDate: '02/05/2024',
    reminder: '3 Days Before Exp',
    category: 'Fruit',
    others: 'Peel before eating.',
    storageTips: 'Store in a cool, dry place.',
    quantity: 8,
  },
  {
    id: '27',
    name: 'Pineapple',
    imageUrl: 'https://example.com/pineapple.jpg',
    daysLeft: 5,
    location: 'Pantry',
    expiryDate: '01/25/2024',
    reminder: '2 Days Before Exp',
    category: 'Fruit',
    others: 'Cut into slices before eating.',
    storageTips: 'Keep at room temperature until ripe.',
    quantity: 2,
  },
  {
    id: '28',
    name: 'Zucchini',
    imageUrl: 'https://example.com/zucchini.jpg',
    daysLeft: 6,
    location: 'Fridge',
    expiryDate: '01/27/2024',
    reminder: '2 Days Before Exp',
    category: 'Vegetable',
    others: 'Rinse before cooking.',
    storageTips: 'Store in the fridge crisper drawer.',
    quantity: 6,
  },
  {
    id: '29',
    name: 'Strawberries',
    imageUrl: 'https://example.com/strawberries.jpg',
    daysLeft: 4,
    location: 'Fridge',
    expiryDate: '01/26/2024',
    reminder: '1 Day Before Exp',
    category: 'Fruit',
    others: 'Rinse before eating.',
    storageTips: 'Store in the fridge crisper drawer.',
    quantity: 15,
  },
  {
    id: '30',
    name: 'Cabbage',
    imageUrl: 'https://example.com/cabbage.jpg',
    daysLeft: 9,
    location: 'Fridge',
    expiryDate: '02/01/2024',
    reminder: '2 Days Before Exp',
    category: 'Vegetable',
    others: 'Rinse before cooking.',
    storageTips: 'Store in the fridge crisper drawer.',
    quantity: 3,
  },
  {
    id: '31',
    name: 'Peanut Butter',
    imageUrl: 'https://example.com/peanutbutter.jpg',
    daysLeft: 365,
    location: 'Pantry',
    expiryDate: '12/31/2024',
    reminder: '30 Days Before Exp',
    category: 'Other',
    others: 'Keep tightly sealed when not in use.',
    storageTips: 'Store in a cool, dry place.',
    quantity: 1,
  },
];
