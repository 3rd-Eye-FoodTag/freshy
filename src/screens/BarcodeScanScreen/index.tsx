import React, {useState, useEffect, useRef, useCallback} from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCodeScanner,
} from 'react-native-vision-camera';
import type {Code} from 'react-native-vision-camera';
import {getProductInfo, postInventoryUpdateToFirebase} from '../../utils/api';
import {useDispatch, useSelector} from 'react-redux';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {calculateExpirationDate, findSimilarIds} from '../../utils/utils';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
import {currentUser} from '../../redux/reducer';
import {
  addFoodItemToConfirmationList,
  confirmationListSelector,
  resetConfirmationList,
} from '../../redux/reducer/storageReducer';
import {useNavigation} from '@react-navigation/native';

const BarcodeScanScreen: React.FC = () => {
  const [scannedCodes, setScannedCodes] = useState<string[]>([]);
  const [lastScanCode, setLastScanCode] = useState<string | null>(null);
  const cameraRef = useRef<Camera>(null);
  const device = useCameraDevice('back');
  const scanInterval = 3000; // 3 seconds interval
  const navigation = useNavigation();

  const queryClient = useQueryClient();
  const confirmationList = useSelector(confirmationListSelector);
  const currentUserUUID = useSelector(currentUser);
  const dispatch = useDispatch();

  const {data: foodWikiData = []} = useQuery({
    queryKey: ['foodwiki'],
  });

  // Function to handle scanning the code
  const onCodeScanned = useCallback(
    async (codes: Code[]) => {
      const value = codes[0]?.value;
      if (value && value !== lastScanCode) {
        setLastScanCode(value);
      }
    },
    [lastScanCode],
  );

  // Fetch product info based on last scanned code
  useEffect(() => {
    if (!lastScanCode) {
      return;
    }

    const intervalID = setInterval(async () => {
      try {
        const response = await getProductInfo(lastScanCode);
        const productName = response?.data?.product?.product_name;

        if (productName) {
          setScannedCodes(prevCodes => [...prevCodes, productName]);
        }

        if (foodWikiData.length > 0) {
          const similarItems = findSimilarIds(foodWikiData, productName, 2);
          // You can process similarItems or display them if needed
          const item = similarItems[0];
          setScannedCodes(prevCodes => [...prevCodes, item]);

          const todayDate = new Date();

          const formattedItem = {
            foodID: uuidv4(),
            foodName: item.foodName,
            quantity: item.quantity || 1,
            category: item.category,
            predictedFreshDurations: item?.predictedFreshDurations,
            consumed: false,
            share: true,
            freshnessScore: 100,
            storagePlace: item?.storagePlace || 'Fridge',
            cost: 0,
            groceryStore: '',
            imageName: item?.imageName,
            consumedAt: '',
            updatedByUser: currentUserUUID,
            createdBy: todayDate.toString(),
            purchaseDate: todayDate.toString(),
            createdAt: todayDate.toString(),
            updatedAt: todayDate.toString(),
            //going to add recommendated storagePlace
            foodWikiID: item?.foodWikiID,
            alternativeNames: item?.alternativeNames,
            expiryDate: calculateExpirationDate(
              item?.predictedFreshDurations?.fridge || 0,
            ),
            storageTip: item?.comment || '',
          };

          dispatch(addFoodItemToConfirmationList(formattedItem));
        }

        setLastScanCode(null);
      } catch (error) {
        console.error('Error fetching product info:', error);
      }
    }, scanInterval);

    // Cleanup interval on unmount or when lastScanCode changes
    return () => clearInterval(intervalID);
  }, [lastScanCode, foodWikiData, scannedCodes]);

  const addFoodItem = useMutation({
    mutationFn: async (postPayload: any) => {
      const {userId, data} = postPayload;
      return await postInventoryUpdateToFirebase(userId, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['userInventory']});
      navigation.navigate('HomePage');
    },
  });

  const handleConfirmationAll = () => {
    addFoodItem.mutate({userId: currentUserUUID, data: [...confirmationList]});
    dispatch(resetConfirmationList(''));
  };

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: onCodeScanned,
  });

  if (!device) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading Camera...</Text>
      </View>
    );
  }

  console.log({confirmationList});

  return (
    <View style={styles.container}>
      <Camera
        style={styles.scanner}
        device={device}
        isActive={true}
        ref={cameraRef}
        codeScanner={codeScanner}
      />

      <FlatList
        data={scannedCodes.filter(item => typeof item !== 'string')}
        keyExtractor={(item, index) => `${item.foodName}-${index}`} // Use unique keys for FlatList
        renderItem={({item}) => (
          <View style={styles.item}>
            <Text>{item.foodName}</Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.tipText}>
            Tip: You can scan multiple codes at a time.
          </Text>
        }
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={handleConfirmationAll}>
        <Text style={styles.addButtonText}>Add to Inventory</Text>
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
    borderWidth: 2,
    borderColor: '#000',
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BarcodeScanScreen;
