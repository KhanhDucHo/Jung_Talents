import React from "react";
import { Model } from "survey-core";
import { Survey } from "survey-react-ui";
import "survey-core/defaultV2.min.css";
import { json } from "./json";
import { themeJson } from "./theme";

function SurveyComponent() {
    const survey = new Model(json);
    survey.applyTheme(themeJson);
    // Attach an event handler to the 'onComplete' event of the survey
    survey.onComplete.add((sender) => {
    console.log(JSON.stringify(sender.data, null, 3));
    const options = {
        method: 'POST',
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
        },
        body: JSON.stringify(sender.data)
    }
        // Send an HTTP POST request to the specified URL
        fetch('https://localhost:7183/api/v2/orders', options)
        .then(response => response.json())
        .then(data => {
            if (data.checkoutUrl) {
              // If the response contains a 'checkoutUrl', redirect the user to that URL
              window.location.href = data.checkoutUrl;
            }
        })
        .catch(err => console.error(err));
    });
    // Render the survey component with the created survey object
    return (<Survey model={survey} />);
}

export default SurveyComponent;