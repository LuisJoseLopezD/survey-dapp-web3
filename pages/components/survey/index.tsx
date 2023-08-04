// components/survey/index.tsx
import React from "react"
import * as Survey from "survey-react" // import surveyjs
import { questions } from "./content" // these are the survey questions

// Modern theme
import "survey-react/modern.min.css"
// Default theme
// import 'survey-react/survey.min.css';

const SurveyComponent = () => {
    // Apply theme
    Survey.StylesManager.applyTheme("modern")

    // Create a modal
    const survey = new Survey.Model(questions)

    // local storage save data
    survey.sendResultOnPageNext = true
    const storageName = "SurveyNextjs"
    function saveSurveyData(survey: any) {
        let data = survey.data
        data.pageNo = survey.currentPageNo
        window.localStorage.setItem(storageName, JSON.stringify(data))
        console.log(data)
    }
    survey.onPartialSend.add(function (survey) {
        saveSurveyData(survey)
    })
    const prevData = window.localStorage.getItem(storageName) || null
    if (prevData) {
        let data = JSON.parse(prevData)
        survey.data = data
        if (data.pageNo) {
            survey.currentPageNo = data.pageNo
        }
    }

    survey.onComplete.add(function (survey, options) {
        saveSurveyData(survey)
        console.log(survey.data)
        // window.location.href = "/survey/finish";
    })

    // Render the survey
    return (

        <Survey.Survey model={survey} />

    )
}

export default SurveyComponent