// components/survey/content/index.tsx
export const questions = {
    showQuestionNumbers: "off",
    showPrevButton: false,
    firstPageIsStarted: true,
    startSurveyText: "START",
    showTimerPanel: "bottom",
    maxTimeToFinishPage: 10,
    showCompletedPage: false,
    pages: [
        {
            elements: [
                {
                    type: "html",
                    html: "<center><h2 style='font-size: 20px; font-weight: 600'>In this survey, we will ask you a couple questions about your impressions of our product.</h2></center>",
                },
            ],
        },
        {
            name: "page1",
            elements: [
                {
                    type: "checkbox",
                    name: "Question 1",
                    title: "Question 1",
                    // isRequired: true,
                    choices: ["Option 1", "Option 2", "Option 3"],
                    correctAnswer: "Option 1",
                },
            ],
        },
        {
            name: "page2",
            elements: [
                {
                    type: "checkbox",
                    name: "Question 2",
                    title: "Question 2",
                    // isRequired: true,
                    choices: ["Option 1", "Option 2", "Option 3"],
                    correctAnswer: "Option 1",
                },
            ],
        },
    ],
};

//  completedHtml: "<h4 style='margin-top: 10px'>You got <b>{correctAnswers}</b> out of <b>{questionCount}</b> correct answers</h4>",
