import {createStore, applyMiddleware} from 'redux'
import createSagaMiddleware from 'redux-saga'
import allReducer from "../reducers";
import rootSaga from "../sagas/rootSaga";

export default function configStore() {
    const sagaMiddleware = createSagaMiddleware()
    const store = createStore(allReducer, applyMiddleware(sagaMiddleware));

    sagaMiddleware.run(rootSaga);

    return store;
}
