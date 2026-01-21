import React,{useState} from 'react';
import { StatusBar, View, Button, Text, TextInput, Alert } from 'react-native';

import React, { useState } from 'react';
import { StatusBar, View, Button, Text, TextInput, Alert, Picker } from 'react-native';

const Add = ({ navigation }) => {
  const [category, setCategory] = useState('reduce');
  const [item, setItem]         = useState('');
  const [itemPic, setItemPic]   = useState('');
  const [saved, setSaved]       = useState(0);
  const [logged, setLogged]     = useState(new Date().toISOString().slice(0,10)); // YYYY-MM-DD

  /* ===== HANDLERS ===== */
  const submit = () => {
    if (!item) { Alert.alert('Item name required'); return; }

    const body = {
      category,
      item,
      item_pic: itemPic || 'https://play-lh.googleusercontent.com/asu4A288X1gkq44pFHdxn6KRuAgB16m_E_V5WmV3qZ-vBl6wUtRLX2wDK5dq4qEzv7hO', 
      saved_in_g: Number(saved),
      logged_on: logged
    };

    fetch('https://ca2webservice.onrender.com/additems', {   // <-- placeholder
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
    .then(res => res.json())
    .then(() => navigation.navigate('Home'))
    .catch(err => Alert.alert('Error', err.message));
  };


  return (
    <View style={{ padding: 16 }}>
      <StatusBar/>

      <Text>Category:</Text>
      <Picker
        selectedValue={category}
        onValueChange={setCategory}
        style={{ borderWidth: 1, borderColor: '#ccc' }}
      >
        <Picker.Item label="Reduce" value="reduce" />
        <Picker.Item label="Reuse"  value="reuse"  />
        <Picker.Item label="Recycle" value="recycle" />
      </Picker>

      <Text>Item name:</Text>
      <TextInput
        style={{ borderWidth: 1, marginBottom: 8 }}
        placeholder="e.g. glass jar"
        value={item}
        onChangeText={setItem}
      />

      <Text>Picture URL (optional):</Text>
      <TextInput
        style={{ borderWidth: 1, marginBottom: 8 }}
        placeholder="https://...."
        value={itemPic}
        onChangeText={setItemPic}
      />

      <Text>Saved grams:</Text>
      <TextInput
        style={{ borderWidth: 1, marginBottom: 8 }}
        placeholder="450"
        value={saved.toString()}
        onChangeText={v => setSaved(v.replace(/[^0-9]/g, ''))}
        keyboardType="numeric"
      />

      <Text>Date:</Text>
      <TextInput
        style={{ borderWidth: 1, marginBottom: 16 }}
        value={logged}
        onChangeText={setLogged}
      />

      <Button title="Submit" onPress={submit} />
    </View>
  );
};

export default Add;