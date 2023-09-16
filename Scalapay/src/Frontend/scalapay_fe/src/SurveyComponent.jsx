import React from "react";
import { Model } from "survey-core";
import { Survey } from "survey-react-ui";
import "survey-core/defaultV2.min.css";
import { json } from "./json";
import { themeJson } from "./theme";

function SurveyComponent() {
    const survey = new Model(json);
    survey.applyTheme(themeJson);
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
        fetch('https://localhost:7183/api/v2/orders', options)
        .then(response => response.json())
        .then(data => {
            if (data.checkoutUrl) {
              // Chuyển hướng đến checkoutUrl
              window.location.href = data.checkoutUrl;
            }
        })
        .catch(err => console.error(err));
    });
    return (<Survey model={survey} />);
}

export default SurveyComponent;