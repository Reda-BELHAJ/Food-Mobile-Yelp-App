import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

const ResultDetail = ({result}) => {
    return (
        <View style={styles.container}>
            <Image 
                source={{uri: result.image_url}}
                style={styles.imageStyle}
            />

            <Text style={styles.nameStyle}>
                {result.name}
            </Text>

            <Text >
                {result.rating} Stars, {result.review_count} Reviews
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginLeft: 15
    },
    nameStyle: {
        fontWeight: 'bold'
    },
    imageStyle: {
        width: 250,
        height: 120,
        borderRadius: 4,
        marginBottom: 5
    }
})

export default ResultDetail;