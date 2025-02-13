import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';  // Asegúrate de que esta importación está correcta
import HomeScreen from './homeScreen';
import SettingScreen from './SettingScreen';
const Tab = createBottomTabNavigator();

export default function HomeLayout() {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: { backgroundColor: '#fff', borderTopWidth: 0 },
                tabBarLabelStyle: { fontSize: 12 },
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
            }}
        >
            <Tab.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ color }) => <Ionicons name="home" size={24} color={color} />,
                    title: 'Home',
                }}
            />

            <Tab.Screen
                name="SettingsScreens"
                component={SettingScreen}
                options={{
                    tabBarIcon: ({ color }) => <Ionicons name="settings" size={24} color={color} />,
                    title: 'Configuraciónes',
                }}
            />
        </Tab.Navigator>
    );
}
