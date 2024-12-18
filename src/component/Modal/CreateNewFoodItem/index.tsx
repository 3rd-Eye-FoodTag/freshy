import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {addFoodItemsToFirebase} from './firebaseService'; // Import your add function
import FoodDetailsEditModal from '../FoodDetailsEditModal';
import {emptyFoodDetails} from '../../../utils/constants';

type CreateNewFoodItemProps = {
  visible: boolean;
  onClose: () => void;
};

const CreateNewFoodItem: React.FC<CreateNewFoodItemProps> = ({
  visible,
  onClose,
}) => {
  const [foodName, setFoodName] = useState('');
  const [category, setCategory] = useState('');
  const [fridgeDuration, setFridgeDuration] = useState('');
  const [frozenDuration, setFrozenDuration] = useState('');

  const handleAddFood = async () => {
    if (!foodName || !category) {
      alert('Food name and category are required!');
      return;
    }

    const newFoodItem = {
      foodName,
      category,
      fridge: fridgeDuration,
      frozen: frozenDuration,
    };

    try {
      await addFoodItemsToFirebase([newFoodItem]);
      alert('Food item added successfully!');
      onClose(); // Close the modal after success
      resetForm();
    } catch (error) {
      console.error('Error adding food item:', error);
      alert('Failed to add food item. Try again.');
    }
  };

  const resetForm = () => {
    setFoodName('');
    setCategory('');
    setFridgeDuration('');
    setFrozenDuration('');
  };

  return null;
  // return <FoodDetailsEditModal foodDetails={emptyFoodDetails} isNewItem />;
};

export default CreateNewFoodItem;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  cancelButton: {
    backgroundColor: '#f44336',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
