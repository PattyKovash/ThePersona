## The Persona

Interview prep application leveraging the power of IBM Watson's tone and personality insights along with a "filler words" analysis to provide users with the best feedback to improve their interview skills.

## Team

  - Product Owner: Peter Wang
  - Scrum Master: David Inoa
  - Software Engineer: Travis Tillman
  - Software Engineer: Patty Kovash

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Create env File](#create-env-file)
1. [Contributing](#contributing)

## Usage

The Persona is an interview prep application providing insight on how you may be perceived during an interview. Users can practice mock interviews where they are administered randomly selected non-technical and technical interview questions. Questions are not shown ahead of time, simulating a real interview. The mock interviews are recorded to give users the opportunity to review their body language, presence, and answers. Mock interviews are also processed for tone and personality analysis powered by IBM Watson Analytics along with a "filler words" analysis. Users can utilize the analyses and videos to improve their communication skills and ace their job interview.

## Requirements

Dependencies

```
    "@uirouter/angularjs": "^1.0.14",
    "angular": "^1.6.3",
    "angular-animate": "^1.6.9",
    "angular-chart.js": "^1.1.1",
    "angular-mocks": "^1.6.2",
    "angular-ui-bootstrap": "^2.5.6",
    "bluebird": "^3.5.1",
    "body-parser": "^1.17.2",
    "chai-things": "^0.2.0",
    "chart.js": "^2.7.1",
    "cloudinary": "^1.9.1",
    "dotenv": "^5.0.0",
    "express": "^4.16.2",
    "express-sequelize-session": "^0.4.0",
    "express-session": "^1.15.6",
    "file-system": "^2.2.2",
    "fs": "0.0.1-security",
    "jquery": "^3.1.1",
    "jsonwebtoken": "^8.1.1",
    "karma-es6-shim": "^1.0.0",
    "karma-headless-chrome-launcher": "0.0.6",
    "karma-requirejs": "^1.1.0",
    "lodash": "^4.17.4",
    "mysql": "^2.13.0",
    "mysql2": "^1.5.1",
    "node-mocks-http": "^1.6.6",
    "passport": "^0.4.0",
    "passport-facebook": "^2.1.1",
    "passport-google-oauth": "^1.0.0",
    "path": "^0.12.7",
    "request": "^2.83.0",
    "requirejs": "^2.3.5",
    "sequelize": "^4.32.1",
    "server.js": "^1.0.0",
    "synaptic": "^1.1.4",
    "watson-developer-cloud": "^3.0.5"
```

Dev Dependencies

```
    "angular-mocks": "^1.6.2",
    "chai": "^4.1.2",
    "chai-http": "^3.0.0",
    "eslint": "^4.16.0",
    "eslint-config-airbnb-base": "^12.1.0",
    "eslint-plugin-import": "^2.8.0",
    "jasmine-core": "^2.99.1",
    "karma": "^1.5.0",
    "karma-chrome-launcher": "^2.0.0",
    "karma-jasmine": "^1.1.1",
    "karma-mocha": "^1.3.0",
    "karma-ng-html2js-preprocessor": "^1.0.0",
    "karma-phantomjs-launcher": "^1.0.4",
    "karma-phantomjs2-launcher": "v0.5.0",
    "mocha": "^5.0.0",
    "phantomjs-polyfill": "0.0.2",
    "phantomjs-prebuilt": "v2.1.4",
    "sinon": "1.17.7"
```

## Development

Once you have forked the repo from https://github.com/ThePersonaProject/ThePersona , install all the dependencies.

### Installing Dependencies

From within the root directory:

1) npm install
2) Create .env file (Follow steps below to set up .env file)
3) npm run server-dev

### Create env File

Inside the root folder, create a new file named ".env". Inside this file you will want to have to following:

`
WATSON_USERNAME='ENTER YOUR CREDENTIALS'
WATSON_PASSWORD='ENTER YOUR CREDENTIALS'
WATSON_URL='https://gateway.watsonplatform.net/tone-analyzer/api'
WATSON_PERSONALITY_USERNAME='ENTER YOUR CREDENTIALS'
WATSON_PERSONALITY_PASSWORD='ENTER YOUR CREDENTIALS'
WATSON_PERSONALITY_URL='https://gateway.watsonplatform.net/personality-insights/api'
CLIENT_SECRET='ENTER YOUR FACEBOOK CREDENTIALS'
CLIENT_ID='ENTER YOUR FACEBOOK CREDENTIALS'
googleSECRET='ENTER YOUR CREDENTIALS'
googleID='ENTER YOUR CREDENTIALS'
CLOUDINARY_CLOUD_NAME='ENTER YOUR CREDENTIALS'
CLOUDINARY_API_KEY='ENTER YOUR CREDENTIALS'
CLOUDINARY_API_SECRET='ENTER YOUR CREDENTIALS'
CLOUDINARY_URL=cloudinary:'ENTER YOUR CREDENTIALS'

## Getting the tokens for the API calls

**** NEED TO CHANGE

We use Yelp's API to collect the data, so you will need an API key for Yelp to make requests. There are links below to create your own API key.
* [Yelp API Key](https://www.yelp.com/fusion)

****

## Contributing & Acknowledgments

