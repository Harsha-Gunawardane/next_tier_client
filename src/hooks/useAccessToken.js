import useAuth from "./useAuth";

const useAccessToken = () => {
    const { auth } = useAuth();

    const jwt = auth?.accessToken
    return jwt
}

export default useAccessToken;