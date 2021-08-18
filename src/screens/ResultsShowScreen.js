import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Image } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';
import yelp from '../api/yelp';

const ResultsShowScreen = ({navigation}) => {
    const [result, setResult] = useState(null)
    const id = navigation.getParam('id');

    const getResult = async id => {
        const response = await yelp.get(`${id}`);
        setResult(response.data)
    };
    useEffect(() =>{
        getResult(id)
    }, []);

    if (!result){
        return null
    }

    const region = {
        latitude: result.coordinates.latitude,
        longitude: result.coordinates.longitude,
        latitudeDelta: 0.04,
        longitudeDelta: 0.05,
    };

    return (
        <View>
            <Image
                source={{uri: result.image_url}}
                style={styles.imageHeadStyle}
            />
            <Text style={styles.titleStyle}>
                { result.name } | { result.rating } <AntDesign name="star" size={16} color="#FFD700" />
            </Text>
            
            <View style={styles.containerCateg}>
                <FlatList
                    horizontal
                    data={result.categories}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(categorie) => categorie.alias}
                    renderItem={({item}) => {
                        return (
                            <Text style={styles.categoriesStyle}>
                                { item.title }
                            </Text>
                        );
                    }}
                />
            </View>

            <View style={styles.containerDetail}>
                <Text style={styles.subTitleStyle}>
                    Phone :
                </Text>
                <Text>
                    {result.display_phone}
                </Text>
            </View>

            <View style={styles.containerDetail}>
                <Text style={styles.subTitleStyle}>
                    Location :
                </Text>

                <Text>Country: {result.location.country}</Text>
                <Text>State: {result.location.state}</Text>
                <Text>City: {result.location.city}</Text>

                {result.location.address1 ? <Text>Address 1: {result.location.address1}</Text>: null}
                {result.location.address2 ? <Text>Address 2: {result.location.address2}</Text>: null}
                {result.location.address3 ? <Text>Address 3: {result.location.address3}</Text>: null}
            </View>

            <View style={styles.containerImage}>
                <FlatList 
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={result.photos}
                    keyExtractor={(photo) => photo}
                    renderItem={({item}) => {
                        return (
                            <Image
                                source={{uri: item}}
                                style={styles.imageStyle}
                            />
                        );
                    }}
                />
            </View>

            <View style={styles.containerMap}>
                <Text style={styles.subTitleStyle}>
                    Map :
                </Text>
                <MapView 
                    style={styles.Map} 
                    region={region}
                >
                    <Marker
                        coordinate={{
                            latitude: result.coordinates.latitude,
                            longitude: result.coordinates.longitude
                        }}
                        title={result.name}
                    />
                </MapView>
            </View>
            
        </View>
    );
}

const styles = StyleSheet.create({
    imageHeadStyle: {
        width: '100%',
        height: 120,
        borderRadius: 4,
        marginBottom: 5
    },
    titleStyle: {
        fontSize: 18,
        fontWeight: 'bold',
        alignSelf: 'center',
        marginBottom: 6
    },
    containerCateg: {
        alignItems: 'center',
        justifyContent: 'space-between' 
    },
    categoriesStyle: {
        backgroundColor: '#e8ebe9',
        fontWeight: 'bold',
        padding: 3
    },
    imageStyle: {
        width: 250,
        height: 120,
        borderRadius: 4,
        marginLeft: 15,
    },
    containerDetail: {
        marginHorizontal: 15,
        marginVertical: 6
    },
    subTitleStyle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    containerImage: {
        marginVertical: 15,
    },
    containerMap: {
        marginHorizontal: 15,
        marginVertical: 6
    },
    Map: {
        width: '100%',
        height: 120,
    }
})

export default ResultsShowScreen;