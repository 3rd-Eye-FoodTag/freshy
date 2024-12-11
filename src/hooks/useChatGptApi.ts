import {useState} from 'react';
import axios from 'axios';
import Config from 'react-native-config';
import {chatGptQuestion} from './constants';

const useChatGptApi = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const processReceiptText = async (rawText: string): Promise<any> => {
    setIsLoading(true);
    setError(null);

    try {
      const requestBody = {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: chatGptQuestion(rawText),
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

      return JSON.parse(response.data.choices[0]?.message?.content || '{}');
    } catch (err: any) {
      setError(err.message || 'Failed to process text using ChatGPT.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {processReceiptText, isLoading, error};
};

export default useChatGptApi;
