## About The Codebase

This codebase is the **MVC API** for a nodejs test

## Technology Used

- NodeJS
- MongoDB
- Express

## Setup

To setup the app,

1. Clone the app to your local machine and run `npm install`
2. Provide local credentials for running the app the `config/dev.js`. To see a detailed list of all setup in `.env`, click [Providing ENV](#providing-env)
3. Then run `npm start`

## Folder Structure

```
node_test/
  .github
  node_modules/
  src/
    components
      user
        user.controller.js
        user.error.js
        user.model.js
        user.routes.js
        user.service.js
        user.validator.js
    config
      ci.js
      dev.js
      index.js
      prod.js
    library
      helpers
      middlewares
    app.js
    server.js
  .gitignore
  .travis.yml
  package.json
  README.md
```

The core of the app can be found in the `src` folder has illustrated above. Though the app does not implement microservice architecture at the moment, I have structured the app to make it easier to enable microservices in the future. To achieve this, I have broken down the contents in the `components` folder into modules. At the moment, there's just two modules which are the **users** module and the **todo** module. In the near future, I will be splitting the modules into microservices.

## Providing ENV

If you are deploying to production, you would need provide the following ENV variable on your server

```
PORT=4000
JWT_SECRET='yoursecret'
LOG_LEVEL='silly'
JWT_TOKEN_TYPE='Bearer'
API_PREFIX='/api/v1'
APP_NAME='node_test'
CLIENT_BASE_URL=''
MONGODB_URI='mongostring'
```

## How to contribute

You can start contributing to the codebase once you're done with your local setup.
