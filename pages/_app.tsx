import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { metamaskWallet } from "@thirdweb-dev/react";

const metamaskConfig = metamaskWallet();

const activeChain = "goerli";

function App({ Component, pageProps }: AppProps) {

    return (
        <ThirdwebProvider activeChain={activeChain} supportedWallets={[metamaskWallet()]}>
            <Component {...pageProps} />
        </ThirdwebProvider>
    );
}

export default App;
