import {createContext, useEffect, useReducer} from 'react';
import PropTypes from 'prop-types';
// utils
import axios from '../utils/axios';
import { setSession } from '../utils/jwt';
import {authRegister, confirmCreateNewAccount} from "../api/auth";

// ----------------------------------------------------------------------

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

const handlers = {
  INITIALIZE: (state, action) => {
    const { isAuthenticated, user } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
    };
  },
  LOGIN: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
  LOGOUT: (state) => ({
    ...state,
    isAuthenticated: false,
    user: null,
  }),
  REGISTER: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: false,
      user,
    };
  },
  VERIFY: (state) => {
    return {
      ...state,
      isAuthenticated: false,
      user: null,
    };
  },
};

const reducer = (state, action) => (handlers[action.type] ? handlers[action.type](state, action) : state);

const AuthContext = createContext({
  ...initialState,
  method: 'jwt',
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve(),
  verify: () => Promise.resolve(),
});

// ----------------------------------------------------------------------

AuthProvider.propTypes = {
  children: PropTypes.node,
};

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    const initialize = async () => {
      dispatch({
        type: 'INITIALIZE',
        payload: {
          isAuthenticated: false,
          user: null,
        },
      });
    };

    initialize();
  }, []);

  const login = async (username, password) => {
    const response = await axios.post('/auth/Login', {
      username,
      password,
    });
    const { accessToken, dataResponseUser } = response.data.data;
    setSession(accessToken);
    dispatch({
      type: 'LOGIN',
      payload: {
        user: dataResponseUser,
      },
    });
  };

  const register = async ({userName, password,fullName, dateOfBirth, email}) => {
    const response = await authRegister( {
      userName,
      password,
      fullName,
      dateOfBirth,
      email
    });
    console.log(response)

    dispatch({
      type: 'REGISTER',
      payload: {
        isAuthenticated: false,
        user: null,
      },
    });
  };

  const verify = async({confirmCode}) => {
    await confirmCreateNewAccount(confirmCode);
    dispatch({
      type: 'VERIFY',
      payload: {
        isAuthenticated: false,
        user: null,
      }
    })
  }

  const logout = async () => {
    setSession(null);
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'jwt',
        login,
        logout,
        register,
        verify
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
