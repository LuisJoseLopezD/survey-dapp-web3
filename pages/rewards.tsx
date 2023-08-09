import { useEffect } from 'react';
import { ethers } from "ethers";
import web3 from 'web3';
import ABI from './helpers/ABI.json';
import { useRouter } from 'next/router'

//state
import useStore from './store/store';
import { useFrameWallet } from '@thirdweb-dev/react';

export default function Rewards() {

    const router = useRouter();

    //contract
    const { ethers } = require("ethers");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner()
    const contractAddress = useStore((state) => state.contractAddress);

    //survey
    const surveyResult = useStore((state) => state.surveyResult);
    //id
    let filteredId = surveyResult.filter((result: any) => result.id);
    let formattedFilteredId = parseInt(filteredId[0].id);
    //answers
    let filteredAnswers = surveyResult.filter((result: any) => result.correctAnswer);
    let ids: Array<String> = [];
    let filteredAnswersId = filteredAnswers
        .map((item: any) => item.correctAnswer)
        .map((id: any) => id.toString().replace(/\D/g, ''));

    console.log(formattedFilteredId);
    console.log(filteredAnswersId);

    // The Contract object
    const contract = new ethers.Contract(contractAddress, ABI, signer);

    async function handleSubmitReward() {
        const handleSubmit = await contract.submit(formattedFilteredId, filteredAnswersId)
            .then((result) => {
                router.push('/waiting');
                console.log(handleSubmit);
            })
            .catch((error) => {
                console.log(error);
                console.log("transaction error...");
            });
    }


    return (
        <>
            <div className="flex flex-col w-8/12 mx-auto">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">

                        <h2 className="text-2xl font-semibold mt-2 mb-2 p-4 text-center">
                            Thanks for taking the survey ✅
                        </h2>

                        <div className="overflow-hidden">
                            <table
                                className="min-w-full border text-center text-base font-light dark:border-neutral-500">
                                <thead className="border-b font-medium dark:border-neutral-500">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="border-r px-6 py-4 dark:border-neutral-500">
                                            quetions
                                        </th>
                                        <th
                                            scope="col"
                                            className="border-r px-6 py-4 dark:border-neutral-500">
                                            your answers
                                        </th>
                                        <th
                                            scope="col"
                                            className="border-r px-6 py-4 dark:border-neutral-500">
                                            correct
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {surveyResult?.map?.((item: any, index: any) => (
                                        item.correctAnswer ?
                                            <>
                                                <tr className="border-b dark:border-neutral-500" key={index}>
                                                    <td
                                                        className="whitespace-nowrap border-r px-6 py-4 font-medium dark:border-neutral-500">
                                                        {item.name}
                                                    </td>
                                                    <td
                                                        className="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500">
                                                        {item.value}
                                                    </td>
                                                    <td
                                                        className="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500">
                                                        {
                                                            item.correctAnswer[0] === item.displayValue ?
                                                                "✅"
                                                                :
                                                                "❌"
                                                        }

                                                    </td>
                                                </tr>
                                            </>
                                            :
                                            null
                                    ))}

                                </tbody >
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {
                Object.keys(surveyResult).length === 0 ?
                    ''
                    :
                    <button
                        onClick={() => {
                            handleSubmitReward()
                        }}
                        className="bg-yellow-500 my-4 w-48 mx-auto hover:bg-yellow-400 text-white font-bold py-2 px-4 border-b-4 border-yellow-700 hover:border-yellow-500 rounded">
                        Claim Rewards
                    </button>
            }
        </>
    )
}