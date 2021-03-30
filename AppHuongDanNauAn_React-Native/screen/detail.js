import React,{useState,useEffect} from 'react'
import { View, Text, StyleSheet,Image,ScrollView,ActivityIndicator, Alert } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { FlatList, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import {Domain,Port} from '../Constant';

const Detail = ({route}) =>{
    console.warn(route.params)
    let item = route.params;
    let TenTaiKhoan = route.params;
    const binhluan = Domain+Port+":8090/binhluan/"+item.MaMonAn
    const congthuc = Domain+Port+":8090/monan/congthuc/"+item.MaMonAn;
    const hienthibinhluan = Domain+Port+":8090/hienthi/"+item.MaMonAn;
    const [comment,setComment] = useState('')
    const [grade,setGrade] = useState('')
    const [isLoading, setLoading] = useState(true)
    const [data, setData] = useState([]);
    useEffect(() => {
      fetch(congthuc)
        .then((response) => response.json())
        .then((json) => setData(json))
        .catch((error) => alert(error))
        .finally(setLoading(false));
    }, []); 
    const [isLoading1, setLoading1] = useState(true)
    const [data1, setData1] = useState([]);
    useEffect(() =>{
        fetch(hienthibinhluan)
            .then((response) => response.json())
            .then((json) => setData1(json.data))
            .catch((error) => alert(error))
            .finally(setLoading1(false));
    },[]);
    const vietbinhluan = (params) =>{ 
        if(comment.length == 0 || grade.length == 0){
            Alert.alert("Thông Báo","Hãy Ghi Đầy Đủ Bình Luận Và Điểm Đánh Giá")
        }
        try{
          fetch(binhluan,{
            method:'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json ; charset=utf-8'
            },
            body:JSON.stringify(params)
          })
          .then((response) => response.json())
          .then((responseJson) => { 
            if(responseJson == "Thành Công"){
              Alert.alert("Thông Báo","Bình Luận Thành Công")
            }
            else{
              Alert.alert("Thông Báo","Bình Luận Thất Bại")
            }
            console.log (responseJson)
            })
        }catch (error){
          console.log(error)
        }
      }
    return (
        <ScrollView>
            <View style={{backgroundColor:'white',flex:1}}>
                <Image 
                    source={{uri: Domain+Port+":8090" + item.AnhDaiDien}}
                    style={styles.image}
                />
                <Text style={styles.NameFood}>{item.TenMonAn}</Text>           
               <Text style={styles.title}>Nguyên Liệu Thực Hiện</Text> 
               {isLoading ? <ActivityIndicator size="large" color="#00CC00"/> : (
               <FlatList 
                data={item}
                renderItem={({item}) => {
                    return(
                        <View style={styles.nguyenlieu}>
                            <View style={{margin:20,width:200}}>
                                <Text style={styles.ten}>{item.TenNguyenLieu}</Text>
                            </View>
                            <View style={{margin:20}}>
                                <Text style={styles.soluong}>{item.SoLuong}</Text>
                                <Text style={styles.soluong}>{item.ChiTiet}</Text>
                            </View>                           
                        </View>
                    )
                }}
                /> )}
                <FlatList 
                data={data.NguyenLieu}
                renderItem={({item}) => {
                    return(
                        <View style={styles.nguyenlieu}>
                            <View style={{margin:20,width:120}}>
                                <Text style={styles.ten}>{item.TenNguyenLieu}</Text>
                            </View>
                            <View style={{margin:20}}>
                                <Text style={styles.soluong}>{item.SoLuongNguyenLieu}</Text>                
                            </View>
                            <View style={{marginLeft:0,marginBottom:20,marginTop:20}}>
                                <Text style={styles.soluong}>{item.ChiTietNguyenLieu}</Text>
                            </View>
                            
                        </View>
                    )
                }}
                />                 
                <Text style={styles.title}>Hướng Dẫn Thực Hiện</Text>
                <FlatList 
                    data={data.CongThuc}
                    renderItem={({item}) => {
                        return(
                            <View>
                                <Text style={{fontSize:17,fontWeight:'bold',fontStyle:'italic',padding:20}}>{item.ChiTiet}</Text>
                            </View>
                        )
                    }}/>
                <Text style={styles.title}>Đánh Giá, Bình Luận</Text>
                {isLoading1 ? <ActivityIndicator size="large" color="#00CC00"/> : (
                <FlatList 
                    data={data1}
                    refreshing={isLoading1}
                    onRefresh={data1}
                    renderItem={({item}) => {
                        return(
                            <View style={{margin:10}}>                     
                                <Text style={{fontSize:15,color:'#3366CC',fontStyle:'italic',fontWeight:'bold',paddingRight:10}}>{item.TaiKhoan}</Text>                           
                                <Text style={{fontSize:14}}>{item.NoiDung}</Text>
                                <Text style={{fontSize:12,color:"red"}}>{item.Diem}</Text>                             
                            </View>
                        )
                    }} /> )}
                <View style={{flexDirection:"row"}}>
                    <TextInput 
                        placeholder="Viết bình luận của bạn"
                        placeholderTextColor="black"
                        onChangeText={(val) => setComment(val)}
                        style={{borderTopWidth:1,padding:10,width:250,borderRightWidth:1}}
                    />
                    <TextInput 
                        placeholder="Điểm đánh giá ?/10"
                        placeholderTextColor="black"
                        onChangeText={(val) => setGrade(val)}
                        style={{borderTopWidth:1,padding:10}}
                    />
                </View>                
                <TouchableOpacity 
                    style={styles.btnBinhLuan}
                    onPress={() => {
                        const newComment={
                            NoiDung : comment,
                            TaiKhoan : TenTaiKhoan.TaiKhoan,
                            Diem : grade
                        };
                        vietbinhluan(newComment)
                    }}>
                        <Icon 
                            name="brush"
                            size={20}
                            color="#6699CC"
                            style={{position:"absolute",left:100}}/>
                    <Text style={{fontSize:20,fontWeight:"bold",color:"#6699CC"}}>Gửi Bình Luận</Text>
                </TouchableOpacity>           
            </View>
        </ScrollView>        
    )};
const styles = StyleSheet.create({
    image: {
        height: 300,
        width:'100%',  
    },
    NameFood: {
        fontSize:24,
        fontWeight:'bold',
        margin:10,
        fontStyle:'italic'
    },
    title:{
        fontSize:24,
        fontWeight:'bold',
        padding:10,
        color:'red'
    },
    nguyenlieu:{
        flexDirection:"row",
        alignItems:'center'
    },
    ten:{
        fontSize:20,
        fontWeight:'bold',
    },
    soluong:{
        fontSize:20,
        fontWeight:'bold',
        fontStyle:'italic'
    },
    cachlam:{
        fontSize:17,
        fontWeight:'bold',
        fontStyle:'italic',
        padding:10
    },
    danhgia: {
        margin:10,
    },
    btnBinhLuan:{
        borderTopLeftRadius:40,
        borderTopRightRadius:40,
        borderTopWidth:1,
        backgroundColor:"#432577",
        justifyContent:"center",
        alignItems:"center",
        height:50,
        borderWidth:5,
        borderColor:'#6699CC'
    }
})

export default Detail;