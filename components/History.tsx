
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text, FlatList } from 'react-native'
import { historySize } from '../constants';

const writeHistory = async (value: string[]) => {
  try {
    await AsyncStorage.setItem('history', JSON.stringify(value))
  } catch (e) {
    console.log(e);
  }
}

const readHistory = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('history')
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log(e);
  }
}

type propTypes = {
  debouncedSearchTerm: string;
}

export const History: React.FC<propTypes> = ({ debouncedSearchTerm }) => {
  const [history, setHistory] = useState<string[]>([]);
  useEffect(() => {
    try {
      readHistory().then(value => {
        if (value != null) {
          setHistory(value)
        }
      });
    } catch (e) {
      console.log(e);
    }
  }, [])

  useEffect(() => {
    writeHistory(history);
  }, [history])

  useEffect(() => {
    if (debouncedSearchTerm) {
      setHistory(prev => [...prev, debouncedSearchTerm]);
    }
  }, [debouncedSearchTerm])

  return (
    <View style={styles.containerHistory}>
      <Text style={styles.titleHistory}>Search history:</Text>
      <View>
        <FlatList
          data={history.length < historySize ? history : history.slice(-historySize)}
          renderItem={({ item }) => <Text style={{ color: 'white', fontSize: 16 }}>{item}</Text>}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  containerHistory: {
    paddingHorizontal: 20,
    marginVertical: 15
  },
  titleHistory: {
    color: 'white',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    fontSize: 18
  }
});