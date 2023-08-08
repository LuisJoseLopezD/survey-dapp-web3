// components/survey/index.tsx
import React from "react"
import * as Survey from "survey-react" // import surveyjs
import { questions } from "./content" // these are the survey questions
import { useRouter } from 'next/router'

// Modern theme
import "survey-react/modern.min.css"

//state
import useStore from '../../store/store';

const SurveyComponent = () => {

    const surveyResult = useStore((state) => state.surveyResult);
    let answers = useStore((state) => state.answers);

    const router = useRouter();
    const SURVEY_ID = {id: "1"};

    // Apply theme
    Survey.StylesManager.applyTheme("modern")

    // Create a modal
    const survey = new Survey.Model(questions)

    survey.onComplete.add((survey) => {
        // const resultData = [];
        for (const key in survey.data) {
            const question = survey.getQuestionByName(key);
            if (!!question) {
                const item = {
                    name: key,
                    value: question.value,
                    title: question.displayValue,
                    displayValue: question.displayValue,
                    correctAnswer: question.correctAnswer
                };
                surveyResult.push(item);
            }
        }    
        surveyResult.push(SURVEY_ID);
        router.push('/rewards');
        console.log(surveyResult);
        // ...
    });


    // Render the survey
    return (

        <Survey.Survey model={survey} />

    )
}

export default SurveyComponent