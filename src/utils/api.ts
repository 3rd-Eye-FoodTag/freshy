import axios from 'axios';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';

import foodWikiData from './mockData/foodWikiData.json';
import foodInventoryData from './mockData/foodInventoryData.json';

import {auth, db} from '../config/firebase';
import {
  getDoc,
  doc,
  setDoc,
  updateDoc,
  collection,
  query,
  where,
  getDocs,
  addDoc,
} from 'firebase/firestore';
import {FoodDetailsProps} from './interface';

//authetication
const JQ = 'AIzaSyBYyGwCHKviq3olXksJWi4c7xSR_GVGoMg';
const TY = 'AIzaSyBbeBISdSFhJYWAL9MchLLa9oCpVL6wTjM';
const WEB_API_KEY = JQ;
const firebaseUrl = (JQ: string) => {
  return 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + JQ;
};

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
  console.log('getProductInfo', {barcode});
  const dataBaseUrl = `https://world.openfoodfacts.org/api/v2/product/${barcode}?fields=product_name,product_name_en,nutriscore_data`;
  const imageUrl = `https://world.openfoodfacts.org/api/v0/product/${barcode}.json}`;
  const response = await axios.get(dataBaseUrl);
  const imageResponse = await axios.get(imageUrl);

  const imageData = imageResponse?.data?.product?.image_front_url;
};

// connect firebase
export const handleAuthentication = async (
  mode: string,
  email: string,
  password: string,
) => {
  try {
    let response;
    if (mode === 'LogIn') {
      response = await signInWithEmailAndPassword(auth, email, password);
    } else {
      response = await createUserWithEmailAndPassword(auth, email, password);
    }
    return response;
  } catch (e: any) {
    console.log({e});
    return e;
  }
};

//User
export const fetchUserDataFromFirebase = async (currentUid: string) => {
  try {
    const docRef = doc(db, 'Users', currentUid);
    const docSnap = await getDoc(docRef);
    const userData = docSnap.data();

    return userData;
  } catch (error) {
    console.log(error);
  }
};

export const handleUpdateInventory = async (uid: string, data: any) => {
  try {
    await setDoc(doc(db, 'Inventory', uid), {data: data});
  } catch (e: any) {
    console.log(e);
  }
};

//FoodWiki
export const fetchFoodWikFromFirebase = async () => {
  //no uuid need because to fetch all data from firebase
  try {
    return foodWikiData;
    // console.log('fetchFoodWikFromFirebase');
    // const querySnapshot = await getDocs(collection(db, 'FoodWiki2'));
    // const foodWikiData = [];
    // querySnapshot.forEach(doc => {
    //   // console.log(doc.id, " => ", doc.data());
    //   foodWikiData.push(doc.data());
    // });

    // return foodWikiData;
  } catch (error) {
    console.log(error);
  }
};

//inventory
export const fetchInventoryDataFromeFirebase = async (currentUid: string) => {
  try {
    // return {data: foodInventoryData};

    const docRef = doc(db, 'Inventory', currentUid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // console.log("Document data:", docSnap.data());
      return docSnap.data();
    } else {
      // docSnap.data() will be undefined in this case
      console.log('No such document!');
    }
  } catch (error) {
    console.log(error);
  }
};

export const postInventoryUpdateToFirebase = async (
  currentUid: string,
  newItem: FoodDetailsProps[],
) => {
  try {
    console.log('posting data-------------');
    const docRef = doc(db, 'Inventory', currentUid);
    const docSnap = await getDoc(docRef);
    const result = docSnap.data();
    const inventoryupdate = doc(db, 'Inventory', currentUid);

    await updateDoc(inventoryupdate, {
      data: [...result?.data, ...newItem],
    });
  } catch (error) {
    console.log('cannot add new item normally', error);
  }
};

export const updateExistedInventoryItem = async (
  currentUid: string,
  newItem: FoodDetailsProps,
) => {
  try {
    const docRef = doc(db, 'Inventory', currentUid);
    const docSnap = await getDoc(docRef);
    const result = docSnap.data();
    const collection = result.data;

    const updateItem = collection.map(item => {
      if (item.foodID === newItem.foodID) {
        return {...newItem};
      }

      return item;
    });

    const inventoryupdate = doc(db, 'Inventory', currentUid);

    await updateDoc(inventoryupdate, {
      data: [...updateItem],
    });
  } catch (error) {
    console.log(error);
  }
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

//use to updateFoodWiki
export const addFoodDataToFirestore = async (foodArray: any) => {
  const collectionName = 'FoodWiki2'; // Collection name

  try {
    // Loop through the array and add each item as a document
    console.log('start adding');
    for (const item of foodArray) {
      // Add each document with its foodID as the document ID
      // await addDoc(collection(db, collectionName), { ...item })
    }

    console.log('Data successfully added to Firestore!');
  } catch (error) {
    console.error('Error adding data to Firestore:', error);
  }
};

//use to updateInventory to user
