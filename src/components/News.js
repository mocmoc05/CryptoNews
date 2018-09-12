import React, {Component} from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    FlatList,
    Image,
    Dimensions,
    ScrollView,
    SectionList,
    RefreshControl,
    ActivityIndicator,
    Platform,
    TextInput,
    ImageBackground
} from 'react-native'
import {LOGO_URL} from "../config/const";
import {API, apiKey} from "../config/Api";
import Carousel, {Pagination} from 'react-native-snap-carousel';

const {width, height} = Dimensions.get('window')

class News extends Component {
    constructor(props) {
        super(props);
        this.dataRecent = [],
            this.onEndReachedCalledDuringMomentum = true;
        this.state = {
            refresh: false,
            begin: true,
            value_search: '',
            activeSlide: 0
        }
    }

    filterSearch = (text) => {
        const {pageSize, page} = this.props
        this.setState({
            value_search: text
        })
        let x = [];
        this.dataRecent.forEach(element => {
            if (element.title.toLowerCase().indexOf(text.toLowerCase()) > -1) {
                x.push(element)
            }
        });
        if (text.length > 0) {
            this.props.onGetNewsData(x)
        } else {
            this.props.onFetchNews(API.ALL_CRYPTO_COIN_NEWS_API, apiKey, pageSize, page)
        }
    }

    get pagination() {
        return (
            <Pagination
                dotsLength={this.props.dataRecent.length}
                activeDotIndex={this.state.activeSlide}
                containerStyle={{ backgroundColor: 'rgba(0, 0, 0, 1)' }}
                dotStyle={{
                    width: 5,
                    height: 5,
                    borderRadius: 5,
                    marginHorizontal: 1,
                    backgroundColor: 'rgba(255, 255, 255, 0.9)'
                }}
                inactiveDotStyle={{
                    // Define styles for inactive dots here
                }}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
                tappableDots={true}
            />
        )
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({begin: false})
        }, 2000)
        if(this.onEndReachedCalledDuringMomentum){
            this.props.onFetchNews(API.ALL_CRYPTO_COIN_NEWS_API, apiKey, 6, 1)
            this.onEndReachedCalledDuringMomentum = true;
        }
    }

    render() {
        const {refresh, begin, value_search} = this.state
        const {dataRecent, page, pageSize, onFetchNews, loading} = this.props
        const _API = API.ALL_CRYPTO_COIN_NEWS_API
        this.dataRecent = dataRecent

        return <View style={style.container}>
            {
                begin ?
                    <View>
                        <ActivityIndicator size='large'/>
                        <Text>Loading...</Text>
                    </View>
                    :
                    <View>
                        <View style={style.header}>
                            <Text style={{fontSize: 30, fontWeight: '700', marginRight: 10}}>Crypto Coins News</Text>
                            <Image source={{uri: LOGO_URL}} style={style.img}/>
                        </View>
                        <View style={{marginTop: 10, marginBottom: 10}}>
                            <TextInput
                                style={style.search}
                                value={value_search.toLowerCase()}
                                placeholder={'Search'}
                                onChangeText={(text) => this.filterSearch(text)}
                                underlineAndroid={'transparent'}
                            />
                        </View>
                        <SectionList
                            stickySectionHeadersEnabled={false}
                            refreshControl={
                                <RefreshControl
                                    refreshing={refresh}
                                    onRefresh={() => {
                                        onFetchNews(_API, apiKey, 6, 1), this.setState({refresh: loading})
                                    }}
                                    tintColor="green"
                                    titleColor="green"
                                />
                            }
                            renderItem={({item, index, section}) => (
                                index === 0 ?
                                    <TouchableOpacity
                                        style={{
                                            flex: 1,
                                            paddingBottom: 10,
                                            marginBottom: 20,
                                            backgroundColor: '#e1effd',
                                            justifyContent: 'center',
                                        }}
                                        onPress={() => this.props.navigation.navigate('Detail', {item: item})}
                                    >
                                        <Image source={{uri: item.urlToImage}} style={style.img0}/>
                                        <Text style={style.txt10}>{item.author}</Text>
                                        <Text style={{fontWeight: '700', fontSize: 24, margin: 5}}>{item.title}</Text>
                                    </TouchableOpacity>
                                    :
                                    <TouchableOpacity
                                        key={index}
                                        style={style.news}
                                        onPress={() => this.props.navigation.navigate('Detail', {item: item})}
                                    >
                                        <Image source={{uri: item.urlToImage}} style={style.img_news}/>
                                        <View style={style.content}>
                                            <Text style={{fontWeight: '700'}} numberOfLines={2}>{item.title}</Text>
                                            <Text style={style.txt_content} numberOfLines={1}>{item.publishedAt} by {item.author}</Text>
                                            <Text style={style.desc} numberOfLines={2}>{item.description}</Text>
                                        </View>
                                    </TouchableOpacity>
                            )}
                            renderSectionHeader={({section: {title}}) => (
                                <Text style={style.title}>{title}</Text>
                            )}
                            sections={[
                                {title: 'ALL NEWS', data: dataRecent || []},
                            ]}
                            onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false; }}
                            onEndReachedThreshold={0.5}
                            onEndReached={() => {
                                if(!this.onEndReachedCalledDuringMomentum){
                                    onFetchNews(_API, apiKey, pageSize, page)
                                    this.onEndReachedCalledDuringMomentum = true;
                                }
                            }}
                            ListFooterComponent={loading ? <ActivityIndicator size={'small'}/> : null}
                            keyExtractor={(item, index) => item + index}
                        />
                    </View>
            }
        </View>
    }
}

const style = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 0.5,
        borderColor: '#4d4d4d'
    },
    container: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 0,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: '#ffffff'
    },
    img0: {
        width: width, height: height / 4
    },
    imgCarousel:{
        width: width, height: height / 3, borderRadius: 10
    },
    img: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginTop: 10,
        marginBottom: 10,
    },
    title: {
        fontWeight: 'bold', color: '#e41700', fontSize: 20, marginTop: 20, marginBottom: 10
    },
    txt10: {
        margin: 5,
        fontStyle: 'italic',
        fontSize: 12,
        color: '#4d4d4d'
    },
    txt_content: {
        marginTop: 10,
        fontSize: 12,
        fontStyle: 'italic'
    },
    news: {
        flex: 1,
        flexDirection: 'row',
        marginBottom: 20,
    },
    img_news: {
        flex: 3,
        height: 100,
        width: 80,
        borderRadius: 5
    },
    content: {
        flex: 7,
        marginLeft: 10
    },
    desc: {
        marginTop: 10
    },
    search: {
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderRadius: 5,
        borderColor: '#4d4d4d',
        padding: 10
    },
    carousel: {
        width: width,
        height: '100%',
        borderWidth: 5,
        borderRadius: 5
    }
})
export default News;
