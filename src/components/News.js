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
    TextInput
} from 'react-native'
import {LOGO_URL} from "../config/const";
import {API, apiKey} from "../config/Api";

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

    componentDidMount() {
        setTimeout(() => {
            this.setState({begin: false})
        }, 2000)
        //
        // if (!this.state.begin) {
        //     this.props.onFetchNews(API.ALL_CRYPTO_COIN_NEWS_API, apiKey, 6, 1)
        // }
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
        console.log(pageSize)

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
                                            paddingBottom: 10,
                                            marginBottom: 20,
                                            backgroundColor: '#e1effd',
                                            justifyContent: 'center',
                                            alignItems: Platform.OS === 'ios' ? '' : 'center'
                                        }}
                                        onPress={() => this.props.navigation.navigate('Detail', {item: item})}
                                    >
                                        <Image source={{uri: item.urlToImage}} style={style.img0}/>
                                        <Text style={style.txt10}>{item.author}</Text>
                                        <Text style={{fontWeight: '700', fontSize: 24}}>{item.title}</Text>
                                    </TouchableOpacity>
                                    :
                                    <View key={index} style={style.news}>
                                        <Image source={{uri: item.urlToImage}} style={style.img_news}/>
                                        <View style={style.content}>
                                            <TouchableOpacity
                                                onPress={() => this.props.navigation.navigate('Detail', {item: item})}
                                            >
                                                <Text style={{fontWeight: '700'}}>{item.title}</Text>
                                            </TouchableOpacity>
                                            <Text style={style.txt_content}>{item.publishedAt} by {item.author}</Text>
                                            <Text style={style.desc} numberOfLines={1}>{item.description}</Text>
                                        </View>
                                    </View>
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
                                    onFetchNews(_API, apiKey, pageSize, page), console.log('on end reach')
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
        width: width / 1.09, height: height / 4
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
        marginBottom: 10
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
    desc: {},
    search: {
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderRadius: 5,
        borderColor: '#4d4d4d',
        padding: 10
    }
})
export default News;
