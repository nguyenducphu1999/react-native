import React from 'react'
import { View, Text,StyleSheet, ImageBackground,Dimensions,Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
const {width: WIDTH} = Dimensions.get('window');

const User = ({navigation}) =>{
    const goToLogin = () => {
        navigation.navigate("Login")
    }
    const goToRegister =() => {
        navigation.navigate("Register")
    }  
    return (
        <ImageBackground 
            source={require("../images/background1.jpg")}
            style={styles.backgroundContainer}>
            <View style={styles.background}>
                <Image 
                    source={require("../images/logoChef.jpg")}
                    style={styles.logo}/>
                <Text style={styles.text}>Cooking Time</Text>
                <Text style={{paddingTop:10,paddingLeft:30,fontSize:20,fontWeight:'bold'}}>Cooking Time là ứng dụng điện thoại bổ ích cho những ai có niềm đam mê với ẩm thực và muốn nấu những món ăn ngon cho bản thân hoặc gia đình</Text>
                <TouchableOpacity
                    style={styles.btnLogin}
                    onPress={goToRegister}
                   >
                    <Text style={{color: 'white',fontSize: 18,textAlign: 'center',fontWeight:'bold'}}>Đăng Ký Tài Khoản</Text>
                </TouchableOpacity>
                <Text style={{marginTop:10,fontStyle:'italic'}}>Nếu bạn đã đăng kí tài khoản rồi thì</Text>
                <TouchableOpacity onPress={goToLogin}>
                    <Text style={{fontWeight:'bold',marginBottom:20}}>Đăng Nhập</Text>
                </TouchableOpacity>              
            </View>
        </ImageBackground>
    )}

const styles = StyleSheet.create({
    backgroundContainer: {
        flex: 1,
        width: WIDTH,
        height: null,
        justifyContent: 'center',
        alignItems: 'center',
      },
    background: {
        alignItems:'center',
        backgroundColor:"rgba(255,255,255,0.7)",
        margin:30,
    },
    logo: {
        position:'absolute',
        width:50,
        height:50,
        marginTop:10,
    },
    text:{
        color: '#FF3333',
        fontSize: 25,
        textAlign: 'center',
        fontWeight:'bold',
        paddingTop:60
    },
    btnLogin: {
        width: WIDTH - 200,
        height: 45,
        borderRadius: 45,
        backgroundColor: '#432577',
        justifyContent: 'center',
        marginTop: 20,
      },
})
export default User
