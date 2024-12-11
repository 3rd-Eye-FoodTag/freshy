import React, {useState, useEffect} from 'react';
import {View, Button, Image, StyleSheet, Alert} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {ScrollView, VStack, HStack, Text} from 'native-base';
import useGoogleVisionApi from '../../hooks/useGoogleVisionApi';
import useChatGptApi from '../../hooks/useChatGptApi';
import useHandleAddItem from '../../hooks/useHandleAddItem';
import ConfirmationList from '../../component/ConfirmationList';
import {useNavigation} from '@react-navigation/native';

const ReceiptScreen = () => {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [structuredData, setStructuredData] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [isConfirmationVisible, setConfirmationVisible] = useState(false);
  const navigation = useNavigation();

  const {extractTextFromImage, isLoading: googleLoading} = useGoogleVisionApi();
  const {processReceiptText, isLoading: chatGptLoading} = useChatGptApi();
  const {
    addArrayToConfirmationList,
    confirmationList,
    addFoodToInventory,
    updateQuantity,
  } = useHandleAddItem();

  const handleConfirmationAll = () => {
    addFoodToInventory();
    navigation.navigate('HomePage');
    setConfirmationVisible(false);
  };

  const selectImage = () => {
    launchImageLibrary({mediaType: 'photo'}, response => {
      if (response.didCancel) {
        Alert.alert('Cancelled', 'Image selection cancelled.');
      } else if (response.errorCode) {
        Alert.alert('Error', `Error Code: ${response.errorCode}`);
      } else if (response.assets && response.assets[0]) {
        setImageUri(response.assets[0].uri);
      }
    });
  };

  const convertImageToBase64 = async (uri: string): Promise<string | null> => {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error('Error converting image to base64:', error);
      return null;
    }
  };

  const handleImageProcessing = async () => {
    if (!imageUri) {
      Alert.alert('No Image Selected', 'Please select an image first!');
      return;
    }

    setLoading(true);

    try {
      const base64Image = await convertImageToBase64(imageUri);
      if (!base64Image) {
        throw new Error('Failed to convert image to base64.');
      }

      const rawText = await extractTextFromImage(base64Image);
      const structuredData = await processReceiptText(rawText);

      setStructuredData(structuredData);
      addArrayToConfirmationList(structuredData.items);
    } catch (error) {
      console.error('Error processing image:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderReceiptData = () => {
    if (!structuredData) {
      return null;
    }

    return (
      <ScrollView>
        <VStack space={4} style={styles.dataContainer}>
          <HStack justifyContent="space-between" style={styles.row}>
            <Text bold>Store Name:</Text>
            <Text>{structuredData.storeName}</Text>
          </HStack>
          <HStack justifyContent="space-between" style={styles.row}>
            <Text bold>Date:</Text>
            <Text>{structuredData.date}</Text>
          </HStack>
          {structuredData.items.map((item: any, index: number) => {
            return (
              <HStack
                key={index}
                justifyContent="space-between"
                style={styles.row}>
                <Text>
                  {item.foodName} x {item.quantity}
                </Text>
                <Text>${item.cost.toFixed(2)}</Text>
              </HStack>
            );
          })}
          <HStack justifyContent="space-between" style={styles.row}>
            <Text bold>Total:</Text>
            <Text>${structuredData.total.toFixed(2)}</Text>
          </HStack>
        </VStack>
      </ScrollView>
    );
  };

  return (
    <View style={styles.container}>
      {isConfirmationVisible ? (
        <ConfirmationList
          confirmationList={confirmationList}
          updateQuantity={updateQuantity}
          onConfirmAll={handleConfirmationAll}
        />
      ) : (
        <>
          <Button title="Pick an Image" onPress={selectImage} />
          {imageUri && <Image source={{uri: imageUri}} style={styles.image} />}
          <Button
            title={loading ? 'Processing...' : 'Process Receipt'}
            onPress={handleImageProcessing}
            disabled={loading || googleLoading || chatGptLoading}
          />
          {confirmationList.length > 0 && (
            <Button
              title="Add to Inventory"
              onPress={() => setConfirmationVisible(true)}
              disabled={loading}
            />
          )}
          {!loading && renderReceiptData()}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    marginVertical: 16,
    borderRadius: 10,
  },
  dataContainer: {
    marginTop: 16,
    paddingHorizontal: 16,
  },
  row: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
});

export default ReceiptScreen;
