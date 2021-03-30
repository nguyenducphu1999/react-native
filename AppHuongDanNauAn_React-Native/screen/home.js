import React, { useEffect, useState } from 'react';
import {View, Text, StyleSheet, Image, ActivityIndicator} from 'react-native';
import {FlatList, ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import Swiper from 'react-native-swiper';
import {Domain,Port} from '../Constant';
const Home = ({navigation,route}) =>{
  let TenTaiKhoan = route.params;
  const goToViewAll = () => {
    navigation.navigate("ViewAll")
  }
  const goToProfile = () => {
    navigation.push("Profile",TenTaiKhoan);
    navigation.navigate("Profile")
  }
  const goToDetail = ()=>{
    navigation.push("Detail",TenTaiKhoan)
    navigation.push("Detail",item)
  }
  const monanTop5 = Domain+Port+":8090/top5"
  const [isLoading1, setLoading1] = useState(true)
  const [top5, setTop5] = useState([]);
  useEffect(() => {
    fetch(monanTop5)
      .then((response) => response.json())
      .then((json) => setTop5(json.res))
      .catch((error) => alert(error))
      .finally(setLoading1(false));
  }, [])

  const monanVietNam = Domain+Port+":8090/monanVietNam"
  const [isLoading2, setLoading2] = useState(true)
  const [vietnam, setVietNam] = useState([]);
  useEffect(() => {
    fetch(monanVietNam)
      .then((response) => response.json())
      .then((json) => setVietNam(json.data))
      .catch((error) => alert(error))
      .finally(setLoading2(false));
  }, [])
  
  const monanNhatBan = Domain+Port+":8090/monanNhatBan"
  const [isLoading3, setLoading3] = useState(true)
  const [nhatban, setNhatBan] = useState([]);
  useEffect(() => {
    fetch(monanNhatBan)
      .then((response) => response.json())
      .then((json) => setNhatBan(json.data))
      .catch((error) => alert(error))
      .finally(setLoading3(false));
  }, [])

  const monanHanQuoc = Domain+Port+":8090/monanHanQuoc"
  const [isLoading4, setLoading4] = useState(true)
  const [hanquoc, setHanQuoc] = useState([]);
  useEffect(() => {
    fetch(monanHanQuoc)
      .then((response) => response.json())
      .then((json) => setHanQuoc(json.data))
      .catch((error) => alert(error))
      .finally(setLoading4(false));
  }, [])

  const monanTrungQuoc = Domain+Port+":8090/monanTrungQuoc"
  const [isLoading5, setLoading5] = useState(true)
  const [trungquoc, setTrungQuoc] = useState([]);
  useEffect(() => {
    fetch(monanTrungQuoc)
      .then((response) => response.json())
      .then((json) => setTrungQuoc(json.data))
      .catch((error) => alert(error))
      .finally(setLoading5(false));
  }, [])

  return (
    <View style={{flexDirection:'column'}}>
      <ScrollView >
        <View style={styles.titleContainer}>                    
          <Image 
            source ={require('../images/logo.png')}
            style={styles.logo}/>
          <Text style={styles.title}>COOKING TIME</Text>
          <Icon 
            name="logo-octocat"
            size={30}
            style={{position:'absolute',right:40,top:30}}
            onPress={goToProfile}
          />  
          {/* <Text style={{color:"#3366CC",fontSize:18,fontWeight:"bold",fontStyle:"italic"}}>{TenTaiKhoan}</Text> */}       
        </View>
        <View style={styles.sliderContainer}>
          <Swiper autoplay horizontal={false} height={230} activeDotColor="#FF3333">
            <View style={styles.slide}>
              <Image 
                source={require('../images/banner1.jpg')}
                resizeMode='cover'
                style={styles.sliderImage}/>
            </View>
            <View style={styles.slide}>
              <Image 
                source={require('../images/banner2.jpg')}
                resizeMode='cover'
                style={styles.sliderImage}/>
            </View>
            <View style={styles.slide}>
              <Image 
                source={require('../images/banner3.jpg')}
                resizeMode='cover'
                style={styles.sliderImage}/>
            </View>
          </Swiper>
        </View>
        <View style={styles.itemContainer}>
        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            <Text style={{fontSize:22,fontWeight:'bold'}}>5 Món Ăn Yêu Thích Nhất</Text>
        </View>          
        <View>
        {isLoading1 ? <ActivityIndicator size="large" color="#00CC00"/> : (
          <FlatList
            data={top5}
            renderItem={({item}) => {
              return(
                <View style={{paddingVertical:10,paddingLeft:20}}>
                  <TouchableOpacity onPress={() => navigation.push("Detail",item)}>
                    <Image source={{uri: Domain+Port+":8090" + item.AnhDaiDien}} style={{width:120,height:100}}/>
                    <Text style={styles.name}>{item.TenMonAn}</Text>
                    <Text style={styles.made}>{item.QuocGia}</Text>
                    <Icon 
                      name="star"
                      size={20}
                      color="#EEEE00"
                      style={{position:'absolute',top:70,left:150,}} />
                    <Icon 
                      name="star"
                      size={20}
                      color="#EEEE00"
                      style={{position:'absolute',top:70,left:170,}} />
                    <Icon 
                      name="star"
                      size={20}
                      color="#EEEE00"
                      style={{position:'absolute',top:70,left:190,}} />
                    <Icon 
                      name="star"
                      size={20}
                      color="#EEEE00"
                      style={{position:'absolute',top:70,left:210,}} />
                    <Icon 
                      name="star-half"
                      size={20}
                      color="#EEEE00"
                      style={{position:'absolute',top:70,left:230,}} />
                  </TouchableOpacity>
                </View>
              )
            }}/>
            )}
            <TouchableOpacity 
              style={{left:20}}
              onPress={goToViewAll}>
                <Text style={{color:'#FF9900',fontWeight:'bold',fontSize:20}}>Xem Tất Cả</Text>
            </TouchableOpacity> 
        </View>
        </View>
        <View style={styles.itemContainer}>
        <View style={{flexDirection:'row',justifyContent:'space-between',padding:8}}>
          <Text style={{fontSize:22,fontWeight:'bold'}}>Món Ăn Việt Nam</Text>
        </View>      
        <View>
          {isLoading2 ? <ActivityIndicator size="large" color="#00CC00"/> : (
          <FlatList
            horizontal={true}
            data={vietnam}
            renderItem={({item}) => {
              return(
                <View style={{paddingVertical:10,paddingLeft:20}}>
                  <TouchableOpacity onPress={() => navigation.push("Detail",item)}>
                    <Image source={{uri: Domain+Port+":8090" + item.AnhDaiDien}} style={{width:120,height:100}}/>
                    <Text style={styles.name1}>{item.TenMonAn}</Text>                  
                  </TouchableOpacity>
                </View>
              )
            }}/> )}
        </View>
        </View>       
        <ScrollView>
        <View style={styles.itemContainer}>
        <View style={{flexDirection:'row',justifyContent:'space-between',padding:8}}>
          <Text style={{fontSize:22,fontWeight:'bold'}}>Món Ăn Nhật Bản</Text>
        </View>      
        <View>
        {isLoading3 ? <ActivityIndicator size="large" color="#00CC00"/> : (
          <FlatList
            horizontal={true}
            data={nhatban}
            renderItem={({item}) => {
              return(
                <View style={{paddingVertical:10,paddingLeft:20}}>
                  <TouchableOpacity onPress={() => navigation.push("Detail",item)}>
                    <Image source={{uri: Domain+Port+":8090" + item.AnhDaiDien}} style={{width:120,height:100}}/>
                    <Text style={styles.name1}>{item.TenMonAn}</Text>                  
                  </TouchableOpacity>
                </View>
              )
            }}/> )}
        </View>
        </View>
        </ScrollView>
        <ScrollView>
        <View style={styles.itemContainer}>
        <View style={{flexDirection:'row',justifyContent:'space-between',padding:8}}>
          <Text style={{fontSize:22,fontWeight:'bold'}}>Món Ăn Hàn Quốc</Text>
        </View>      
        <View>
        {isLoading4 ? <ActivityIndicator size="large" color="#00CC00"/> : (
          <FlatList
            horizontal={true}
            data={hanquoc}
            renderItem={({item}) => {
              return(
                <View style={{paddingVertical:10,paddingLeft:20}}>
                  <TouchableOpacity onPress={() => navigation.push("Detail",item)}>
                    <Image source={{uri: Domain+Port+":8090" + item.AnhDaiDien}} style={{width:120,height:100}}/>
                    <Text style={styles.name1}>{item.TenMonAn}</Text>                  
                  </TouchableOpacity>
                </View>
              )
            }}/> )}
        </View>
        </View>
        </ScrollView>
        <ScrollView>
        <View style={styles.itemContainer}>
        <View style={{flexDirection:'row',justifyContent:'space-between',padding:8}}>
          <Text style={{fontSize:22,fontWeight:'bold'}}>Món Ăn Trung Quốc</Text>
        </View>      
        <View>
        {isLoading5 ? <ActivityIndicator size="large" color="#00CC00"/> : (
          <FlatList
            horizontal={true}
            data={trungquoc}
            renderItem={({item}) => {
              return(
                <View style={{paddingVertical:10,paddingLeft:20}}>
                  <TouchableOpacity onPress={() => navigation.push("Detail",item)}>
                    <Image source={{uri: Domain+Port+":8090" + item.AnhDaiDien}} style={{width:120,height:100}}/>
                    <Text style={styles.name1}>{item.TenMonAn}</Text>                  
                  </TouchableOpacity>
                </View>
              )
            }}/> )}
        </View>
        </View>
        </ScrollView> 
      </ScrollView>      
    </View>
  )};
const styles = StyleSheet.create({
  titleContainer: {
    flexDirection:'row',
  },
  logo :{
    height:70,
    width:70,
    marginLeft:45,
    marginTop:10,
  },
  title:{
    fontWeight:'bold',
    paddingTop:30,
    paddingLeft:20,
    color:'#FF3333',
    fontSize:20
  },
  sliderContainer: {
    height: 230,
    width:'90%',
    marginTop: 20,
    justifyContent:'center',
    alignSelf:'center',
    borderRadius: 8,
  },
  slide: {
    flex: 1,
    justifyContent:'center',
    backgroundColor:'transparent',
    borderRadius:8,
  },
  sliderImage: {
    height:'100%',
    width:'100%',
    alignSelf:'center',
    borderRadius: 8,
  },
  itemContainer: {
    margin:16,
  },
  name: {
    position:'absolute',
    fontSize:20,
    fontWeight:'bold',
    left:150
  },
  name1: {
    fontWeight:'bold',
    fontSize:12
  },
  made: {
    position:'absolute',
    fontWeight:'bold',
    color:'#AAAAAA',
    left:150,
    top: 40
  },
});
export default Home;
