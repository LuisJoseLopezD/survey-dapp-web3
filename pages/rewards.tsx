// state
import { useEffect } from 'react';
import useStore from './store/store';

export default function Rewards() {

    const surveyResult = useStore((state) => state.surveyResult);

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
                                    {surveyResult?.map?.((item, index) => (
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
                                                        item.correctAnswer[0] === item.displayValue? "✅" : "❌"
                                                    }
                                                </td>
                                            </tr>
                                        </>
                                    ))}

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {
                Object.keys(surveyResult).length === 0 ?
                    ''
                    :
                    <button className="bg-yellow-500 my-4 w-48 mx-auto hover:bg-yellow-400 text-white font-bold py-2 px-4 border-b-4 border-yellow-700 hover:border-yellow-500 rounded">
                        Claim Rewards
                    </button>
            }
        </>
    )
}