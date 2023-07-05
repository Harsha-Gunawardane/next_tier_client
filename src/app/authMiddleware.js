import { setCredentials, logOut } from '../../features/auth/authSlice';
import { apiSlice } from './api/apiSlice';

const refreshTokenMiddleware = store => next => action => {
  const { dispatch, getState } = store;

  // Check if the action is a route change
  if (action.type === '@@router/LOCATION_CHANGE') {
    const { pathname } = action.payload.location;

    // Check if the route begins with 'user/'
    if (pathname.startsWith('/user/')) {
      // Check if the token is expired or not available
      const token = getState().auth.token;

      if (!token) {
        // Perform token refresh
        const refresh = async () => {
          try {
            const refreshResult = await apiSlice.baseQuery('/refresh');
            
            if (refreshResult?.data) {
              const user = getState().auth.user;
              dispatch(setCredentials({ ...refreshResult.data, user }));
            } else {
              dispatch(logOut());
            }
          } catch (error) {
            dispatch(logOut());
          }
        };

        refresh();
      }
    }
  }

  return next(action);
};

export default refreshTokenMiddleware;
