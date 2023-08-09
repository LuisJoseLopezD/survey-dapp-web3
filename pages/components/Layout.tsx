import { useContext, useEffect, useState } from 'react';
import Menu from './Menu';

import { useRouter } from 'next/router';
import { DataContext } from '../context/DataContext';

export default function Layout({ children }) {
    const router = useRouter();
    const { surveyDone } = useContext(DataContext);

    function getCookie(key) {
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