# bim-javascript-functions
Serverless JavaScript Functions

## Getting Started

1. Open the command line
1. Clone this repo: `git clone https://github.com/believeinmeorg/bim-javascript-functions.git`
1. Open the cloned repo: `cd bim-javascript-functions`
1. Run: `npm install`
1. Run: `npm start`
   - This will simulate the serverless app running locally
   - You can test the example endpoint at `http://localhost:3000/dev/example`

## Adding an Endpoint

1. Create a new `.js` file in the `api/` directory (e.g. `someFile.js`)
1. Create an async function in the new file
    ```js
    exports.yourFuncName = async function(req, res) {
      someData = {};

      res.send(someData);
    }
    ```
1. Add an import to the `index.js` file
    ```js
    import someFile = require('./api/someFile');
    ```
1. Add the route for the new endpoint in the `index.js` file
    ```js
    app.get('/yourRoute', someFile.yourFuncName)
    ```