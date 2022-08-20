import React, { useLayoutEffect } from 'react';
import {
    Text,
    StyleSheet,
    Image,
    ScrollView,
    Button,
    View,
    Alert,
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch, useSelector } from 'react-redux';
import { AppHeaderIcon } from '../components/AppHeaderIcon';
import { deleteById, toggleBookedAsync } from '../store/reducers/postSlice';
import { THEME } from '../theme';

export const PostScreen = ({ navigation, route }) => {
    const dispatch = useDispatch();
    const { allPosts } = useSelector((state) => state.post);
    let { post } = route.params;

    const handleRemove = () => {
        Alert.alert(
            'Deleteing Item',
            'are you sure you want to delete',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: () => {
                        dispatch(deleteById(post.id));
                        navigation.navigate('Main');
                    },
                },
            ],
            { cancelable: true }
        );
    };

    const selectedPost = allPosts.find((item) => item.id === post.id);
    const iconName =
        selectedPost && selectedPost.booked ? 'ios-star' : 'ios-star-outline';

    const toggleHandler = () => {
        dispatch(toggleBookedAsync(post.id));
    };

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => {
                return (
                    <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
                        <Item
                            title="star"
                            iconName={iconName}
                            onPress={toggleHandler}
                        />
                    </HeaderButtons>
                );
            },
            toggleHandler: toggleHandler,
        });
    }, [navigation, iconName]);

    return (
        <ScrollView>
            <Image source={{ uri: post.img }} style={styles.image} />
            <View style={{ alignItems: 'center' }}>
                <Text style={styles.text}>{post.title}</Text>
            </View>
            <View style={styles.editBtn}>
                <Button
                    onPress={() => {
                        navigation.navigate('EditPost', selectedPost);
                    }}
                    title="Edit"
                    color={THEME.MAIN_COLOR}
                />
            </View>
            <View>
                <Button
                    title="Delete"
                    color={THEME.DANGER_COLOR}
                    onPress={handleRemove}
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 200,
    },
    text: {
        fontFamily: 'open-regular',
        fontSize: 24,
        marginBottom: 20,
    },
    editBtn: {
        marginTop: 10,
        marginBottom: 10,
    },
});
