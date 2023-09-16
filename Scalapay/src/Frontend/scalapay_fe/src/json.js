export const json = {
  "showQuestionNumbers": "off",
  "questionErrorLocation": "bottom",
  "pages": [
    {
      "name": "page1",
      "elements": [
        {
          "type": "panel",
          "name": "personal-information",
          "title": "Personal Information",
          "state": "expanded",
          "elements": [
            {
              "type": "text",
              "name": "firstname",
              "title": "First Name",
              "isRequired": true,
              "maxLength": 25
            },
            {
              "type": "text",
              "name": "lastname",
              "title": "Last Name",
              "startWithNewLine": false,
              "isRequired": true,
              "maxLength": 25
            },
          ]
        },
        {
          "type": "panel",
          "name": "address-information",
          "title": "Address Information",
          "state": "expanded",
          "elements": [
            {
              "type": "text",
              "name": "address",
              "title": "Address Line 1",
              "isRequired": true,
            },
            {
              "type": "text",
              "name": "countrycode",
              "startWithNewLine": false,
              "title": "Country Code",
              "isRequired": true,
              "validators": [
                {
                  "type": "text",
                  "minLength": 2,
                  "maxLength": 2,
                  "text": "Please enter a 2-character country code."
                }
              ]
            },            
            {
              "type": "text",
              "name": "suburb",
              "title": "Suburb",
              "isRequired": true,
            },
            {
              "type": "text",
              "name": "zip",
              "startWithNewLine": false,
              "title": "Zip / Postal Code",
              "isRequired": true,
            },
          ]
        },
        {
          "type": "panel",
          "name": "item",
          "title": "Item",
          "state": "expanded",
          "elements": [
            {
              "type": "dropdown",
              "name": "category",
              "title": "Category:",
              "isRequired": true,
              "choices": [ "Tops", "Bottoms", "Outerwear"]
            },
            {
              "type": "dropdown",
              "name": "item_name",
              "title": "Name for Tops:",
              "isRequired": true,
              "choices": [ "T-shirts", "Blouses"],
              "startWithNewLine": false,
              "visibleIf": "{category} == 'Tops'"
            },
            {
              "type": "dropdown",
              "name": "item_name",
              "title": "Name for Bottoms:",
              "isRequired": true,
              "choices": [ "Jeans", "Shorts"],
              "startWithNewLine": false,
              "visibleIf": "{category} == 'Bottoms'" 
            },
            {
              "type": "dropdown",
              "name": "item_name",
              "title": "Name for Outerwear:",
              "isRequired": true,
              "choices": [ "Jackets", "Coats"],
              "startWithNewLine": false,
              "visibleIf": "{category} == 'Outerwear'" 
            },
            {
              "type": "text",
              "name": "cost",
              "inputType": "number",
              "title": "Item Cost:",
              "isRequired": true,
              "validators": [
                {
                  "type": "numeric",
                  "minValue": 1,
                  "text": "Please enter a positive number greater than 0."
                }
              ]
            },
            {
              "type": "text",
              "name": "quantity",
              "inputType": "number",
              "title": "Quantity:",
              "isRequired": true,
              "startWithNewLine": false,
              "validators": [
                {
                  "type": "numeric",
                  "minValue": 1,
                  "text": "Please enter a positive number greater than 0."
                }
              ]
              },
              {
                "type": "text",
                "name": "sku",
                "title": "SKU:",
                "readOnly": true,
                "isRequired": true,
                "visibleIf": "{item_name} notempty",
                "defaultValue": "38579246"
            },
            {
              "type": "expression",
              "name": "total",
              "title": "Total Item Cost:",
              "expression": "{cost} * {quantity}",
              "displayStyle": "currency",
              "currency": "EUR",
              "startWithNewLine": false
            }
          ]
        }
      ]
    }
  ]
};
