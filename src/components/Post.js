import {
    View,
    StyleSheet,
    Text,
    ImageBackground,
    TouchableOpacity,
} from 'react-native';

export const Post = ({ post, onOpen }) => {
    return (
        <TouchableOpacity activeOpacity={0.5} onPress={() => onOpen(post)}>
            <View style={styles.post}>
                <ImageBackground
                    style={styles.image}
                    source={{ uri: post.img }}
                >
                    <View style={styles.textWrapper}>
                        <Text style={styles.title}>{post.title}</Text>
                        <Text style={styles.title}>{post.data}</Text>
                    </View>
                </ImageBackground>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    post: {
        margin: 15,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: 200,
    },
    textWrapper: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 5,
        alignItems: 'center',
        width: '100%',
    },
    title: {
        color: '#fff',
        fontFamily: 'open-regular',
    },
});
