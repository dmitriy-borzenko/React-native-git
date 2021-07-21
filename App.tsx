
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, TextInput, FlatList, ActivityIndicator, } from 'react-native';
import { History } from './components/History';
import { Item } from './components/Item';
import { useDebounce } from './customHooks/useDebounce';
import { useFetch } from './customHooks/useFetch';

export default function App() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const { results, isError, isLoading } = useFetch(debouncedSearchTerm);

  return (
    <SafeAreaView style={styles.container} >
      <Text style={styles.title}>Search repository</Text>
      <TextInput
        textAlign={'center'}
        style={styles.input}
        placeholder="Enter repository name..."
        onChangeText={setSearchTerm}
        value={searchTerm}
      />
      <History debouncedSearchTerm={debouncedSearchTerm} />
      {(() => {
        if (isLoading) {
          return <ActivityIndicator size="large" color="#00ff00" />
        };
        if (isError) {
          return <View style={styles.title}>...Error</View>
        };

        if (results) {
          return <View style={styles.list}>
            <FlatList
              contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
              data={results}
              renderItem={({ item }) =>
                (<Item name={item.name} image={item.owner.avatar_url} login={item.owner.login} />)}
              keyExtractor={item => item.id.toString()}
            />
          </View>
        }
        return null;
      })()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    color: 'white',
  },
  title: {
    marginTop: 30,
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'

  },
  input: {
    height: 40,
    width: '70%',
    borderWidth: 1,
    borderColor: 'white',
    color: 'black',
    borderRadius: 20,
    marginVertical: 15,
    backgroundColor: 'white',
    alignSelf: 'center',
    fontSize: 16
  },
  image: {
    height: 60,
    width: 60
  },
  list: {
    alignContent: 'center'
  }
});

