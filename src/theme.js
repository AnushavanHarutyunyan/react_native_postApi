import { DefaultTheme } from '@react-navigation/native';
import { Platform } from 'react-native';

export const THEME = {
    MAIN_COLOR: '#303f9f',
    DANGER_COLOR: '#d81b60',
    MyTheme: {
        ...DefaultTheme,
        colors: {
            ...DefaultTheme.colors,
            primary: 'rgb(255, 45, 85)',
            background: 'rgb(242, 242, 242)',
            card: Platform.OS === 'android' ? '#303f9f' : '#fff',
            text: Platform.OS === 'android' ? '#fff' : '#303f9f',
            border: 'rgb(199, 199, 204)',
            notification: 'rgb(255, 69, 58)',
        },
        postScreen: {
            background: 'red',
        },
    },
};
