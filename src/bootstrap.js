import * as Font from 'expo-font';

export async function bootstrap() {
    try {
        await Font.loadAsync({
            'open-bold': require('../assets/fonts/OpenSans-Bold.ttf'),
            'open-regular': require('../assets/fonts/OpenSans-Regular.ttf'),
        });
    } catch (e) {
        console.log(e);
    }
}
