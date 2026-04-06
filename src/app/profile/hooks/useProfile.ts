"use client";
import {useState, useEffect} from "react";
import Cookies from "js-cookie";

export const useProfile = ()=>{
    const [user, setUser] = useState<any>(null);

    useEffect(()=>{
        const savedUser = Cookies.get("ezbuy_user");
        if(savedUser){
            setUser(JSON.parse(savedUser));
        }
    },[]);

    return {user};
}