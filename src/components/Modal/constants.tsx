import React, {ReactNode} from 'react';
import FoodDetailsEditModal from './FoodDetailsEditModal'; // Example modal component
import ManualInputModal from './ManualInputModal';
import CreateNewFoodItem from './CreateNewFoodItem';

// Define modal constants
interface Modal {
  FOOD_DETAILS_MODAL: string;
  MANNUAL_INPUT_MODAL: string;
  CREATE_NEW_FOOD_ITEM: string;
}

export const modalConstants: Modal = {
  FOOD_DETAILS_MODAL: 'FOOD_DETAILS_MODAL',
  MANNUAL_INPUT_MODAL: 'MANNUAL_INPUT_MODAL',
  CREATE_NEW_FOOD_ITEM: 'CREATE_NEW_FOOD_ITEM',
};

// Modal content map to render the correct modal based on the constant
type ModalFunction = (props: any) => ReactNode;
type ContentMap = Record<string, ModalFunction>;

export const ModalContent: ContentMap = {
  [modalConstants.FOOD_DETAILS_MODAL]: props => (
    <FoodDetailsEditModal {...props} />
  ),
  [modalConstants.MANNUAL_INPUT_MODAL]: props => (
    <ManualInputModal {...props} />
  ),
  [modalConstants.CREATE_NEW_FOOD_ITEM]: props => (
    <CreateNewFoodItem {...props} />
  ),
};
