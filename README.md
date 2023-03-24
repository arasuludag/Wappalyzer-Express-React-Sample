# Wappalyzer Node React Sample App

A React and Express application that can check the number of pages and technologies used by websites.

## Installation

`node`, `npm` and `tsx` should be installed globally.

`npm install` on **root** AND **client** folder are required to install dependencies.

## Usage

- Runing `npm run dev` on the **root** folder is enough to run the application. Express will run on port 5000 and React on 3000.
- Production code and commands hasn't been implemented.

## Testing

Front and back-end should be tested separately with `npm run test` on the root folder and the client folder.

## Issues

- Data is kept on the Redux store and is not persistent. (persistent when routing, non-persistent on page refresh) If there's a need to implement a database on the back-end, data structures, routing and Redux behavior should be tweaked accordingly.
- This implementation uses REST and assumes client will get a response back under 120 seconds. If this can be tricky with a huge number of users, Websockets can also be used.
