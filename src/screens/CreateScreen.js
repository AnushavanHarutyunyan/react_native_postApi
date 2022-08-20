import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Button,
    TextInput,
    TouchableWithoutFeedback,
    Keyboard,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import { PhotoPicker } from '../components/PhotoPicker';
import { addPost } from '../store/reducers/postSlice';

export const CreateScreen = ({ navigation }) => {
    const [inputText, setInputText] = useState('');
    const dispatch = useDispatch();
    const imageRef = useRef();

    const handleAdd = () => {
        const newPost = {
            title: inputText,
            img: imageRef.current,
            data: new Date().toJSON(),
            booked: false,
        };

        dispatch(addPost(newPost));
        setInputText('');
        navigation.navigate('Main');
    };

    const photoPickerHandler = (uri) => {
        imageRef.current = uri;
    };

    return (
        <ScrollView>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={styles.center}>
                    <View style={styles.textInputBlock}>
                        <Text style={styles.text}>Please read the text</Text>
                        <TextInput
                            onChangeText={setInputText}
                            style={styles.textInput}
                            multiline
                            value={inputText}
                        />
                    </View>
                    <PhotoPicker onPick={photoPickerHandler} />
                    <Button
                        title="Add Post"
                        onPress={handleAdd}
                        style={{ color: 'black' }}
                        disabled={!inputText}
                    />
                </View>
            </TouchableWithoutFeedback>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    center: {
        padding: 20,
    },
    img: { width: '100%', height: 200, marginBottom: 10 },
    textInput: {
        width: '100%',
        padding: 10,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 20,
        textAlignVertical: 'top',
    },
    text: { fontFamily: 'open-bold' },
    textInputBlock: {
        alignItems: 'center',
    },
});
