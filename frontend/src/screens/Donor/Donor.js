import React, { useEffect, useState } from 'react'
import { FlatList, Keyboard, Text, TextInput, TouchableOpacity, View, Image } from 'react-native'
import styles from './styles';
import { firebase } from '../../firebase/config'
import DropDownPicker from 'react-native-dropdown-picker';
import Back from '../../../assets/back.png';
import Next from '../../../assets/next.png';
import { useNavigation } from '@react-navigation/native';
import {LineChart, PieChart} from 'react-native-chart-kit';
export default function Donor(props) {

    const [entityText, setEntityText] = useState('')
    const [entities, setEntities] = useState([])
    const [option, setOption] = useState('');
    const [token, setTokens] = useState([
       "5","10","20","50","100","200","500","1000"
      ]);
      const [tokenValue, setTokenValue] = useState('');
      const [manualTokenValue, setManualTokenValue] = useState('');
   
 
    const entityRef = firebase.firestore().collection('entities')
    const userID = props.extraData.id
    const navigation = useNavigation();
    const data = [
        {
          name: "Household",
          tokens: 21500000,
          color: "rgba(131, 167, 234, 1)",
          legendFontColor: "#7F7F7F",
          legendFontSize: 15
        },
        {
          name: "Baby",
          tokens: 2800000,
          color: "#F00",
          legendFontColor: "#7F7F7F",
          legendFontSize: 15
        },
        {
          name: "Food",
          tokens: 527612,
          color: "red",
          legendFontColor: "#7F7F7F",
          legendFontSize: 15
        },
       
      ];
    useEffect(() => {
        entityRef
            .where("authorID", "==", userID)
            .orderBy('createdAt', 'desc')
            .onSnapshot(
                querySnapshot => {
                    const newEntities = []
                    querySnapshot.forEach(doc => {
                        const entity = doc.data()
                        entity.id = doc.id
                        newEntities.push(entity)
                    });
                    setEntities(newEntities)
                },
                error => {
                    console.log(error)
                }
            )
    }, [])

    const onAddButtonPress = () => {
        if (entityText && entityText.length > 0) {
            const timestamp = firebase.firestore.FieldValue.serverTimestamp();
            const data = {
                text: entityText,
                authorID: userID,
                createdAt: timestamp,
            };
            entityRef
                .add(data)
                .then(_doc => {
                    setEntityText('')
                    Keyboard.dismiss()
                })
                .catch((error) => {
                    alert(error)
                });
        }
    }

    const renderEntity = ({item, index}) => {
        return (
            <View style={styles.entityContainer}>
                <Text style={styles.entityText}>
                    {index}. {item.text}
                </Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Buy Tokens</Text>
            {/* <View style={styles.formContainer}>
                <TextInput
                    style={styles.input}
                    placeholder='Search'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setEntityText(text)}
                    value={entityText}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TouchableOpacity style={styles.button} onPress={onAddButtonPress}>
                    <Text style={styles.buttonText}>Search</Text>
                </TouchableOpacity>
                
            </View> */}
            <TouchableOpacity style={styles.back} ><Image source={Back} style={styles.back}></Image></TouchableOpacity>
            <Text style={styles.what} onPress={()=>navigation.navigate('DonorHome')}>Token Store</Text>
            
         
           
           
            <View style={{height:70, position:'absolute',zIndex:4, top:'42.5%'}}>
            {/* <FlatList
                horizontal={true} 
                showsHorizontalScrollIndicator={false} 
                data={token}
                renderItem={ ({ item, index }) => (
                // <Image source={item} // Use item to set the image source
                //     key={index} // Important to set a key for list items
                //     style={{
                //     width:300,
                //     height:300,
                //     borderWidth:2,
                //     borderColor:'#34F4F9',
                //     resizeMode:'contain',
                //     margin:8,
                //     borderRadius:20,
                //     }}
                // />
                <Text style={{color:'#FFF', backgroundColor:'#1a7a7d', height:50, textAlignVertical:'center', paddingHorizontal:20, marginHorizontal:5, borderRadius:10}} onPress={()=>setTokenValue(item)}>{item}</Text>
                )}
            /> */}
            </View>
            <Text style={styles.manual}>Your donations</Text>
            <Text style={styles.subhead}>Token donations by Category</Text>
            <Text style={{fontSize:30, color:'#34F4F9'}}>{tokenValue}</Text>
            
            {/* { entities && (
                <View style={styles.listContainer}>
                    <FlatList
                        data={entities}
                        renderItem={renderEntity}
                        keyExtractor={(item) => item.id}
                        removeClippedSubviews={true}
                    />
                </View>
            )} */}
            {/* <PieChart
            data={data}
            width={300}
            height={300}
            accessor="token"
           
            
            chartConfig={{
            backgroundColor: '#e26a00',
            backgroundGradientFrom: '#D9D9D9',
            backgroundGradientTo: '#FFF',
            decimalPlaces: 0, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
      
           }}
           
            /> */}
             

                <View style={{backgroundColor:'#153745', width:'100%', height:50, borderTopLeftRadius:10, borderTopRightRadius:10, position:'absolute', bottom:0, flexDirection:'row', alignContent:'center', paddingHorizontal:'12%', paddingTop:'2%'}}>
                    <Image source={require('../../../assets/home.png')} style={{marginHorizontal:'12%'}}></Image>
                    <Image source={require('../../../assets/noti.png')} style={{marginHorizontal:'12%'}}></Image>
                    <Image source={require('../../../assets/settings.png')} style={{marginHorizontal:'12%'}}></Image>
                </View>
            
        </View>
    )
}
