import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { MainNav } from './MainNav';
import { PostScreen } from '../screens/PostScreen';

const Stack = createStackNavigator();

export const AppNavigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="MainNav">
                <Stack.Screen
                    component={MainNav}
                    name="MainNav"
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    component={PostScreen}
                    name="Post"
                    options={({ route }) => ({
                        title: route.params.post.title,
                        headerStyle: { backgroundColor: 'red' },
                    })}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};
