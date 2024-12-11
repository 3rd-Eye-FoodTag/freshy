import React, {ReactNode} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {Modal} from 'native-base';
import {useDispatch, useSelector} from 'react-redux';
import {ModalContent} from './constants';
import {
  modalSelector,
  resetConfirmationList,
  updateModalConstant,
} from '../../redux/reducer/storageReducer';

interface ModalContainerProps {
  children: ReactNode;
}

const ModalContainer: React.FC<ModalContainerProps> = ({children}) => {
  const dispatch = useDispatch();
  const {modalConstant, modalProps} = useSelector(modalSelector);

  const handleCloseModal = () => {
    dispatch(updateModalConstant(''));
    dispatch(resetConfirmationList(''));
  };

  return (
    <View style={styles.container}>
      {children}
      <Modal
        isOpen={!!modalConstant}
        onClose={() => handleCloseModal()}
        animationPreset="slide"
        size="full">
        <Modal.Content
          maxWidth="100%"
          height="100%"
          marginTop="auto"
          borderTopRadius="20px">
          <Modal.CloseButton onPress={handleCloseModal} />
          {modalConstant &&
            ModalContent[modalConstant] &&
            ModalContent[modalConstant](modalProps)}
        </Modal.Content>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ModalContainer;
