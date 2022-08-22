import React, { useState } from 'react';
import { Button, Image, StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { PhotoPicker } from '../components/PhotoPicker';
import { editPost } from '../store/reducers/postSlice';

export const EditModal = ({ route: { params }, navigation }) => {
    const allPosts = useSelector((state) => state.post.allPosts);
    const editedPost = allPosts.find((post) => post.id === params.id);

    const [editedText, setChange] = useState(editedPost.title);
    const [image, setImage] = useState(editedPost.img);

    const dispatch = useDispatch();
    const handleChangeImg = (uri) => {
        setImage(uri);
    };
    const handleSaveChange = () => {
        const changeePost = {
            ...editedPost,
            img: image,
            title: editedText,
        };
        dispatch(editPost(changeePost));
        navigation.navigate('Main');
    };

    return (
        <View style={styles.wrapper}>
            <View>
                <TextInput
                    value={editedText}
                    onChangeText={setChange}
                    style={[styles.card, styles.shadowProp, styles.textInput]}
                />
            </View>
            {image && <Image source={{ uri: image }} style={styles.img} />}
            <PhotoPicker title="Change Image" onChangeImg={handleChangeImg} />
            <Button title="Save change" onPress={handleSaveChange} />
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        margin: 20,
    },
    card: {
        fontSize: 35,
        textAlign: 'center',
        backgroundColor: 'white',
        paddingVertical: 12,
        paddingHorizontal: 25,
        marginVertical: 18,
    },
    shadowProp: {
        elevation: 20,
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    img: { width: '100%', height: 200, marginBottom: 10 },
});
