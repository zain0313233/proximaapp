"use client";
import { createContext,useContext,useState } from "react";
import { useEffect } from "react";

const UserContext=createContext();
export const useUser=()=>useContext(UserContext);
export const UserProvider=({ children })=>{
    const [user,setUser]=useState(null);
    const [organization,setOrganization]=useState(null);
    const [token,setToken]=useState(null);
    const [loading,setLoading]=useState(true);

     useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    const storedOrganization = localStorage.getItem("organization");

    if (storedUser && storedToken && storedOrganization) {
      setOrganization(JSON.parse(storedOrganization));
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }

    setLoading(false);
  }, []);

    const login = async(userData,token,organization)=>{
        setUser(userData);
        setOrganization(organization);
        setToken(token);
        localStorage.setItem("user",JSON.stringify(userData));
        localStorage.setItem("organization",JSON.stringify(organization));
        localStorage.setItem("token",token);
    }
    const logout = ()=>{
        setUser(null);
        setToken(null);
        setOrganization(null);
        localStorage.removeItem("user");
        localStorage.removeItem("organization");
        localStorage.removeItem("token");
    }
    return(
        <UserContext.Provider value={{ user, token, organization,login, logout }}>
            {children}
        </UserContext.Provider>
    )
}


