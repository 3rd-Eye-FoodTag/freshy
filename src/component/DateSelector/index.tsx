import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface DateSelectorProps {
    label: string;
    date: string;
    options: string[];
    onSelectOption: (option: string) => void;
}

const DateSelector: React.FC<DateSelectorProps> = ({ label, date, options, onSelectOption }) => {
    const [selectedOption, setSelectedOption] = useState<string | null>(null);

    const handlePress = (option: string) => {
        setSelectedOption(option);
        onSelectOption(option);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.label}>{label}</Text>
                <Text style={styles.date}>{date}</Text>
            </View>
            <View style={styles.optionsContainer}>
                {options.map((option) => (
                    <TouchableOpacity
                        key={option}
                        style={[
                            styles.option,
                            selectedOption === option && styles.selectedOption
                        ]}
                        onPress={() => handlePress(option)}
                    >
                        <Text
                            style={[
                                styles.optionText,
                                selectedOption === option && styles.selectedOptionText
                            ]}
                        >
                            {option}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        width: '100%',
        borderRadius: 10,
        padding: 15,
    },
    header: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    label: {
        color: '#999',
        fontFamily: 'PingFang SC',
        fontSize: 15,
        marginLeft: 10,
    },
    date: {
        color: '#00B578',
        fontFamily: 'PingFang SC',
        fontSize: 15,
    },
    optionsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    option: {
        flexBasis: '30%',
        marginBottom: 10,
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectedOption: {
        backgroundColor: '#E0F7F1',
        borderColor: '#00B578',
        borderWidth: 1,
    },
    optionText: {
        fontSize: 14,
        fontFamily: 'PingFang SC',
        fontWeight: 'bold',
        color: 'black',
    },
    selectedOptionText: {
        color: '#00B578',
        fontWeight: 'bold',
    },
});

export default DateSelector;
