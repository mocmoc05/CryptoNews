import {FETCH_FAIL, FETCHING} from "./actionType";

export function fetching(loading) {
    return{
        type: FETCHING,
        loading
    }
}

export const fetchFail = res => {
    return{
        type: FETCH_FAIL,
        res
    }
}
//
export function fetchNews(api, apiKey, pageSize, page) {
    return {
        type: 'FETCH_NEWS',
        payload: {
            api, apiKey, pageSize, page
        }
    }
}
export function getNewsData(res) {
    return{
        type: 'GET_NEWS_DATA',
        payload: res
    }
}
