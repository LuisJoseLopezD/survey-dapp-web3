import { useContext, useEffect, useState } from 'react';
import Menu from './Menu';

import { useRouter } from 'next/router';
import { DataContext } from '../context/DataContext.js';

//state
import { useDataContext } from "../context/DataContext";

export default function Layout({ children }: any) {
    const router = useRouter();
    const { surveyDone } = useDataContext();

    function getCookie(key:string) {
        var b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
        return b ? b.pop() : "";
    }

    useEffect(() => {
        if (getCookie("survey") === "NO") {
            router.push('/survey');
        } else if (getCookie("survey") === "YES") {
            router.push('/waiting');
        }
    }, []);

    return (
        <>
            <Menu />
            <main className="flex flex-col justify-center">
                {children}
            </main>
        </>
    );
}