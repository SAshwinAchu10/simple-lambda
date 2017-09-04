'use strict';
const AWS = require('aws-sdk');
const UserService = require('./userService.js');
const uuidvalidator = require('uuid-validate');

let dynamoDb;
dynamoDb = new AWS.DynamoDB();
let userService = new UserService(dynamoDb, process.env.usersTableName);


module.exports.getUser = (event, context, callback) => {

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
};

module.exports.createUser = (event, context, callback) => {

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

module.exports.updateUser = (event, context, callback) => {

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

module.exports.deleteUser = (event, context, callback) => {

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



