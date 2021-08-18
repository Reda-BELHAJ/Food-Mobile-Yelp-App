import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ResultDetail from './ResultDetail';
import { withNavigation } from 'react-navigation';

const ResultsList = ({navigation, title, results}) => {
    if (!results.length){
        return null
    }

    return (
        <View style={styles.container}>
            <Text style={styles.titleStyle}>
                { title }
            </Text>
            <FlatList 
                horizontal
                showsHorizontalScrollIndicator={false}
                data={results}
                keyExtractor={(result) => result.id}
                renderItem={({item}) => {
                    return (
                        <TouchableOpacity 
                            onPress={() => navigation.navigate('Results', { id: item.id })}
                        >
                            <ResultDetail result={item}/>
                        </TouchableOpacity>
                    );
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    titleStyle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 15,
        marginBottom: 10
    },
    container: {
        marginBottom: 10
    }
})

export default withNavigation(ResultsList);