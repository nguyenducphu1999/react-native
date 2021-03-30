import React, { useEffect,useState } from 'react'
import { View, Text,ScrollView,ActivityIndicator,Image,StyleSheet } from 'react-native'
import { TextInput,FlatList,TouchableOpacity } from 'react-native-gesture-handler'
import I18n from 'react-native-i18n'
import { Domain,Port } from '../Constant'
import _ from "lodash"

const Search=({navigation}) => {
    const monan = Domain+Port+":8090/monan"
    let [query, setQuery] = useState('')
    const [isLoading, setLoading] = useState(false)
    const [data, setData] = useState([]);
    const [fullData,setFullData]=useState([])
    useEffect(() => {
        fetch(monan)
        .then((response) => response.json())
        .then((json) =>setData(json.data))
        .catch((error) => alert(error))
        .finally(setLoading(false));
    }, [])
    useEffect(() => {
        fetch(monan)
        .then((response) => response.json())
        .then((json) => setFullData(json.data))
        .catch((error) => alert(error))
        .finally(setLoading(false));
    }, [])
  const renderFooter = () =>{
    if(!isLoading) return null
    return(
        <View style={{paddingVertical:10,paddingLeft:20}}>
            <ActivityIndicator animating size="large" color="#00CC00" />
        </View>
    )}
  const handleSearch = (text) =>{
    // const formattedQuery = text.toLowerCase()
    const data1 = _.filter(fullData,tem =>{
        if(tem.TenMonAn.includes(text)){
            return true
        }
        return false
    })
    setData(data1, setQuery(text))
    }
    return (
        <ScrollView>
        <View>
            <TextInput 
                autoFocus={true}
                placeholder="Nhập món ăn hoặc công thức muốn tìm"
                placeholderTextColor="#555555"
                onChangeText={handleSearch}
                keyboardType="default"
                style={{borderBottomWidth:2,fontSize:10,padding:10}}/>  
            <ScrollView>
            {isLoading ? <ActivityIndicator size="large" color="#00CC00"/> : (
            <FlatList 
                data={data}
                ListFooterComponent={renderFooter}
                renderItem={({item}) => {
                    return(
                        <View style={{paddingVertical:10,paddingLeft:20}}>
                            <TouchableOpacity onPress={() => navigation.push("Detail",item)}>
                            <Image source={{uri: Domain+Port+":8090" + item.AnhDaiDien}} style={{width:120,height:100}}/>
                            <Text style={styles.name}>{item.TenMonAn}</Text>
                            <Text style={styles.made}>{item.QuocGia}</Text>
                            </TouchableOpacity>
                        </View>                        
                    )
                }}/>)}
            </ScrollView>
        </View>
        </ScrollView>
    )}
    const styles = StyleSheet.create({
        name: {
            position:'absolute',
            fontSize:20,
            fontWeight:'bold',
            left:150,
            top:20
          },
          made: {
            position:'absolute',
            fontWeight:'bold',
            color:'#AAAAAA',
            left:150,
            top: 70,
            fontSize:18
          },
    })
export default Search
