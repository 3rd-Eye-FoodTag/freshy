export const chatGptQuestion = (rawText: string) => {
  return `Here is the raw OCR text from a receipt:\n\n${rawText}\n\n
            Please extract the data into the following JSON format:
            {
                "storeName": "string", // The name of the store or "Unknown Store" if not found.
                "date": "string", // The date in YYYY-MM-DD format or "Unknown Date" if not found.
                "items": [ // An array of extracted items from the receipt.
                    {
                        "foodName": "string", // The name of the food item.
                        "alternativeNames": [], // Alternative names for the food item, or an empty array if not found.
                        "category": "string", // The category of the item, Predicted the type based on your general knowledge
                        "chineseName": "string", // The Chinese name of the item, or null if not found.
                        "comment": "string", // Any relevant comments, or null if not found.
                        "customizeName": "string", // A customizable name provided by the user, or null if not applicable.
                        "foodWikiID": "string", // A unique ID for the food item, or null if not found.
                        "fridge": "string", // Shelf life in the fridge, e.g., "3-4 weeks".
                        "frozen": "string", // Shelf life in the freezer, e.g., "8-12 months".
                        "imageName": "string", // Name of the image file for this food, or null if not applicable.
                        "predictedFreshDurations": { // Predicted fresh durations in different conditions, unit in days, but please only contain number
                            "fridge": "number", // condition in fridge, If not found, simulate based on general knowledge. if not recommended, return "0"
                            "freezer": "number", // condition in freezer, If not found, simulate based on general knowledge.
                            "room": "number",//  condition in room temperature,  If not found, simulate based on general knowledge.
                        },
                        "recommendedRecipes": [], // Array of recommended recipes for this food item, or an empty array.
                        "roomTemperature": "string", // Shelf life at room temperature, e.g., "Up to 7 days".
                        "type": "string" // The type of the item, Predicted the type based on your general knowledge
                        "cost": "number" | 0,
                        "quantity": "number",
                    }
                ],
                "total": "number"
            }

            Ensure that:
            1. If exact predictedFreshDurations data is not available, generate reasonable estimates based on food category and type.
            2. All fields are included, even if they are null or empty.
            3. The response strictly adheres to this format.
            4. Only the JSON object is returned without any additional explanation.
            5. Merge Duplicate item to same item`;
};
