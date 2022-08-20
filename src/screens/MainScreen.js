import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { Post } from '../components/Post';
import { loadAllPosts } from '../store/reducers/postSlice';

export const MainScreen = ({ navigation }) => {
    const dispatch = useDispatch();

    const onOpen = (post) => {
        navigation.navigate('Post', { post });
    };

    useEffect(() => {
        dispatch(loadAllPosts());
    }, []);

    
    const { allPosts } = useSelector((state) => state.post);

    return (
        <View style={styles.center}>
            <FlatList
                data={allPosts}
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
