import React, { useState, useEffect, useMemo } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
const TokenContext = React.createContext();
export const TokenProvider = (props) => {

    const [token, setToken] = React.useState(null);
    const [refreshToken, setRefreshToken] = React.useState(null);
   
    const value = useMemo(() => {
        return ({
            token,
            setToken,
            refreshToken,
            setRefreshToken
        })
    }, [token,refreshToken])

    return <TokenContext.Provider value={value} {...props} />

}


export function useToken() {
    const context = React.useContext(TokenContext)
    if (!context) {
        throw new Error("useToken debe estar dentro de TokenContext");
    }
    return context;
}
