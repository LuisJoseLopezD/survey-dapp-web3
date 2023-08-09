import { useState } from "react";
import { useDisconnect, useBalance } from "@thirdweb-dev/react";
import { Goerli } from "@thirdweb-dev/chains";
import { useRouter } from 'next/router';

//state
import useStore from '../store/store';

import { useEffect } from "react";
import {
    ChainId,
    useNetworkMismatch,
    useNetwork,
    useAddress
} from "@thirdweb-dev/react";
import { useFetcher } from "react-router-dom";

interface dataBalance {
    balance:string, 
    symbol: string
}

export default function Menu() {

    const connected = useStore((state) => state.connected);
    const router = useRouter();
    const [burger, setBurger] = useState(true);

    //contract
    const tokenAddress = "0x437eF217203452317C3C955Cf282b1eE5F6aaF72";
    const { data, isLoading } = useBalance(tokenAddress);
    const [dataBalance, setDataBalance] = useState<dataBalance>({
        balance: "",
        symbol: "",
    });

    //wallet
    const address = useAddress(); // Get connected wallet address
    const [, switchNetwork] = useNetwork(); // Switch to desired chain
    const isMismatched = useNetworkMismatch(); // Detect if user is connected to the wrong network
    const disconnect = useDisconnect();

    const showandhide = (burger: Boolean = true):void => {
        setBurger(!burger);
    };

    async function logOut () {
        useStore.setState({ connected: false });
        router.push('/');
        disconnect();
    }

    useEffect(() => {
        if (data) {
            console.log(data);
            setDataBalance({ ...dataBalance, balance: data.displayValue, symbol: data.symbol })
        }
    }, [data]);

    useEffect(() => {
        if (isMismatched) {
            switchNetwork(ChainId.Goerli);
        }
    }, [address]);

    return (
        <header>
            <nav className="bg-emerald-400">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <a href="#" className="flex items-center">
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                            Web3App
                        </span>
                    </a>
                    <button
                        onClick={()=>showandhide()}
                        data-collapse-toggle="navbar-solid-bg"
                        type="button"
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        aria-controls="navbar-solid-bg"
                        aria-expanded="false"
                    >
                        <span className="sr-only">Open main menu</span>
                        <svg
                            className="w-5 h-5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 17 14"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M1 1h15M1 7h15M1 13h15"
                            />
                        </svg>
                    </button>
                    <div
                        className={
                            burger
                                ? "hidden w-full md:block md:w-auto"
                                : "w-full md:block md:w-auto"
                        }
                        id="navbar-solid-bg"
                    >

                        {address ?
                            <ul className="flex flex-row items-center font-medium mt-4 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
                                <li>
                                    <span
                                        className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-black-400 md:p-0 dark:text-white md:dark:hover:text-black-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                                    >
                                        {dataBalance.symbol} {dataBalance.balance}
                                    </span>
                                </li>

                                <li>
                                    <button
                                        className={isMismatched ?
                                            "bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
                                            :
                                            "bg-blue-400 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
                                        }
                                        onClick={() => switchNetwork(ChainId.Goerli)}
                                        disabled={isMismatched ? false : true} >
                                        <span> {isMismatched ? "connect to goerli" : "Goerli connected"} </span>
                                    </button>
                                </li>
                                <li>
                                    <button className="my-1" onClick={logOut}>
                                        <svg className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />  <line x1="9" y1="9" x2="15" y2="15" />  <line x1="15" y1="9" x2="9" y2="15" /></svg>
                                    </button>
                                </li>
                            </ul>
                            :
                            ''
                        }
                    </div>
                </div>
            </nav>
        </header>
    );
};
