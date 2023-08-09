import React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

//state
import useStore from './store/store';

const Waiting = (props: any) => {

    const router = useRouter();
    const surveyDone = useStore((state) => state.surveyDone);

    const { initialMinute = 5, initialSeconds = 0 } = props;
    const [minutes, setMinutes] = useState(initialMinute);
    const [seconds, setSeconds] = useState(initialSeconds);

    useEffect(() => {
        let myInterval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(myInterval)
                } else {
                    setMinutes(minutes - 1);
                    setSeconds(59);
                }
            }
        }, 1000)
        return () => {
            clearInterval(myInterval);
            useStore.setState({ surveyDone: false });
            router.push('/survey');
        };
    });

    return (
        <div className="flex justify-center items-center flex-col p-4 mx-auto">
            <h1 className="font-bold text-3xl text-center">Please wait to make another survey:</h1>
            {minutes === 0 && seconds === 0
                ? null
                : <h2 className="font-bold text-3xl text-center w-32 p-4 my-4 border-2">
                    {minutes}:{seconds < 10 ? `0${seconds}`
                        : seconds}
                </h2>
            }
        </div>
    )
}

export default Waiting;