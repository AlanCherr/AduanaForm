
import { useEffect, useState } from "react";
import { BrowserRouter , Routes, Route, Navigate } from "react-router-dom";
import Login from '../components/Login';
import AvisoDeCarga from '../pages/AvisoDeCarga';

function Navigation() {
    const [tokenNav,setTokenNav] = useState()
    const getToken = ()=>{
        const token = localStorage.getItem("token");
        setTokenNav(token)
    }
    

    useEffect(()=>{
        getToken()
    },[])
    return (
        <>
         <BrowserRouter>
        
            <Routes>
            { tokenNav ? (
                    <>
                        <Route path="/avisoDeCarga/:token" element={<AvisoDeCarga></AvisoDeCarga>} />
                        <Route path='*' element={<Navigate replace to={"/avisoDeCarga/"+tokenNav}/>}/>
                        
                    </>
                ):(
                    <>
                        <Route path="/" element={<Login></Login>} />
                        <Route path='*' element={<Navigate replace to={"/"}/>}/>
                    </>
                )
                }
            </Routes>
        
         </BrowserRouter>

        </>
    )
}

export default Navigation;