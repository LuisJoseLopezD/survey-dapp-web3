import "@/styles/globals.css";
import type { AppProps } from "next/app";

//layout
import Layout from './components/Layout'

//wallet
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { metamaskWallet } from "@thirdweb-dev/react";

function App({ Component, pageProps }: AppProps) {

    //wallet
    const metamaskConfig = metamaskWallet();
    const activeChain = "goerli";

    return (
        <ThirdwebProvider activeChain={activeChain} supportedWallets={[metamaskWallet()]}>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </ThirdwebProvider>
    );
}

export default App;
