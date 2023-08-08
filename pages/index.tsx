import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import metamaskIcon from "./img/metamaskIcon.png";
import Swal from 'sweetalert2';

// wallet
import { useConnect, useAddress, useContract } from "@thirdweb-dev/react";
import { metamaskWallet } from "@thirdweb-dev/react";

// components
import Survey from "./survey";

export default function Home() {

    // wallet
    const metamaskConfig = metamaskWallet();
    const connect = useConnect();
    const address = useAddress();
    
    async function Login():Promise<void> {
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
            await connect(metamaskConfig);
        }
    };

    if (address) {
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
