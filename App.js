import 'react-native-gesture-handler';
import { useEffect, useState } from 'react';
import { bootstrap } from './src/bootstrap';
import { AppNavigation } from './src/navigation/AppNavigation';
import * as SplashScreen from 'expo-splash-screen';

export default function App() {
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        async function prepare() {
            try {
                await SplashScreen.preventAutoHideAsync();
                await bootstrap();
                // await new Promise((resolve) => setTimeout(resolve, 2000));
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

    return <AppNavigation />;
}
