import React from 'react'
import { View, StyleSheet, Image, Text, ScrollView } from 'react-native'

type propTypes = {
  image: string;
  name: string;
  login: string;
}

export const Item: React.FC<propTypes> = ({ image, name, login }) => {
  return (
    <View style={styles.container} >
      <Image
        style={styles.image}
        source={{
          uri: image,
        }}
      />
      <View style={styles.info}>

        <Text style={styles.text}>
          Name repository: {name}
        </Text>
        <Text style={styles.text}>
          Login: {login}
        </Text>
      </View>



    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingVertical: 5,
    paddingHorizontal: 5,
    flexDirection: 'row',
    borderRadius: 30,
    marginVertical: 20,
    marginHorizontal: 20
  },
  image: {
    width: 100,
    height: 100,
    marginHorizontal: 20,
  },
  text: {
    color: 'black',
    fontWeight: 'bold'
  },
  info: {
    flexDirection: 'column',
    justifyContent: 'center',
    color: 'black',
  }
});