import {FETCHING} from "../actions/actionType";
import {put} from 'redux-saga/effects'
export function* getDataFromApi(url, apiKey, pageSize, page) {
    yield put({type: FETCHING, loading: true})
    const response = yield fetch(url + apiKey + `&pageSize=${pageSize}&page=${page}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-type': 'application/json'
        }
    })
    const data = yield response.status === 200 ? JSON.parse(response._bodyInit) : []
    return data.articles
}
