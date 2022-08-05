import React, { useState } from 'react';
import {
    Alert,
    Button,
    Image,
    StyleSheet,
    View,
    PermissionsAndroid,
} from 'react-native';
import { THEME } from '../theme';
import * as ImagePicker from 'expo-image-picker';

export const PhotoPicker = ({ onPick }) => {
    const [image, setImage] = useState();

    const handleAddPhoto = async () => {
        const status = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
                title: 'Cool Photo App Camera Permission',
                message:
                    'Cool Photo App needs access to your camera ' +
                    'so you can take awesome pictures.',
                buttonNeutral: 'Ask Me Later',
                buttonNegative: 'Cancel',
                buttonPositive: 'OK',
            }
        );
        if (status !== PermissionsAndroid.RESULTS.GRANTED) {
            Alert.alert('Please give your the permision');
            return;
        }
        const img = await ImagePicker.launchCameraAsync({
            quality: 0.7,
            aspect:[4,3],
            allowsEditing: false,
            
        });
        setImage(img.uri);
        onPick(img.uri);
    };

    return (
        <View style={styles.wrapper}>
            <Button
                title="Create Photo"
                color={THEME.MAIN_COLOR}
                onPress={handleAddPhoto}
            />

            {image && <Image source={{ uri: image }} style={styles.img} />}
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: { marginBottom: 20 },
    img: {
        width: '100%',
        height: 200,
        marginTop: 10,
    },
});
