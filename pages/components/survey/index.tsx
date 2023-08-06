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

    const router = useRouter()

    // Apply theme
    Survey.StylesManager.applyTheme("modern")

    // Create a modal
    const survey = new Survey.Model(questions)

    survey.onComplete.add((survey) => {
        const resultData = [];
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
            resultData.push(item);
          }
        }
        // ...
        useStore.setState({ surveyResult: resultData });
        router.push('/rewards');
        console.log(resultData);
        // ...
      });

    // Render the survey
    return (

        <Survey.Survey model={survey} />

    )
}

export default SurveyComponent