import React, { useState } from 'react'
import { View, Text,StyleSheet } from 'react-native'
import { FlatList, ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/Ionicons'

const Profile = ({navigation,route}) =>{
    let TenTaiKhoan = route.params;
    const [data,setData] = useState([
        {taikhoan:TenTaiKhoan,matkhau:"********"}
    ])
    const dangxuat = () =>{
            navigation.navigate('Login')
    }
    return (
        <ScrollView>
            <View style={styles.container}>
                <FlatList 
                    data={data}
                    renderItem={({item}) => {
                        return(
                            <View>
                                <View style={{flexDirection:'row'}}>
                                    <Text style={styles.text1}>Tên Tài Khoản :</Text>
                                    <Text style={styles.text2}>{item.taikhoan}</Text>
                                </View>
                                <View style={{flexDirection:"row"}}>
                                    <Text style={styles.text1}>Mật Khẩu :</Text>
                                    <Text style={styles.text2}>************</Text>
                                </View>
                            </View>
                        )
                    }}/>
            <TouchableOpacity 
                style={{flexDirection:'row'}}
                onPress={dangxuat}>
                <Icon 
                    name="log-out-outline"
                    size={40}
                    style={{paddingTop:20,paddingLeft:20}}/>
                <Text style={{fontSize:32,fontWeight:'bold',paddingTop:20}}>Đăng Xuất</Text>
            </TouchableOpacity>
            </View>
        </ScrollView>
    )}
const styles = StyleSheet.create({
    container: {

    },
    text1: {
        paddingTop:20,
        paddingLeft:20,
        fontSize:24,
        fontWeight:'bold',
        color:'red'
    },
    text2: {
        paddingTop:20,
        paddingLeft:20,
        fontSize:24,
        fontWeight:'bold',
        color:'#3366CC'
    }

})
export default Profile