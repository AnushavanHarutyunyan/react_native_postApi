import React from 'react';
import { View, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { Post } from '../components/Post';

export const BookedScreen = ({ navigation }) => {
    const onOpen = (post) => {
        navigation.navigate('Post', { post });
    };
    const bookedPosts = useSelector((state) => state.post.bookedPosts);

    return (
        <View style={styles.center}>
            <FlatList
                data={bookedPosts}
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
