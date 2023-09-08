"use client"

import React from 'react';
import Link from "next/link";
import {useRouter} from "next/navigation";
import { useEffect, useState } from "react";

function LoggedNavbar() {
    return (
        <>
            <li><Link href="/logout">Logout</Link></li>
            <li>
                <Link href="/dashboard">Dashboard</Link>
            </li>
        </>
    );
}

function AuthNavbar() {
    return (
        <>
            <li><Link href="/login">Login</Link></li>
            <li><Link href="/registration">Register</Link></li>
        </>
    );
}

function Navbar() {

    const [isHasToken, setIsHasToken] = useState(false);

    useEffect(() => {
        (async () => {
            let result = await fetch("/api/token");
            result = await result.json();
            setIsHasToken(result.isHasToken);
        })();
    }, []);


    const router = useRouter();

    const logOut = async () =>{
        const res = await fetch("/api/login");
        const jsonRes = await res.json();

        if(jsonRes['status']===true){
            router.replace("/");
        }
    }


    return (
        <nav class="nav bg-purple-700 text-white">
            <div class="container mx-auto flex items-center justify-between">
                <Link href="/" className="text-xl">Auth Home</Link>
                <ul class=" p-4  flex gap-6">
                    {isHasToken === true ? <LoggedNavbar /> : <AuthNavbar />}
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;