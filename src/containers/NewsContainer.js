import {connect} from 'react-redux'
import News from "../components/News";
import {getNewsData, fetchNews} from "../actions";

const mapStateToProps = state => {
    return {
        dataHeadLine: state.NewsReducer.dataHeadLine,
        dataRecent: state.NewsReducer.dataRecent,
        loading: state.NewsReducer.loading,
        page: state.NewsReducer.page,
        pageSize: state.NewsReducer.pageSize,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onGetNewsData: (data) => { dispatch(getNewsData(data))},

        onFetchNews : (api, apiKey, pageSize, page) => { dispatch(fetchNews(api, apiKey, pageSize, page)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(News)
