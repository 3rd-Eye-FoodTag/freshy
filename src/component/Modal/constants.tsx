import React, {ReactNode} from 'react';
import FoodDetailsEditModal from './FoodDetailsEditModal'; // Example modal component
import ManualInputModal from './ManualInputModal';

// Define modal constants
interface Modal {
  FOOD_DETAILS_MODAL: string;
  MANNUAL_INPUT_MODAL: string;
}

export const modalConstants: Modal = {
  FOOD_DETAILS_MODAL: 'FOOD_DETAILS_MODAL',
  MANNUAL_INPUT_MODAL: 'MANNUAL_INPUT_MODAL',
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
};
