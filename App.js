import 'react-native-gesture-handler';
import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { bootstrap } from './src/bootstrap';
import { AppNavigation } from './src/navigation/AppNavigation';
import store from './src/store';
import * as SplashScreen from 'expo-splash-screen';

export default function App() {
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        async function prepare() {
            try {
                await SplashScreen.preventAutoHideAsync();
                await bootstrap();
            } catch (e) {
                console.warn(e);
            } finally {
                setIsReady(true);
            }
        }
        prepare();
    }, []);

    if (isReady) {
        SplashScreen.hideAsync();
    } else {
        return null;
    }

    return (
        <Provider store={store}>
            <AppNavigation />
        </Provider>
    );
}
