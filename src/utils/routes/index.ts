import axios from 'axios';
import {FoodDetailsProps} from '../interface';

const apiClient = axios.create({
  baseURL: process.env.BASE_URL,
});

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
  console.warn('fetching', {baseURL: process.env.BASE_URL});
  const response = await apiClient.get(
    `/api/inventory/userInventory/${currentUid}`,
  );
  console.log({response});
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
  userId: string,
) =>
  await apiClient.put('/api/users/updateWeeklyWrapTime', {
    weeklyWrapTime,
    userId,
  });

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
