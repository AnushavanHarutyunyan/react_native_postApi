import React, { useLayoutEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MainScreen } from '../screens/MainScreen';
import { BookedScreen } from '../screens/BookedScreen';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { AppHeaderIcon } from '../components/AppHeaderIcon';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { THEME } from '../theme';

const Tab = createBottomTabNavigator();

export const TabNavigator = ({ navigation }) => {
    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
                    <Item
                        title="add-circle-outline"
                        iconName="add-circle-outline"
                        onPress={() => navigation.navigate('Create')}
                    />
                </HeaderButtons>
            ),
            headerLeft: () => (
                <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
                    <Item
                        title="toggle-menu"
                        iconName="ios-menu"
                        onPress={() => navigation.toggleDrawer()}
                    />
                </HeaderButtons>
            ),
        });
    }, [navigation]);

    return (
        <Tab.Navigator
            screenOptions={() => {
                return {
                    tabBarIcon: () => {
                        return (
                            <Ionicons
                                name="ios-information-circle"
                                size={30}
                                color="#548795"
                            />
                        );
                    },
                    headerShown: false,
                    tabBarActiveTintColor: '#fff',
                    tabBarStyle: {
                        backgroundColor: THEME.MAIN_COLOR,
                    },
                    tabBarInactiveTintColor: 'gray',
                };
            }}
        >
            <Tab.Screen name="MainScreen" component={MainScreen} />
            <Tab.Screen name="Booked" component={BookedScreen} />
        </Tab.Navigator>
    );
};
