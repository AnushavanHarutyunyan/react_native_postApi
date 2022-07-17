import React from 'react';
import { View, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Post } from '../components/Post';
import { data } from '../data';

export const MainScreen = ({ navigation }) => {
    const onOpen = (post) => {
        navigation.navigate('Post', { post });
    };

    return (
        <View style={styles.center}>
            <FlatList
                data={data}
                keyExtractor={(post) => post.id}
                renderItem={({ item }) => <Post post={item} onOpen={onOpen} />}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    center: {
        flex: 1,
    },
    font: {
        fontFamily: 'open-bold',
    },
});
