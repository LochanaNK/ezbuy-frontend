"use client";
import {useState, useEffect} from "react";;

export const useProfile = ()=>{
    const [user, setUser] = useState<any>(null);

    useEffect(()=>{
        const savedUser = localStorage.getItem("ezbuy_user");
        if(savedUser){
            setUser(JSON.parse(savedUser));
        }
    },[]);

    return {user};
}