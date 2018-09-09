import {FETCH_FAIL, FETCHING} from "../actions/actionType";
import {put, takeLatest, takeEvery} from 'redux-saga/effects'
import {getDataFromApi} from "../apis/getData";

//
export function* fetchNewsRequest() {
    yield takeEvery('FETCH_NEWS', function* (action) {
        const {api, apiKey, pageSize, page} = action.payload;
        try {
            const data = yield getDataFromApi(api, apiKey, pageSize, page)
            yield put({type: FETCHING, loading: false})
            yield put({type:'GET_NEWS_DATA', payload: data})
        }catch (e) {
            yield put({type: FETCH_FAIL, res: e})
        }
    })
}

