import React, { useEffect, useState } from 'react'
import { FlatList, Keyboard, Text, TextInput, TouchableOpacity, View, Image } from 'react-native'
import styles from './styles';
import { firebase } from '../../firebase/config'
import DropDownPicker from 'react-native-dropdown-picker';
import Back from '../../../assets/back.png';
import Next from '../../../assets/next.png';
import { useNavigation } from '@react-navigation/native';
import * as Print from "expo-print";
import * as MediaLibrary from "expo-media-library";
import * as Sharing from "expo-sharing";
import PDF from 'rn-pdf-generator';



export default function DonorHome(props) {

    const [entityText, setEntityText] = useState('')
    const [entities, setEntities] = useState([])
    const [option, setOption] = useState('');
    const [token, setTokens] = useState([
       "5","10","20","50","100","200","500","1000"
      ]);
      const [tokenValue, setTokenValue] = useState('');
      const [cValue, setCValue] = useState('');
      const [ccValue, setccValue] = useState('');
      const [manualTokenValue, setManualTokenValue] = useState('');
      const [generated, setGenerated] = useState(false);
   
      const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Pdf Content</title>
          <style>
              body {
                  font-size: 16px;
                  color: rgb(255, 196, 0);
              }
  
              h1 {
                  text-align: center;
              }
          </style>
      </head>
      <body>
          <h1>Donor ID:1, Token: 100, Category: Household</h1>
      </body>
      </html>
  `;
    const entityRef = firebase.firestore().collection('entities')
    const userID = props.extraData.id
    const navigation = useNavigation();
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
    const _submitToken = (type,token,cc,cvv) => {
        console.log(type,token, cc, cvv);
        fetch('http://hackathons.azurewebsites.net/api/makedonation', {
        method: "POST",
        body: JSON.stringify({"category":type,"tokens":token,"cc":cc,"cvv":cvv, "donorid":"1"}),
        })
        .then(response => response.json()) 
        .then(data => console.log(data));
        setGenerated(true)
    }
   
 const _generatePDF = ()=>{
    PDF.fromHTML(`<P>HELLO WORLD</P>`, `http://www.google.com`)
    .then(  data => console.log(data)) // WFuIGlzIGRpc3Rpbm....
    .catch( err  =>  console.log('error->', err) )
 }
   
// const createPDF = async (htmlContent) => {
//     try {
//         const { uri } = await Print.printToFileAsync({ htmlContent });
//         console.log("Here")
//         return uri;
//     } catch (err) {
//         console.error(err);
//     }
// };
const createAndSavePDF = async (htmlContent) => {
    try {
      const { uri } = await Print.printToFileAsync({ htmlContent });
      if (Platform.OS === "ios") {
        await Sharing.shareAsync(uri);
      } else {
        const permission = await MediaLibrary.requestPermissionsAsync();
  
        if (permission.granted) {
          await MediaLibrary.createAssetAsync(uri);
        }
      }
  
    } catch (error) {
      console.error(error);
    }
  };
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
            <Text style={styles.heading}>Token Store</Text>
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
            <TouchableOpacity style={styles.back} onPress={()=>'#'}><Image source={Back} style={styles.back}></Image></TouchableOpacity>
            <Text style={styles.what}>Choose a token category</Text>
            <DropDownPicker
                items={[
                    {label: 'Food Token', value: 'food'},
                    {label: 'Household Token', value: 'house'},
                    {label: 'Baby Essentials Token', value: 'baby'},
                ]}
                placeholder={"Select a category"}
                defaultIndex={0}
                containerStyle={{height: 70, width:'40%', marginTop:'5%'}}
                onChangeItem={item =>{console.log(item.label, item.value);setOption(item.value);}}
            />
         
            <Text style={styles.what}>Quantity of token</Text>
            <Text style={{fontSize:30, color:'#34F4F9'}}>{tokenValue}</Text>
            
            <View style={{height:70, position:'absolute',zIndex:4, top:'42.5%'}}>
            <FlatList
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
            />
            </View>
            <Text style={styles.manual}>Or you may manually input value</Text>
            <TextInput type="text" placeholder={"Token Value"} style={{color:'#FFF', fontSize:20, backgroundColor:'#1a7a7d', padding:'2.5%', textAlign:'center', borderRadius:10, marginTop:'5%'}} name="tokenValue" onChangeText={(x) => {setTokenValue(x); console.log(x)}}></TextInput>
            <Text style={{fontSize:15,marginTop:'2%', color:'#FFF'}}>Payment Info</Text>
            <TextInput type="text" placeholder={"Credit Card No."} style={{color:'#FFF', fontSize:20,  padding:'2.5%', textAlign:'center', borderRadius:10, marginTop:'5%', borderBottomColor:'#FFF'}} name="ccValue" onChangeText={(x) => {setccValue(x); console.log(x)}}></TextInput>
            <TextInput type="text" placeholder={"CVV"} style={{color:'#FFF', fontSize:20, textAlign:'center', borderRadius:10, marginTop:'2%', borderBottomColor:'#FFF'}} name="cValue" onChangeText={(x) => {setCValue(x); console.log(x)}}></TextInput>

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
            {generated && 
            <View style={{position:'absolute', height:'80%', width:'90%', backgroundColor:'#FFF', zIndex:10, borderRadius:20, marginTop:'15%'}}>
                <Text style={{fontSize:30, alignSelf:'center', marginTop:'5%', marginBottom:'15%'}}>Invoice</Text>
                <Text style={{fontSize:20, marginLeft:'5%'}}>Type: house</Text>
                <Text style={{fontSize:20, marginLeft:'5%'}}>Tokens: 50</Text>
                <Text style={{fontSize:20, marginLeft:'5%'}}>DonorID:1</Text>
                <Text style={{fontSize:30, backgroundColor:'#1a7a7d', width:'70%', padding:'2%', textAlign:'center', alignSelf:'center', marginTop:'95%', borderRadius:20}}>Done</Text>
                </View>}
             <TouchableOpacity style={styles.button} onPress={onAddButtonPress}>
                    <Text style={styles.buttonText} onPress={()=>{_submitToken(option,parseFloat(tokenValue),ccValue,cValue) }}>Confirm</Text>
                </TouchableOpacity>

                <View style={{backgroundColor:'#153745', width:'100%', height:50, borderTopLeftRadius:10, borderTopRightRadius:10, position:'absolute', bottom:0, flexDirection:'row', alignContent:'center', paddingHorizontal:'12%', paddingTop:'2%'}}>
                    <Image source={require('../../../assets/home.png')} style={{marginHorizontal:'12%'}}></Image>
                    <Image source={require('../../../assets/noti.png')} style={{marginHorizontal:'12%'}}></Image>
                    <Image source={require('../../../assets/settings.png')} style={{marginHorizontal:'12%'}}></Image>
                </View>
            
        </View>
    )
}
