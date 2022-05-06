import { combineReducers, createStore } from 'redux';
import { tasksReducer } from '../reducers/tasksReducer';
import { todoListsReducer } from '../reducers/todoListsReducer';

const rootReducer = combineReducers({ tasksReducer, todoListsReducer });

export const store = createStore(rootReducer);

export type AppRootStateType = ReturnType<typeof rootReducer>;
