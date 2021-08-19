import React, { useState } from 'react';
import { StyleSheet, Text, ScrollView } from 'react-native';
import SearchBar from '../components/SearchBar';
import useResults from '../hooks.js/useResults';
import ResultsList from '../components/ResultsList';
import { registerForPushNotificationsAsync } from '../hooks.js/notif';

const SearchScreen = () => {
    registerForPushNotificationsAsync()

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