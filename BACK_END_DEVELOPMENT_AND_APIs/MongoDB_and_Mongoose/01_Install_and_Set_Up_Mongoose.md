# Install and Set Up Mongoose

Working on these challenges will involve you writing your code using one of the following methods:

Clone [this GitHub repo](https://github.com/freeCodeCamp/boilerplate-mongomongoose/) and complete these challenges locally.  <br/>
Use [our Replit starter project](https://replit.com/github/freeCodeCamp/boilerplate-mongomongoose) to complete these challenges.  <br/>
Use a site builder of your choice to complete the project. Be sure to incorporate all the files from our GitHub repo.
If you use Replit, follow these steps to set up the project:

Start by importing the project on Replit.
Next, you will see a .replit window.
Select Use run command and click the Done button.
When you are done, make sure a working demo of your project is hosted somewhere public. Then submit the URL to it in the Solution Link field.

In this challenge, you will set up a MongoDB Atlas database and import the required packages to connect to it.

Follow this tutorial to set up a hosted database on MongoDB Atlas.

mongoose@^5.11.15 has been added to your project’s package.json file. First, require mongoose as mongoose in myApp.js. Next, create a .env file and add a MONGO_URI variable to it. Its value should be your MongoDB Atlas database URI. Be sure to surround the URI with single or double quotes, and remember that you can't use spaces around the = in environment variables. For example, MONGO_URI='VALUE'.

Note: If you are using Replit, you cannot create a .env file. Instead, use the built-in SECRETS tab to add the variable. Do not surround the values with quotes when using the SECRETS tab.

When you are done, connect to the database by calling the connect method within your myApp.js file by using the following syntax:

mongoose.connect(<Your URI>, { useNewUrlParser: true, useUnifiedTopology: true });

## Solution
