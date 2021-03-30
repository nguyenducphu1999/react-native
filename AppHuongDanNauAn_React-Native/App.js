import React from 'react';
import 'react-native-gesture-handler';
import { createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './screen/home';
import User from './screen/user';
import Login from './screen/login';
import Register from './screen/register'
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons'
import Detail from './screen/detail';
import Forget from './screen/forget';
import Search from './screen/searchItem';
import Profile from './screen/profile';
import ViewAll from './screen/viewAll';

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const UserStack = createStackNavigator();
const SearchStack = createStackNavigator();

const App = () => {
  return(
    <NavigationContainer>
      <Tab.Navigator 
        tabBarOptions={{
        activeTintColor: 'white',
        inactiveTintColor: '#222222',
        showLabel:false,
        style:{
            backgroundColor:"#FF3333",
      }
    }}>
      <Tab.Screen
        name="Trang Chủ"
        component={HomeStackScreen}
        options={{
          tabBarIcon:({color}) => (
            <Icon name="home" size={20} color={color} />
          ),
        }}/>
          <Tab.Screen
            name="Tìm Kiếm"
            component={SearchStackScreen}
            options={{
              tabBarIcon:({color}) => (
                <Icon name="search" size={20} color={color} />
              ),
            }}/>
          <Tab.Screen 
            name="Tài Khoản "
            component={UserStackScreen}
            options={{
              tabBarIcon:({color}) => (
                <Icon name="person" size={20} color={color} />
              ),
            }} />
    </Tab.Navigator>
    </NavigationContainer>
  ) 
}

const HomeStackScreen = ({navigation}) => {
  return(
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={Home} 
        options={{
          title: 'Trang Chủ',
          headerStyle: {
            backgroundColor: "#FF3333"
          },
          headerTintColor:'#fff',
          headerTitleStyle: {
            fontWeight:'bold'
          },
          headerTitleAlign:'center'
        }}/>
       <HomeStack.Screen
      name="Login"
      component={Login}
      options={{
        title: 'Đăng Nhập',
        headerStyle: {
          backgroundColor: "#FF3333"
        },
        headerTintColor:'#fff',
        headerTitleStyle: {
          fontWeight:'bold'
        },
        headerTitleAlign:'center'
      }}
    />
      <HomeStack.Screen
        name="Detail"
        component={Detail} 
        options={{
          title: 'Công Thức',
          headerStyle: {
            backgroundColor: "#FF3333"
          },
          headerTintColor:'#fff',
          headerTitleStyle: {
            fontWeight:'bold'
          },
          headerTitleAlign:'center'
        }}/>
      <HomeStack.Screen
        name="ViewAll"
        component={ViewAll} 
        options={{
          title: 'Xem Tất Cả',
          headerStyle: {
            backgroundColor: "#FF3333"
          },
          headerTintColor:'#fff',
          headerTitleStyle: {
            fontWeight:'bold'
          },
          headerTitleAlign:'center'
        }}/>
      <HomeStack.Screen 
        name="Profile"
        component={Profile}
        options={{
          title: 'Thông Tin Cá Nhân',
          headerStyle: {
            backgroundColor: "#FF3333"
          },
          headerTintColor:'#fff',
          headerTitleStyle: {
            fontWeight:'bold'
          },
          headerTitleAlign:'center'
        }}/>
    </HomeStack.Navigator>
  )
}
const SearchStackScreen = ({navigation})=>{
  return(
    <SearchStack.Navigator>
      <SearchStack.Screen 
        name="Search"
        component={Search}
        options={{
          title: 'Tìm Kiếm',
          headerStyle: {
            backgroundColor: "#FF3333"
          },
          headerTintColor:'#fff',
          headerTitleStyle: {
            fontWeight:'bold'
          },
          headerTitleAlign:'center'
        }}/>
      <SearchStack.Screen 
        name="Detail"
        component={Detail}
        options={{
          title: 'Công Thức',
          headerStyle: {
            backgroundColor: "#FF3333"
          },
          headerTintColor:'#fff',
          headerTitleStyle: {
            fontWeight:'bold'
          },
          headerTitleAlign:'center'
        }}/>
    </SearchStack.Navigator>
  )
}
const UserStackScreen = ({navigation}) => {
  return(
    <UserStack.Navigator >
    <UserStack.Screen
      name="User"
      component={User} 
      options={{
        title: 'Tài Khoản',
        headerStyle: {
          backgroundColor: "#FF3333"
        },
        headerTintColor:'#fff',
        headerTitleStyle: {
          fontWeight:'bold'
        },
        headerTitleAlign:'center'
      }}
    />
    <UserStack.Screen
      name="Login"
      component={Login}
      options={{
        title: 'Đăng Nhập',
        headerStyle: {
          backgroundColor: "#FF3333"
        },
        headerTintColor:'#fff',
        headerTitleStyle: {
          fontWeight:'bold'
        },
        headerTitleAlign:'center'
      }}
    />
    <UserStack.Screen
      name="Register"
      component={Register}
      options={{
        title: 'Đăng Ký',
        headerStyle: {
          backgroundColor: "#FF3333"
        },
        headerTintColor:'#fff',
        headerTitleStyle: {
          fontWeight:'bold'
        },
        headerTitleAlign:'center'
      }}
    />
    <UserStack.Screen 
      name="Forget"
      component={Forget}
      options={{
        title:'Đổi Mật Khẩu',
        headerStyle: {
          backgroundColor: "#FF3333"
        },
        headerTintColor:'#fff',
        headerTitleStyle: {
          fontWeight:'bold'
        },
        headerTitleAlign:'center'
      }} />
  </UserStack.Navigator>
  )
};
export default App
