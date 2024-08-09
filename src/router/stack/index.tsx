
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParams, AuthenticationStackParams} from '../constants'
import WelcomeScreen from '../Authentication/WelcomeScreen'
import EmailInputScreen from '../Authentication/RegisterScreen/EmailInputScreen';
import PasswordInputScreen from '../Authentication/RegisterScreen/PasswordInputScreen';
import MoreInfoInputScreen from '../Authentication/RegisterScreen/MoreInfoInputScreen';
import LoginScreen from '../Authentication/LoginScreen';


const RootStackNavigator = createNativeStackNavigator<AuthenticationStackParams>()
const { Navigator,  Screen } = RootStackNavigator

const Stack: React.FC = () => {
    return (
        <Navigator>
            <Screen
                name="WelcomeScreen" 
                component={WelcomeScreen}
                options={{ 
                    headerShown: false,
                    headerBackTitle: 'Back',
                }}
            /> 
            <Screen
                name="MoreInfoInputScreen" 
                component={MoreInfoInputScreen}
                options={{ 
                    headerTitle: '',
                    headerBackTitle: 'Back',
                }}
                /> 
            <Screen
                name="EmailInputScreen" 
                component={EmailInputScreen}
                options={{ 
                    headerTitle: '',
                    headerBackTitle: 'Back',
                }}
                /> 
            <Screen
                name="PasswordInputScreen" 
                component={PasswordInputScreen}
                options={{ 
                    headerTitle: '',
                    headerBackTitle: 'Back',
                }}
                /> 
            <Screen
                name="LoginScreen" 
                component={LoginScreen}
                options={{ 
                    headerTitle: '',
                    headerBackTitle: 'Back',
                }}
            /> 
        </Navigator>
    )
}

export default Stack