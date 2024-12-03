import React, {useState} from 'react';
import {View, Button, Image, StyleSheet, Alert} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';
import {Text, VStack, HStack, ScrollView} from 'native-base';
import Config from 'react-native-config';

const ReceiptScreen = () => {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [structuredData, setStructuredData] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

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

  const convertImageToBase64 = async (
    imageUri: string,
  ): Promise<string | null> => {
    try {
      const response = await fetch(imageUri);
      const blob = await response.blob();
      const reader = new FileReader();

      return new Promise((resolve, reject) => {
        reader.onloadend = () => {
          resolve(reader.result as string);
        };
        reader.onerror = error => reject(error);

        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error('Error converting image to base64:', error);
      Alert.alert('Error', 'Failed to process the image.');
      return null;
    }
  };

  const extractTextFromVisionAPI = async (
    base64Image: string,
  ): Promise<string> => {
    try {
      const requestBody = {
        requests: [
          {
            image: {
              content: base64Image.split(',')[1],
            },
            features: [
              {
                type: 'DOCUMENT_TEXT_DETECTION',
              },
            ],
          },
        ],
      };

      const response = await axios.post(
        `https://vision.googleapis.com/v1/images:annotate?key=${Config.GOOGLE_VISION_API_KEY}`,
        requestBody,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      const textAnnotations = response.data.responses[0].textAnnotations;
      if (textAnnotations && textAnnotations.length > 0) {
        return textAnnotations[0].description;
      } else {
        throw new Error('No text found in the image.');
      }
    } catch (error) {
      console.error('Google Vision API Error:', error);
      Alert.alert('Error', 'Failed to extract text using Google Vision API.');
      throw error;
    }
  };

  const processTextWithChatGPT = async (rawText: string): Promise<any> => {
    try {
      const requestBody = {
        model: 'gpt-4',
        messages: [
          {
            role: 'user',
            content: `Here is the raw OCR text from a receipt:\n\n${rawText}\n\nPlease extract and format the structured fields as JSON, including fields like store name, date, items, and total.`,
          },
        ],
      };

      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${Config.CHATGPT_API_KEY}`,
            'Content-Type': 'application/json',
          },
        },
      );

      return JSON.parse(response.data.choices[0].message.content);
    } catch (error) {
      console.error('ChatGPT API Error:', error);
      Alert.alert('Error', 'Failed to process text using ChatGPT.');
      throw error;
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

      const rawText = await extractTextFromVisionAPI(base64Image);
      console.log('Raw OCR Text:', rawText);

      const structuredData = await processTextWithChatGPT(rawText);
      console.log('Structured Data:', structuredData);

      setStructuredData(structuredData);
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
          {structuredData.items.map((item: any, index: number) => (
            <HStack
              justifyContent="space-between"
              key={index}
              style={styles.row}>
              <Text>
                {item.name} x {item.quantity}
              </Text>
              <Text>${item.price}</Text>
            </HStack>
          ))}
          <HStack justifyContent="space-between" style={styles.row}>
            <Text bold>Tax:</Text>
            <Text>${structuredData.tax}</Text>
          </HStack>
          <HStack justifyContent="space-between" style={styles.row}>
            <Text bold>Total:</Text>
            <Text>${structuredData.total}</Text>
          </HStack>
        </VStack>
      </ScrollView>
    );
  };

  return (
    <View style={styles.container}>
      <Button title="Pick an Image" onPress={selectImage} />
      {imageUri && <Image source={{uri: imageUri}} style={styles.image} />}
      <Button
        title={loading ? 'Processing...' : 'Process Receipt'}
        onPress={handleImageProcessing}
        disabled={loading}
      />
      {renderReceiptData()}
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
