import React,{useState, useEffect} from 'react';
import {StatusBar, Button, FlatList, StyleSheet, Text, View, Image, TextInput, TouchableOpacity} from 'react-native';

let originalData = [];

const Home = ({navigation}) => {
   const [myData, setMyData] = useState([]);
  
  const myurl = "https://ca2webservice.onrender.com/allitems";
  
  useEffect(()=>{
  fetch(myurl)
  .then((response)=>{
    return response.json();
  })
  .then((myJson)=>{
        setMyData(myJson);
        originalData=myJson;
  })},[]);

  const FilterData = (text) => {
    if(text!='') {
      let myFilteredData = originalData.filter((item) => 
        item.item.toLowerCase().includes(text.toLowerCase()));
      setMyData(myFilteredData);
    }
    else {
      setMyData(originalData);
    }
  }

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
      onPress={()=>{
        navigation.navigate("Edit",{id:item.id, category:item.category, item:item.item, pic:item.item_pic,saved:item.saved_in_g, logged:item.logged_on});
      }}>
    <View style={{flexDirection:"row", alignItems:"center",borderWidth:1}}>
    <View style={{flex:1}}>
        <Text style={{fontWeight:"bold", margin:10}}>{item.item}</Text>
        <Text>{item.category} | {item.saved_in_g} g | {item.logged_on}</Text>
        </View>
    <View style={{flex:1}}><Image source={{uri:item.item_pic}} style={{width:150,height:200, margin:10}}></Image></View>
    </View>
      </TouchableOpacity>
    
    );
  };

  return (
    <View style={{flex:1}}>
      <StatusBar translucent={false}/>
      <Text style={{fontWeight:"bold"}}>Search:</Text>
      <TextInput style={{borderWidth:1, margin:10}} onChangeText={(text)=>{FilterData(text)}}/>
        <Button title='Add Item' onPress={()=>{navigation.navigate("Add")}}/>
      <FlatList style={{margin:10}} data={myData} renderItem={renderItem} />
    </View>
  );
};

export default Home;