import React from "react";


const Welcome = () => {
    return (
        <div className="w-full flex flex-col text-center p-10">
            <h1 className="text-2xl py-4">make money doing surveys</h1>
            <button className="mx-auto bg-blue-500 w-32 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
                Start
            </button>
        </div>
    );
};

export default Welcome;
