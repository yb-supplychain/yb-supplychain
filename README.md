# yb-supplychain
YB Supply Chain Application for placing and tracking your good herb shipments

## Start the app
Make sure you have yarn installed on your system

```
npm install -g yarn
```

Clone this repo into your system then cd into the project and install dependencies.

```
cd /path/to/project
yarn install
```

To be able to access the Factom Apollo API, create a file `secrets.env`
in your project directory and copy your API key there. **IMPORTANT** DO NOT
CHECK THIS INTO VERSION CONTROL.

Then to run the app server and API server, simply run

```
yarn start
```

The react app server will route api calls to the api server. The `api` endpoint will
query the Factom blockchain when necessary.
