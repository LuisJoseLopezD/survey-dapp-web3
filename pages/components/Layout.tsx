import Menu from "./Menu";


export default function Layout({ children }) {

    return (
        <>

            <Menu />

            <main className="flex flex-col justify-center">

                {children}

            </main>

        </>
    );
};