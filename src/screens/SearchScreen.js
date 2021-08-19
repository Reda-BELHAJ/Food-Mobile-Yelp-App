import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, ScrollView } from 'react-native';
import SearchBar from '../components/SearchBar';
import useResults from '../hooks.js/useResults';
import ResultsList from '../components/ResultsList';
import { registerForPushNotificationsAsync } from '../scripts/notif';
import * as Notifications from 'expo-notifications';

const SearchScreen = () => {
    const token = registerForPushNotificationsAsync();
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();

    useEffect(() => {
        registerForPushNotificationsAsync().then(token =>
            setExpoPushToken(token)
        );

        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
        });

        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
         
            const {notification: {request: {content: {data: {screen}}}}} = response
            if (screen) {
                props.navigation.navigate(screen)
            }
        });
    
        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, []);

    const [term, setTerm] = useState('')
    const [searchAPI, results, errorMessage] = useResults()

    const filterResultsByPrice = price => {
        return results.filter(result => {
            return result.price === price
        })
    }
    
    return (
        <>
            <SearchBar 
                term={term} 
                onTermChange={setTerm}
                onTermSubmit={() => searchAPI(term)}
            />

            { errorMessage ? <Text>{ errorMessage }</Text> : null}

            <ScrollView>
                <ResultsList
                    results={filterResultsByPrice('$')} 
                    title="Cost Effective $"
                />

                <ResultsList
                    results={filterResultsByPrice('$$')} 
                    title="Bit Pricier $$"
                />

                <ResultsList
                    results={filterResultsByPrice('$$$')} 
                    title="Big Spender $$$"
                />
            </ScrollView>

        </>
    );
}

const styles = StyleSheet.create({})

export default SearchScreen;