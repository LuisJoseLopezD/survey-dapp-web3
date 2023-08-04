import "@/styles/globals.css";
import type { AppProps } from "next/app";

import "regenerator-runtime/runtime";
import { ThirdwebWeb3Provider } from "@3rdweb/hooks";

const supportedChainIds = [1, 4];
const connectors = {
    injected: {},
};
const activeChain = "goerli";

function App({ Component, pageProps }: AppProps) {
    return (
        <ThirdwebWeb3Provider
            activeChain={activeChain}
            supportedChainIds={supportedChainIds}
            connectors={connectors}
        >
            <Component {...pageProps} />
        </ThirdwebWeb3Provider>
    );
}

export default App;
