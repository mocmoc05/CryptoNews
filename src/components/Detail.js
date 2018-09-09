import React, {Component} from 'react'
import {View, Text, StyleSheet, Image, Dimensions, ScrollView} from 'react-native'

const {width, height} = Dimensions.get('window')

class Detail extends Component{
    render() {
        const {author, description, publishedAt, title, url, urlToImage} = this.props.navigation.state.params.item
        return(
            <ScrollView style={style.container}>
                <Image source={{uri: urlToImage}} style={style.image}/>
                <View style={{margin: 10}}>
                    <Text style={style.title}>{title}</Text>
                    <Text style={style.publishedAt}>{publishedAt} by {author?author: 'Anonymous'}</Text>
                    <Text style={style.description}>{description}</Text>
                </View>
            </ScrollView>
        )
    }
}
const style = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#ffffff'
    },
    image:{
        width: width,
        height: height / 4
    },
    publishedAt:{
        fontStyle: 'italic',
        color: '#4d4d4d'
    },
    title:{
        fontSize: 24,
        fontWeight: '700',
        marginTop: 10,
        marginBottom: 20
    },
    description:{
        marginTop: 10,
        letterSpacing: 0.5,
        lineHeight: 24
    }
})
export default Detail
