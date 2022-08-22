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

export const PhotoPicker = ({
    onPick,
    title = 'Create Photo',
    onChangeImg = null,
}) => {
    const [image, setImage] = useState();

    const CreateAddPhoto = async () => {
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
            aspect: [4, 3],
            allowsEditing: false,
        });

        if (onChangeImg) {
            onChangeImg(img.uri);
            setImage(null);
        } else {
            setImage(img.uri);
            onPick(img.uri);
        }
    };

    return (
        <View style={styles.wrapper}>
            {image && <Image source={{ uri: image }} style={styles.img} />}
            <Button
                title={title}
                color={THEME.MAIN_COLOR}
                onPress={CreateAddPhoto}
            />
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
