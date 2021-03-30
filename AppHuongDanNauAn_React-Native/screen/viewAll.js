import React,{useState,useEffect} from 'react'
import { View, Text,StyleSheet,Image,ActivityIndicator } from 'react-native'
import { FlatList, ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { Domain,Port } from '../Constant'

const ViewAll = ({navigation}) =>{
    const monan = Domain+Port+":8090/monan"
    const [isLoading, setLoading] = useState(true)
    const [data, setData] = useState([]);
    useEffect(() => {
        fetch(monan)
        .then((response) => response.json())
        .then((json) => setData(json.data))
        .catch((error) => alert(error))
        .finally(setLoading(false));
  }, [])
    return (
        <ScrollView>
            {isLoading ? <ActivityIndicator size="large" color="#00CC00"/> : (
            <FlatList 
                data={data}
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
export default ViewAll