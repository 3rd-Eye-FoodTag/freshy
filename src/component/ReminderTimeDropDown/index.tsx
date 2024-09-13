import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

interface ReminderTimeDropDownProps {
    placeholder: string;
    options: string[];
    style?: any;
}

const ReminderTimeDropDown: React.FC<ReminderTimeDropDownProps> = ({ placeholder, options, style }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleOptionSelect = (option: string) => {
        setSelectedOption(option);
        setIsOpen(false);
    };

    return (
        <View style={[styles.inputContainer, styles.dropdownContainer, style]}>
            {!selectedOption && (
                <Text style={styles.placeholder}>{placeholder}</Text>
            )}
            <TouchableOpacity style={styles.dropdownButton} onPress={toggleDropdown}>
                <Text style={styles.dropdownText}>{selectedOption || placeholder}</Text>
                <Text style={styles.dropdownArrow}>{'>'}</Text>
            </TouchableOpacity>
            {/* 如果下拉菜单是打开状态，则显示选项列表 */}
            {isOpen && (
                <View style={[styles.dropdownOptions, { height: 500 }]}>
                    {/* 顶部操作栏：包括取消和完成按钮 */}
                    <View style={styles.topBar}>
                        <TouchableOpacity style={styles.cancelButton} onPress={() => setIsOpen(false)}>
                            <Text style={[styles.buttonText]}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.doneButton} onPress={() => setIsOpen(false)}>
                            <Text style={[styles.buttonText]}>Done</Text>
                        </TouchableOpacity>
                    </View>
                    {/* 分割线 */}
                    <View style={styles.divider} />
                    {/* 可滚动的选项列表 */}
                    <ScrollView style={styles.optionList}>
                        {/* 映射选项列表 */}
                        {options.map((option, index) => (
                            <TouchableOpacity
                                key={index}
                                style={[styles.option, selectedOption === option && styles.selectedOption]}
                                onPress={() => handleOptionSelect(option)}
                            >
                                <Text style={styles.optionText}>{option}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        height: 40,
        position: 'absolute',
        right: 0,
    },
    dropdownContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    placeholder: {
        position: 'absolute',
        left: 0,
        top: '50%',
        transform: [{ translateY: -10 }],
        color: 'white',
        fontSize: 17,
    },
    dropdownButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    dropdownText: {
        flex: 1,
        fontSize: 18,
        fontFamily: 'PingFang SC',
        color: 'gray',
    },
    dropdownArrow: {
        fontSize: 28,
        color: 'lightgray',
        marginLeft: 10,
    },
    dropdownOptions: {
        position: 'absolute',
        top: 200,
        left: -300,
        right: -30,
        backgroundColor: '#fff',
    },
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    cancelButton: {
        paddingVertical: 5,
    },
    doneButton: {
        paddingVertical: 5,
    },
    buttonText: {
        fontSize: 16,
        color: 'rgb(81, 179, 125)'
    },
    divider: {
        height: 0.5,
        backgroundColor: 'rgba(211, 211, 211, 0.3)',
    },
    optionList: {
        height: 50,
    },
    option: {
        paddingVertical: 20,
    },
    selectedOption: {
    },
    optionText: {
        fontSize: 20,
        textAlign: 'center'
    },
});

export default ReminderTimeDropDown;
