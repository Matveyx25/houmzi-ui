import { AnyAction, applyMiddleware, createStore } from 'redux';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import { createEpicMiddleware } from 'redux-observable';
import { combinedReducer, IRootState } from './reducers';
import actionToPlainObjectConverter from 'redux-action-class';
import { rootEpics } from './epics';

const reducer = (state: IRootState, action: AnyAction) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload,
    };
    if (state.profile) nextState.profile = state.profile;
    return nextState;
  } else {
    return combinedReducer(state, action);
  }
};

const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension');
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

export const initStore = () => {
  const epicMiddleware = createEpicMiddleware();

  const store = createStore(reducer, bindMiddleware([
    epicMiddleware,
    actionToPlainObjectConverter,
  ]));

  epicMiddleware.run(rootEpics);

  return store;
};

export const wrapper = createWrapper(initStore);
