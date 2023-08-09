import React, { useContext } from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { DataContext } from './context/DataContext.js';
import dynamic from "next/dynamic";

const Waiting = () => {

    const router = useRouter();
    const { surveyDone, setSurveyDone } = useContext(DataContext);

    const storedTime = typeof window !== 'undefined' ? localStorage.getItem("time") : null;
    const parsedTime = storedTime ? JSON.parse(storedTime) : { minutes: 5, seconds: 0 };
    const [minutes, setMinutes] = useState(parsedTime.minutes);
    const [seconds, setSeconds] = useState(parsedTime.seconds);

    useEffect(() => {
        localStorage.setItem("time", JSON.stringify({ minutes, seconds }));
    }, [minutes, seconds]);

    useEffect(() => {
        const myInterval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            } else {
                if (minutes > 0) {
                    setMinutes(minutes - 1);
                    setSeconds(59);
                } else {
                    clearInterval(myInterval);
                    router.push('/survey');
                    localStorage.removeItem("time");
                    setSurveyDone("NO");
                }
            }
        }, 1000);

        return () => {
            clearInterval(myInterval);
        };
    }, [minutes, seconds, router, setSurveyDone]);

    return (
        <section className="flex justify-center items-center flex-col p-4 mx-auto">
            <h1 className="font-bold text-3xl text-center">Please wait to make another survey:</h1>
            {minutes === 0 && seconds === 0
                ? null
                : <h2 className="font-bold text-3xl text-center w-32 p-4 my-4 border-2">
                    {minutes}:{seconds < 10 ? `0${seconds}`
                        : seconds}
                </h2>
            }
        </section>
    )
}

export default dynamic(() => Promise.resolve(Waiting), {
    ssr: false,
  });