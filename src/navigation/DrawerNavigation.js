import { createDrawerNavigator } from '@react-navigation/drawer';
import { THEME } from '../theme';
import { AboutScreen } from '../screens/AboutScreen';
import { CreateScreen } from '../screens/CreateScreen';

const Drawer = createDrawerNavigator();

export const DrawerNavigator = () => {
    return (
        <Drawer.Navigator theme={THEME.MyTheme}>
            <Drawer.Screen component={AboutScreen} name="About" />
            <Drawer.Screen component={CreateScreen} name="Create" />
        </Drawer.Navigator>
    );
};
