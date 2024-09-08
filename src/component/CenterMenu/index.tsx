import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Text, Modal} from 'react-native';
import ManualInputModal from '../ManualInputModal';

const CenterMenu = ({isMenuVisible, setMenuVisible}) => {
  const [isSearchModalVisible, setSearchModalVisible] = useState(false);
  const toggleMenu = () => {
    setMenuVisible(!isMenuVisible);
  };

  const handleManualInput = () => {
    console.log('Manual Input selected');
    setSearchModalVisible(true);
    setMenuVisible(!isMenuVisible);
  };

  const handleBarcode = () => {
    console.log('Barcode selected');
    setMenuVisible(!isMenuVisible);
  };

  const handleSmartCameraRecognition = () => {
    console.log('Smart Camera Recognition selected');
    setMenuVisible(!isMenuVisible);
  };

  const handleReceipt = () => {
    console.log('Receipt selected');
    setMenuVisible(!isMenuVisible);
  };

  const handleCreateNewItem = () => {
    console.log('Create a new item selected');
    setMenuVisible(!isMenuVisible);
  };

  return (
    <View style={styles.container}>
      {isMenuVisible && (
        <Modal transparent animationType="fade" visible={isMenuVisible}>
          <TouchableOpacity style={styles.overlay} onPress={toggleMenu} />
          <View style={styles.menuContainer}>
            <TouchableOpacity
              style={styles.menuButton}
              onPress={handleManualInput}>
              <Text style={styles.menuText}>Manual Input</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuButton} onPress={handleBarcode}>
              <Text style={styles.menuText}>Barcode</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuButton}
              onPress={handleSmartCameraRecognition}>
              <Text style={styles.menuText}>Smart Camera Recognition</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuButton} onPress={handleReceipt}>
              <Text style={styles.menuText}>Receipt</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuButton}
              onPress={handleCreateNewItem}>
              <Text style={styles.menuText}>Create a new item</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      )}

      <ManualInputModal
        visible={isSearchModalVisible}
        onClose={() => setSearchModalVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  menuContainer: {
    position: 'absolute',
    bottom: 100,
    alignSelf: 'center',
  },
  menuButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
    alignItems: 'center',
  },
  menuText: {
    color: '#fff',
    fontSize: 16,
  },
  fab: {
    backgroundColor: '#4CAF50',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 30,
  },
  fabText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default CenterMenu;
