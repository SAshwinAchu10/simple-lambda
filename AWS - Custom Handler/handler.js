"use strict";

const AWS = require('aws-sdk');
const UserService = require('./userService.js');
const uuidvalidator = require('uuid-validate');
const MainHeader = {
  "GET": listItems,
  "POST": createItem,
}
const SubHeader = {
  "DELETE": deleteItem,
  "GET": getItem,
  "PUT": putItem,
}
const params = {
  TableName: process.env.usersTableName,
};

let dynamoDb;
dynamoDb = new AWS.DynamoDB();
let userService = new UserService(dynamoDb, process.env.usersTableName);

module.exports.router = (event, context, callback) => {
  let handlers = (event["pathParameters"] == null) ? MainHeader : SubHeader;

  let httpMethod = event["httpMethod"];
  if (httpMethod in handlers) {
    return handlers[httpMethod](event, context, callback);
  }

  const response = {
    statusCode: 405,
    headers: {
      "Access-Control-Allow-Origin" : "*",
      "Access-Control-Allow-Credentials" : true
    },
    body: JSON.stringify({
      message: `Invalid HTTP Method: ${httpMethod}`
    }),
  };

  callback(null, response);
};


function createItem(event, context, callback) {
  let requestBody = JSON.parse(event.body);

  if(!requestBody.email) {
    return callback(null, {statusCode: 400, body: JSON.stringify({error: 'no email'})});
  }

  userService.createUser(requestBody).then(function (user) {

    callback(null, {statusCode: 201, body: JSON.stringify(user)});
  }).catch(function (error) {
    console.log('Error  ' + error);
    callback(error);
  });
};


function deleteItem(event, context, callback) {
  let requestBody = JSON.parse(event.body);

  if (!event.pathParameters.userId || !uuidvalidator(event.pathParameters.userId)) {

    return callback(null, {statusCode: 400, body: JSON.stringify({error: 'invalid'})});
  }

  userService.deleteUser(event.pathParameters.userId).then(function () {

    callback(null, {statusCode: 204});
  }).catch(function (error) {
    console.log('Error  ' + error);
    callback(error);
  });
};


function getItem(event, context, callback) {
  if (!event.pathParameters.userId || !uuidvalidator(event.pathParameters.userId)) {

    return callback(null, {statusCode: 400, body: JSON.stringify({error: 'invalid'})});
  }

  userService.getUser(event.pathParameters.userId).then(function (data) {

    if (!data || Object.keys(data).length === 0) {
      
      callback(null, {statusCode: 404, body: {message: 'not exist'}});
    } else {

      callback(null, {statusCode: 200, body: JSON.stringify(data)});
    }
  }).catch(function (error) {

    callback(JSON.stringify({error: error}));
  });
}

function putItem(event, context, callback) {
   if (!event.pathParameters.userId || !uuidvalidator(event.pathParameters.userId)) {

    return callback(null, {statusCode: 400, body: JSON.stringify({error: 'invalid'})});
  }

  let requestBody = JSON.parse(event.body);

  if(!requestBody.email) {
    return callback(null, {statusCode: 400, body: JSON.stringify({error: 'no email'})});
  }

  userService.updateUser(event.pathParameters.userId, requestBody).then(function () {

    callback(null, {statusCode: 204});
  }).catch(function (error) {
    console.log('Error ' + error);
    callback(error);
  });
};

function listItems(event, context, callback) {
 dynamoDb.scan(params, (error, result) => {
   if(error) {
    return callback(null, {statusCode: 400, body: JSON.stringify({error: 'no email'})});
  }
    const response = {
      statusCode: 200, headers: {
                        "Access-Control-Allow-Origin": "*", 
                        "Access-Control-Allow-Credentials": true
                    },
      body: JSON.stringify(result.Items),
    };
    callback(null, response);
  });
}