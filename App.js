import React, { useState, useEffect } from 'react';
import { FlatList, StatusBar, Text, TextInput, View, Image, StyleSheet } from 'react-native';
import Feather from '@expo/vector-icons/Feather';

let originalData = [];

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    margin: 10,
    padding: 12,
    borderRadius: 12,
    elevation: 3
  },
  name: {
    flex: 1,
    fontSize: 23,
    marginLeft: 8
  },
  text: {
    fontSize: 16,
    color: '#555',
    marginRight: 12
  },
  img: {
    width: 120,
    height: 120
  },
  search: {
    borderWidth: 1,
    margin: 10,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
    borderColor: '#ddd'
  }
});

const App = () => {
  const [myData, setMyData] = useState([]);

  useEffect(() => {
    fetch('https://ca2webservice.onrender.com/allitems')
      .then(res => res.json())
      .then(json => {
        setMyData(json);
        originalData = json;
      });
  }, []);

  const FilterData = text => {
    const q = text.toLowerCase();
    if (!q) return setMyData(originalData);
    setMyData(
      originalData.filter(i =>
        i.item.toLowerCase().includes(q)
      )
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.name}>{item.item}</Text>
      <Text style={styles.text}>{item.logged_on}</Text>
      <Text style={styles.text}>{item.saved_in_g} g</Text>
      <Image
        source={{ uri: item.item_pic }}
        style={styles.img}
        resizeMode="contain"
      />
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#fafafa' }}>
      <StatusBar />
      <Text style={{ margin: 10, fontSize: 16, fontWeight: '600' }}>Search:</Text>
      <Feather name="bookmark" size={24} color="black" />
      <FlatList
        data={myData}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

export default App;
