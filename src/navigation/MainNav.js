import { TabNavigator } from './TabNavigation';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { AboutScreen } from '../screens/AboutScreen';
import { CreateScreen } from '../screens/CreateScreen';
import { THEME } from '../theme';

const Draw = createDrawerNavigator();

export const MainNav = () => {
    return (
        <Draw.Navigator
            initialRouteName="Main"
            screenOptions={{
                headerStyle: { backgroundColor: THEME.MAIN_COLOR },
                headerTintColor: '#fff',
                drawerStyle: { backgroundColor: '#fff' },
                drawerLabelStyle: { fontFamily: 'open-bold' },
            }}
        >
            <Draw.Screen name="Main" component={TabNavigator} />
            <Draw.Screen name="About" component={AboutScreen} />
            <Draw.Screen name="Create" component={CreateScreen} />
        </Draw.Navigator>
    );
};
