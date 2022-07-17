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
import { AppHeaderIcon } from '../components/AppHeaderIcon';
import { THEME } from '../theme';

export const PostScreen = ({ navigation, route }) => {
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
                    onPress: () => console.log('OK Pressed'),
                },
            ],
            { cancelable: true }
        );
    };

    const { post } = route.params;
    const iconName = post.booked ? 'ios-star' : 'ios-star-outline';

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
                    <Item
                        title="star"
                        iconName={iconName}
                        onPress={() => alert('search')}
                    />
                </HeaderButtons>
            ),
        });
    }, [navigation]);

    return (
        <ScrollView>
            <Image source={{ uri: post.img }} style={styles.image} />
            <View>
                <Text style={styles.text}>{post.title}</Text>
            </View>
            <Button
                title="Delete"
                color={THEME.DANGER_COLOR}
                onPress={handleRemove}
            />
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
    },
});
