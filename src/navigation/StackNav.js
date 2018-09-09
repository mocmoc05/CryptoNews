import {createStackNavigator} from 'react-navigation'
import React from 'react'
import {View, Text, Image, StyleSheet} from 'react-native'
import Detail from "../components/Detail";
import NewsContainer from "../containers/NewsContainer";
import {LOGO_URL} from "../config/const";

export default StackNav = createStackNavigator(
    {
        News: {
            screen: NewsContainer,
            navigationOptions: {
                header: null
            }
        },
        Detail: {
            screen: Detail,
            navigationOptions: {
                headerTitle: 'Crypto Coin News'
            }
        }
    },
    {
        initialRouteName: "News"
    }
)
const style = StyleSheet.create({
    header : {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    img: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginTop: 10,
        marginBottom: 10,
    }
})

