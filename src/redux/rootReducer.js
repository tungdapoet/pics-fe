import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// slices
import pinReducer from './slices/pin';

// ----------------------------------------------------------------------

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: [],
};

const pinPersistConfig = {
  key: 'pin',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['sortBy', 'name'],
};

const rootReducer = combineReducers({
  pin: persistReducer(pinPersistConfig, pinReducer),
});

export { rootPersistConfig, rootReducer };
