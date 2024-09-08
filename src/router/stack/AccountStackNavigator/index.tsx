import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AccountScreen from '../../../screens/AccountScreen';
import EditUserProfileScreen from '../../../screens/AccountScreen/EditUserProfileScreen';

const AccountStack = createNativeStackNavigator();

function AccountStackNavigator() {
    return (
        <AccountStack.Navigator>
            <AccountStack.Screen 
            name="Account" 
            component={AccountScreen}
            options={{ headerShown: false }}
            />
            
            <AccountStack.Screen
                name="EditUserProfileScreen"
                component={EditUserProfileScreen} options={{
                headerTitle: '',
                headerBackTitle: 'Back',
                }} />
        </AccountStack.Navigator>
    );
}

export default AccountStackNavigator;
