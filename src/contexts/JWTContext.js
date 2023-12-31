import {createContext, useEffect, useReducer} from 'react';
import PropTypes from 'prop-types';
import jwtDecode from "jwt-decode";
// utils
import axios from '../utils/axios';
import {isValidToken, setSession} from '../utils/jwt';
import {authRegister, confirmCreateNewAccount} from "../api/auth";
import {getUserById} from "../api/user";


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
      try {
        const accessToken = window.localStorage.getItem('accessToken');

        if (accessToken && isValidToken(accessToken)) {
          setSession(accessToken);
          const decoded = jwtDecode(accessToken);
          const response = await getUserById(decoded.Id);
          window.localStorage.setItem('Id', decoded.Id);
          const user = response.data;

          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: true,
              user,
            },
          });
        } else {
          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
        }
      } catch (err) {
        dispatch({
          type: 'INITIALIZE',
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    };

    initialize();
  }, []);

  const login = async (username, password) => {
    const response = await axios.post('/auth/Login', {
      username,
      password,
    });
    const { accessToken, dataResponseUser } = response.data.data;
    window.localStorage.setItem('accessToken', accessToken);
    setSession(accessToken);
    dispatch({
      type: 'LOGIN',
      payload: {
        user: dataResponseUser,
      },
    });
  };

  const register = async ({userName, password,fullName, dateOfBirth, email}) => {
    await authRegister( {
      userName,
      password,
      fullName,
      dateOfBirth,
      email
    });

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
    window.localStorage.removeItem('accessToken')
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
