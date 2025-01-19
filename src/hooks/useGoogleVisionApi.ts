import {useState} from 'react';
import axios from 'axios';

const useGoogleVisionApi = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const extractTextFromImage = async (base64Image: string): Promise<string> => {
    setIsLoading(true);
    setError(null);

    try {
      const requestBody = {
        requests: [
          {
            image: {content: base64Image.split(',')[1]},
            features: [{type: 'DOCUMENT_TEXT_DETECTION'}],
          },
        ],
      };

      const response = await axios.post(
        `https://vision.googleapis.com/v1/images:annotate?key=${process.env.GOOGLE_VISION_API_KEY}`,
        requestBody,
        {headers: {'Content-Type': 'application/json'}},
      );

      const textAnnotations = response.data.responses[0]?.textAnnotations;
      if (textAnnotations && textAnnotations.length > 0) {
        return textAnnotations[0].description;
      } else {
        throw new Error('No text found in the image.');
      }
    } catch (err: any) {
      setError(
        err.message || 'Failed to extract text using Google Vision API.',
      );
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {extractTextFromImage, isLoading, error};
};

export default useGoogleVisionApi;
