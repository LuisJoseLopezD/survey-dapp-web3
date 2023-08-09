import { useContext, useState } from "react";
import Image from "next/image";
import { useRouter } from 'next/router'
import metamaskIcon from "./img/metamaskIcon.png";
import Swal from 'sweetalert2';
import { ethers } from "ethers";

import { useConnect, useAddress } from "@thirdweb-dev/react";
import { metamaskWallet } from "@thirdweb-dev/react";

// components
import Survey from "./survey";
import Waiting from "./waiting";

//state
import { DataContext } from "./context/DataContext";

export default function Home() {

    const router = useRouter();
    const { connected, setConnected } = useContext(DataContext);
    const { surveyDone } = useContext(DataContext);

    // wallet
    const metamaskConfig = metamaskWallet();
    const connect = useConnect();
    const address = useAddress();

    async function getWallet() {
        const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
        let accounts = await provider.send("eth_requestAccounts", []);
        let account = accounts[0];
        const signer = provider.getSigner();
        const wallet = await signer.getAddress();
        setConnected(true);
        console.log(connected);
        router.push('/survey');
    }

    async function connectToApp() {
        await connect(metamaskConfig)
            .then((result) => {
                getWallet();
                console.log("connected to app...");
            })
            .catch((error) => {
                console.log(error);
                console.log("loggin error...");
            });
    }

    async function Login() {
        if (!window.ethereum) {
            Swal.fire({
                title: "You don't have Metamask installed",
                icon: 'warning',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Install Metamask'
            }).then((result) => {
                window.open('https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn', '_blank');
                //}
            })
            return;
        } else {
            await connectToApp();
        }
    };

    if (connected) {
        return (
            <>
                <Survey />
            </>
        );
    } else {
        return (
            <div>
                <section className="bg-gray-50 dark:bg-gray-900">
                    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                            <div className="flex flex-col items-center p-6 space-y-4 md:space-y-6 sm:p-8">
                                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                    Sign in to your account
                                </h1>
                                <div
                                    onClick={Login}
                                    style={{ background: "orange" }}
                                    className="cursor-pointer rounded w-64 h-10 flex row justify-center items-center"
                                >
                                    <Image
                                        src={metamaskIcon}
                                        className="h-8 w-8 mr-2"
                                        alt="Picture of the author"
                                    />
                                    <p className="text-xl text-white font-semibold">Connect to wallet</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}
