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

// connect firebase
export const handleAuthentication = async (
  mode: string,
  email: string,
  password: string,
) => {
  // try {
  //   let response;
  //   if (mode === 'LogIn') {
  //     response = await signInWithEmailAndPassword(auth, email, password);
  //   } else {
  //     response = await createUserWithEmailAndPassword(auth, email, password);
  //   }
  //   return response;
  // } catch (e: any) {
  //   console.log({e});
  //   return e;
  // }
};

//User
export const fetchUserDataFromFirebase = async (currentUid: string) => {
  // try {
  //   const docRef = doc(db, 'Users', currentUid);
  //   const docSnap = await getDoc(docRef);
  //   const userData = docSnap.data();
  //   return userData;
  // } catch (error) {
  //   console.log(error);
  // }
};

// Update user
export const updateUserInfoFromFirebase = async (
  currentUid: string,
  updatedData: Partial<{
    age: string;
    email: string;
    gender: string;
    name: string;
    phoneNumber: string;
    zipCode: string;
  }>,
) => {
  // try {
  //   const docRef = doc(db, 'Users', currentUid);
  //   await updateDoc(docRef, {
  //     ...updatedData,
  //   });
  //   console.log('User information updated successfully');
  // } catch (error) {
  //   console.log('Error updating user information:', error);
  // }
};

export const handleUpdateInventory = async (uid: string, data: any) => {
  // try {
  //   await setDoc(doc(db, 'Inventory', uid), {data: data});
  // } catch (e: any) {
  //   console.log(e);
  // }
};

//FoodWiki
export const fetchFoodWikFromFirebase = async () => {
  // try {
  //   // Create a query to filter documents where 'type' === 'Fruit'
  //   const fruitsQuery = query(
  //     collection(db, collectionWiki),
  //     // where('type', '==', 'Fruit'),
  //   );
  //   // Fetch the filtered documents
  //   const querySnapshot = await getDocs(fruitsQuery);
  //   // Map through the snapshot and extract data
  //   const fruitsData = querySnapshot.docs.map(doc => {
  //     // console.log('Document ID:', doc.id); // Log each document ID
  //     return {
  //       id: doc.id,
  //       ...doc.data(),
  //     };
  //   });
  //   return fruitsData; // Return the filtered result
  // } catch (error) {
  //   console.error(`Error fetching ${collectionWiki} data: `, error);
  //   throw new Error(`Failed to fetch data from ${collectionWiki}`);
  // }
};

//inventory
export const fetchInventoryDataFromeFirebase = async (currentUid: string) => {
  // try {
  //   // return {data: foodInventoryData};
  //   console.log('fetching ------', currentUid);
  //   const docRef = doc(db, 'Inventory', currentUid);
  //   const docSnap = await getDoc(docRef);
  //   if (docSnap.exists()) {
  //     // console.log("Document data:", docSnap.data());
  //     return docSnap.data();
  //   } else {
  //     // docSnap.data() will be undefined in this case
  //     console.log('No such document!');
  //   }
  // } catch (error) {
  //   console.log(error);
  // }
};

export const postInventoryUpdateToFirebase = async (
  currentUid: string,
  newItem: FoodDetailsProps[],
) => {
  // try {
  //   console.log('posting food to Inventory-------------');
  //   const docRef = doc(db, 'Inventory', currentUid);
  //   const docSnap = await getDoc(docRef);
  //   const result = docSnap.data();
  //   const inventoryupdate = doc(db, 'Inventory', currentUid);
  //   await updateDoc(inventoryupdate, {
  //     data: [...result?.data, ...newItem],
  //   });
  //   console.log('succuessfully add to inventory');
  // } catch (error) {
  //   console.log('cannot add new item normally', error);
  // }
};

export const updateExistedInventoryItem = async (
  currentUid: string,
  newItem: FoodDetailsProps,
) => {
  // try {
  //   const docRef = doc(db, 'Inventory', currentUid);
  //   const docSnap = await getDoc(docRef);
  //   const result = docSnap.data();
  //   const collection = result.data;
  //   const updateItem = collection.map(item => {
  //     if (item.foodID === newItem.foodID) {
  //       return {...newItem};
  //     }
  //     return item;
  //   });
  //   const inventoryupdate = doc(db, 'Inventory', currentUid);
  //   await updateDoc(inventoryupdate, {
  //     data: [...updateItem],
  //   });
  // } catch (error) {
  //   console.log(error);
  // }
};

export const removeInventoryItem = async (
  currentUid: string,
  foodID: string,
) => {
  // try {
  //   const docRef = doc(db, 'Inventory', currentUid);
  //   const docSnap = await getDoc(docRef);
  //   if (!docSnap.exists()) {
  //     throw new Error('Inventory does not exist');
  //   }
  //   const result = docSnap.data();
  //   const collection = result.data;
  //   const updatedCollection = collection.filter(item => item.foodID !== foodID);
  //   const inventoryUpdate = doc(db, 'Inventory', currentUid);
  //   await updateDoc(inventoryUpdate, {
  //     data: updatedCollection,
  //   });
  //   console.log(`Item with foodID ${foodID} has been removed successfully.`);
  // } catch (error) {
  //   console.error('Error removing item:', error);
  // }
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
