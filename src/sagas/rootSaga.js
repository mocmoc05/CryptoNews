import {call, all, fork} from 'redux-saga/effects'
import {fetchNewsRequest, watchFetchNews} from "./fetchDataNews";

export default function* rootSaga() {
    // yield all([
    //
    //     sayHello(),
    //     watchDecrease(),
    //     watchIncrease()
    // ]);
    // yield call(watchFetchNews)
    yield all([
        fork(fetchNewsRequest)
    ])
}
