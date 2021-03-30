import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Alert,
} from 'react-native';
import bgImge from '../images/background.jpg';
const {width: WIDTH} = Dimensions.get('window');
import Icon from 'react-native-vector-icons/Ionicons';
import { Domain, Port } from '../Constant';
const dangkiURL = Domain+Port+":8090/dangki";
const Register = ({navigation}) => {
  let [username, setUserName] = useState(` `);
  let [password, setPassword] = useState(` `);
  const [data, setData] = useState({
    secureTextEntry:true,
  });
  const dangky = (params) =>{ 
    if(username.length == 0 || password.length == 0){
      Alert.alert('Thông Báo',
        'Hãy nhập đầy đủ tài khoản và mật khẩu');
      return;
    }  
    try{
      fetch(dangkiURL,{
        method:'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json ; charset=utf-8'
        },
        body:JSON.stringify(params)
      })
      .then((response) => response.json())
      .then((responseJson) => { 
        console.log (responseJson)
          if(responseJson == "Thành Công"){
            Alert.alert("Thông Báo","Đăng Ký Thành Công")
          }
          else{
            Alert.alert("Thông Báo","Đăng Ký Thất Bại")
          }
        })
    }catch (error){
      console.log(error)
    }
  }
  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry:!data.secureTextEntry
    });
  };
    return (
        <ImageBackground source={bgImge} style={styles.backgroundContainer}>
        <View style={styles.inputContainer}>
          <Icon
            name='person'
            size={28}
            color='#FF3333'
            style={styles.inputIcon}
          />
          <TextInput
            autoFocus={true}
            placeholder="Nhập Tài Khoản"
            placeholderTextColor={'rgba(255,255,255,2)'}
            underlineColorAndroid="transparent"
            onChangeText={(val) => setUserName(val)}
            style={styles.input}
          />
        </View>
        <View style={styles.inputContainer}>
        <Icon
            name='lock-closed'
            size={28}
            color='#FF3333'
            style={styles.inputIcon}
          />
          <TextInput
            placeholder={'Nhập Mật Khẩu'}
            placeholderTextColor={'rgba(255,255,255,2)'}
            underlineColorAndroid="transparent"
            secureTextEntry={data.secureTextEntry ? true : false}
            onChangeText={(val) => setPassword(val)}
            style={styles.input}
          />
          <TouchableOpacity 
            onPress={updateSecureTextEntry}
            style={{position:'absolute',top:8,right:40}}>
            {data.secureTextEntry ?
            <Icon 
              name="eye"
              size={28}
              color='white' 
              />
              :
              <Icon 
              name="eye-off"
              size={28}
              color='white' 
              />
            }
          </TouchableOpacity>
        </View>
        <TouchableOpacity 
          style={styles.btnLogin} 
          onPress={() => {
            const newUser = {
              TaiKhoan : username,
              MatKhau : password
            };
            dangky(newUser)
          }
          }>
          <Text style={styles.text}>Đăng Ký</Text>
        </TouchableOpacity>
      </ImageBackground>
    );};
const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    width: null,
    height: null,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    marginTop: 10,
  },
  inputIcon: {
    position: 'absolute',
    top: 8,
    left: 37,
  },
  input: {
    width: WIDTH - 55,
    height: 45,
    borderRadius: 45,
    fontSize: 16,
    paddingLeft: 45,
    backgroundColor: 'rgba(0,0,0,0.5)',
    color: 'rgba(255,255,255,2)',
    marginHorizontal: 25,
  },
  btnLogin: {
    width: WIDTH - 55,
    height: 45,
    borderRadius: 45,
    backgroundColor: '#432577',
    justifyContent: 'center',
    marginTop: 20,
  },
  btnEye: {
    position: 'absolute',
    top:8,
    right:37,
  },
  text: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 16,
    textAlign: 'center',
    },
})
export default Register
