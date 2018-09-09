import {FETCH_FAIL, FETCHING} from "../actions/actionType";

const initialState  = {
    dataHeadLine: [],
    dataRecent: [],
    times: 0,
    loading: false,
    pageSize: 6,
    page: 1
}

const NewsReducers = (state = initialState, action) => {
    switch (action.type) {
        case FETCHING:
            return{
                ...state,
                loading: action.loading
            }
        case FETCH_FAIL:
            return []
        case 'FETCH_NEWS':
            const {pageSize, page} = action.payload
            return{
                ...state,
                pageSize: pageSize + 6,
                page
            }
        case 'GET_NEWS_DATA':
            return{
                ...state,
                dataRecent: action.payload,
            }
        default:
            return state;
    }
}
export default NewsReducers;
