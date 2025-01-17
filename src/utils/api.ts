import axios from 'axios';
// import {
//   signInWithEmailAndPassword,
//   createUserWithEmailAndPassword,
// } from 'firebase/auth';

import foodWikiData from './mockData/foodWikiData.json';
import foodInventoryData from './mockData/foodInventoryData.json';

// import {auth, db} from '../config/firebase';
// import {
//   getDoc,
//   doc,
//   setDoc,
//   updateDoc,
//   collection,
//   query,
//   where,
//   getDocs,
//   addDoc,
// } from 'firebase/firestore';
import {FoodDetailsProps} from './interface';

//authetication
const JQ = 'AIzaSyBYyGwCHKviq3olXksJWi4c7xSR_GVGoMg';
const TY = 'AIzaSyBbeBISdSFhJYWAL9MchLLa9oCpVL6wTjM';
const WEB_API_KEY = JQ;
const firebaseUrl = (JQ: string) => {
  return 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + JQ;
};

const collectionWiki = 'FoodWiki3';

const DATA_BASE_URL = 'https://thirdeyes-37f5d-default-rtdb.firebaseio.com';

type AuthenProps = {
  email?: string;
  password?: string;
  refreshToken?: string;
};

export const authenticate = async (
  mode: string,
  email: string | undefined,
  password: string | undefined,
) => {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${WEB_API_KEY}`;
  const response = await axios.post(url, {
    email: email,
    password: password,
    returnSecureToken: true,
  });

  return {...response.data, status: response.status};
};

export const loginAccount = ({email, password}: AuthenProps) => {
  return authenticate('signInWithPassword', email, password);
};

export const registerAccount = async ({email, password}: AuthenProps) => {
  return authenticate('signUp', email, password);
};

export const refreshToken = async ({refreshToken}: AuthenProps) => {
  const url = `https://securetoken.googleapis.com/v1/token?key=${WEB_API_KEY}`;
  const response = await axios.post(url, {
    grant_type: 'refresh_token',
    refresh_token: refreshToken,
  });

  return {...response.data, status: response.status};
};

type InventoryProps = {
  data?: {} | undefined;
  uid?: string;
};
//storage
export const updateInventoryList = async ({data, uid}: InventoryProps) => {
  return await axios.post(DATA_BASE_URL + `/${uid}/inventoryList.json`, {
    data: data,
  });
};

export const getInventoryList = async ({uid}: InventoryProps) => {
  return await axios.get(DATA_BASE_URL + `/${uid}/inventoryList.json`);
};

export const postUserInfo = async (data: InventoryProps) => {
  const {uid} = data;
  const response = await axios.post(
    DATA_BASE_URL + `/${uid}/profileInfo.json`,
    {data: data},
  );
  return response;
};

export const fetchUserList = async ({uid}: InventoryProps) => {
  const response = await axios.get(DATA_BASE_URL + `/${uid}/profileInfo.json`);

  const userInfoData = response.data;
  return response;
};

export const getProductInfo = async (barcode: string) => {
  const dataBaseUrl = `https://world.openfoodfacts.org/api/v2/product/${barcode}?fields=product_name,product_name_en,nutriscore_data`;
  const imageUrl = `https://world.openfoodfacts.org/api/v0/product/${barcode}.json}`;
  return await axios.get(dataBaseUrl);
  // const imageResponse = await axios.get(imageUrl);
  // console.log({data: response.data.product.product_name});

  const imageData = imageResponse?.data?.product?.image_front_url;
};

export const postMockData = async (data: any) => {
  try {
    console.log({data});
    data.forEach(item => {
      console.log({name: item.imageName});
    });
    // const docRef = doc(db, "Inventory", currentUid);
    // const docSnap = await getDoc(docRef);
    // const result = docSnap.data()
    // const inventoryupdate = doc(db, "Inventory", currentUid);
  } catch (error) {
    console.log(error);
  }
};

export const addFoodItemsToFirebase = async (items: any[]) => {
  // try {
  //   // Create an array of promises to add each item
  //   console.log('adding to wiki');
  //   const addItemPromises = items.map(async item => {
  //     const docRef = await addDoc(collection(db, collectionWiki), item);
  //     // console.log('Document added with ID:', docRef.id);
  //     return {id: docRef.id, ...item};
  //   });
  //   // Wait for all items to be added
  //   const addedItems = await Promise.all(addItemPromises);
  //   console.log('All items added successfully:', addedItems);
  //   return addedItems; // Return all added items with their IDs
  // } catch (error) {
  //   console.error(`Error adding items to Foo${collectionWiki}: `, error);
  //   throw new Error(`Failed to add items to ${collectionWiki}`);
  // }
};

//use to updateFoodWiki
export const addFoodDataToFirestore = async (foodArray: any) => {
  try {
    // Loop through the array and add each item as a document
    console.log('start adding');
    for (const item of foodArray) {
      // Add each document with its foodID as the document ID
      // await addDoc(collection(db, collectionWiki), { ...item })
    }

    console.log('Data successfully added to Firestore!');
  } catch (error) {
    console.error('Error adding data to Firestore:', error);
  }
};
