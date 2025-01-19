import axios from 'axios';
import {FoodDetailsProps} from '../interface';

const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://freshy-server-40bbe573dce2.herokuapp.com'
    : 'http://localhost:2333';

const apiClient = axios.create({
  baseURL: BASE_URL,
});

console.log('>>>>>>>', process.env.NODE_ENV);

//register create information
export const postNewCustomersBasicInformation = async (data: any) => {
  return apiClient.post('/api/auth/createUserDetailsInfo', data);
};

//read from foodwiki
export const getFoodWikiFromFirebase = async () => {
  const response = await apiClient.get('/api/inventory/foodwiki');
  return response.data;
};

export const getUserDataFromFirebase = async (currentUid: string) => {
  const response = await apiClient.get(`/api/users/getuser/${currentUid}`);
  return response.data;
};

export const getUserInventoryList = async (currentUid: string) => {
  const response = await apiClient.get(
    `/api/inventory/userInventory/${currentUid}`,
  );

  return response.data;
};

export const postInventoryUpdateToFirebase = async (
  currentUid: string,
  newItem: FoodDetailsProps[],
) => {
  const response = await apiClient.post(
    `/api/inventory/add-item/${currentUid}`,
    {newItem},
  );
  return response.data;
};

export const postUpdateCustomerInfo = async (
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
  console.log({updatedData});
  return await apiClient.put('/api/users/updateUserInfo', {
    currentUid,
    updatedData,
  });
};

export const putUpdateWeeklyWrapTime = async (
  weeklyWrapTime: Partial<{Days: string; Times: string}>,
  uid: string,
) => {
  return await apiClient.put('/api/users/updateWeeklyWrapTime', {
    weeklyWrapTime,
    uid,
  });
};

export const postUpdateExistingInventory = async (
  currentUid: string,
  newItem: FoodDetailsProps,
) =>
  await apiClient.put('/api/inventory/updateFoodItem', {
    currentUid,
    newItem,
  });

export const removeItemInventoryList = async (
  currentUid: string,
  foodID: string,
) =>
  await apiClient.put('/api/inventory/remove-item', {
    currentUid,
    foodID,
  });

export const postNotification = async (data: any) => {
  return apiClient.post('/api/notification/send-notification', data);
};
