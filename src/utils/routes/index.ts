import {current} from '@reduxjs/toolkit';
import axios from 'axios';
import {FoodDetailsProps} from '../interface';

const env = 'http://localhost:2333';

//register create information
export const postNewCustomersBasicInformation = async (data: any) => {
  return axios.post(env + '/api/auth/createUserDetailsInfo', data);
};

//read from foodwiki
export const getFoodWikiFromFirebase = async () => {
  const response = await axios.get(env + '/api/inventory/foodwiki');
  return response.data;
};

export const getUserDataFromFirebase = async (currentUid: string) => {
  const response = await axios.get(env + `/api/users/getuser/${currentUid}`);
  return response.data;
};

export const getUserInventoryList = async (currentUid: string) => {
  const response = await axios.get(
    env + `/api/inventory/userInventory/${currentUid}`,
  );
  return response.data;
};

export const postInventoryUpdateToFirebase = async (
  currentUid: string,
  newItem: FoodDetailsProps[],
) => {
  const response = await axios.post(
    env + `/api/inventory/add-item/${currentUid}`,
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
  return await axios.put(env + '/api/users/updateUserInfo', {
    currentUid,
    updatedData,
  });
};

export const putUpdateWeeklyWrapTime = async (
  weeklyWrapTime: Partial<{Days: string; Times: string}>,
  userId: string,
) =>
  await axios.put(env + '/api/users/updateWeeklyWrapTime', {
    weeklyWrapTime,
    userId,
  });

export const postUpdateExistingInventory = async (
  currentUid: string,
  newItem: FoodDetailsProps,
) =>
  await axios.put(env + '/api/inventory/updateFoodItem', {
    currentUid,
    newItem,
  });

export const removeItemInventoryList = async (
  currentUid: string,
  foodID: string,
) =>
  await axios.put(env + '/api/inventory/remove-item', {
    currentUid,
    foodID,
  });

export const postNotification = async (data: any) => {
  return axios.post(env + '/api/notification/send-notification', data);
};
