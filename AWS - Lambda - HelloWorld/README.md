Serverless - Hello World Application using AWS Lambda 

Download/Clone project
 
 Use following command
 
 ----   serverless deploy

Fresh Project:

Open empty folder:

Use the following commands to run the application 

----   npm install -g serverless 

----   serverless create -t aws-nodejs

----   serverless config credentials --provider aws --key "access key from aws" --secret "secret key from aws"

----   serverless deploy

stages :

----   serverless deploy --stage dev
----   serverless deploy --stage prod