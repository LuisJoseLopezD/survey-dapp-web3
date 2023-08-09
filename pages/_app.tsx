import "@/styles/globals.css";
import type { AppProps } from "next/app";
import React, { useEffect } from "react";
import {DataProvider} from './context/DataContext.js';

//layout
import Layout from './components/Layout'

//wallet
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { metamaskWallet } from "@thirdweb-dev/react";
import { useRouter } from "next/router";

function App({ Component, pageProps }: AppProps) {

    const router = useRouter();

    //wallet
    const metamaskConfig = metamaskWallet();
    const activeChain = "goerli";

    return (
        <ThirdwebProvider activeChain={activeChain} supportedWallets={[metamaskWallet()]}>
            <DataProvider>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </DataProvider>
        </ThirdwebProvider>
    );
}
export default App;
