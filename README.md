<h1 align="center"> REST-Full API MakanDO </h1>
<h4 align="center"> Food Delivery APP </h4>

Note App is a simple Food Delivery application specially for backend only. Built with NodeJs using the ExpressJs Framework.
Express.js is a web application framework for Node.js. [More about Express](https://en.wikipedia.org/wiki/Express.js)

## Built With
[![Express.js](https://img.shields.io/badge/Express.js-4.x-orange.svg?style=rounded-square)](https://expressjs.com/en/starter/installing.html)
[![Node.js](https://img.shields.io/badge/Node.js-v.12.16-green.svg?style=rounded-square)](https://nodejs.org/)

## Requirements
1. <a href="https://nodejs.org/en/download/">Node Js</a>
2. Node_modules
3. <a href="https://www.getpostman.com/">Postman</a> (Optional)
4. Web Server (ex. localhost)

## How to run the app ?
1. Open app's directory in CMD or Terminal
2. Type `npm install`
3. Make new file a called **.env**, set up first [here](#set-up-env-file)
4. Turn on Web Server and MySQL can using Third-party tool like xampp, etc.
5. Open CMD or Terminal and Type `npm run-script migrate`
6. open application In Browser (ex: localhost:3000/api-docs)
8. You can see all the end point
8.  Note : create folder `Uploads`in app's directory for uploads file

## Set up .env file
Open .env file on your favorite code editor, and copy paste this code below :
```
DB_SERVER=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=db_MakanDo

APP_KEY=UIDWHDSHJDJF@IIU#IIUIJSHAHFUHUHFDHAIU@IUE@*$(*($)())
PORT=4000
APP_URL=localhost:4000
```

