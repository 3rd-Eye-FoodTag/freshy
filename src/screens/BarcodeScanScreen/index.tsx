import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCodeScanner,
  // useFrameProcessor,
} from 'react-native-vision-camera';
import {runOnJS} from 'react-native-reanimated';

const BarcodeScanScreen: React.FC = () => {
  const [scannedCodes, setScannedCodes] = useState<string[]>([]);
  const cameraRef = useRef<Camera>(null);
  const device = useCameraDevice('back');

  // Request camera permission on mount
  // useEffect(() => {
  //   const requestCameraPermission = async () => {
  //     const cameraPermission = await Camera.getCameraPermissionStatus();
  //     if (cameraPermission !== 'authorized') {
  //       const newCameraPermission = await Camera.requestCameraPermission();
  //       if (newCameraPermission !== 'authorized') {
  //         Alert.alert('Error', 'Camera permission is required to scan codes.');
  //       }
  //     }
  //   };
  //   requestCameraPermission();
  // }, []);

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: codes => {
      console.log({codes}, '--------');
      console.log(`Scanned ${codes.length} codes!`);
    },
  });

  // const frameProcessor = useFrameProcessor(frame => {
  //   'worklet';
  //   const objects = detectObjects(frame);
  //   const label = objects[0].name;
  //   console.log(`You're looking at a ${label}.`);
  // }, []);

  const handleScan = (codes: string[]) => {
    // Update scanned codes
    setScannedCodes(prevCodes => [...prevCodes, ...codes]);
  };

  if (device == null) {
    return <Text>Loading Camera...</Text>;
  }

  return (
    <View style={styles.container}>
      {/* Camera with Frame Processor */}
      <Camera
        style={styles.scanner}
        device={device}
        isActive={true}
        ref={cameraRef}
        codeScanner={codeScanner}
      />

      {/* Scanned Codes List */}
      <FlatList
        data={scannedCodes}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <View style={styles.item}>
            <Text>{item}</Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.tipText}>
            {/* Tip: You can scan multiple codes at a time */}
          </Text>
        }
      />

      {/* Mock Scan Button */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => handleScan(['Manually Scanned Barcode'])}>
        <Text style={styles.addButtonText}>Mock Scan</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  scanner: {
    height: 200,
    // borderWidth: 2,
    // borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
    marginBottom: 16,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  tipText: {
    textAlign: 'center',
    marginBottom: 16,
    color: '#666',
  },
  addButton: {
    backgroundColor: '#66CDAA',
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 6,
  },
  addButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default BarcodeScanScreen;
