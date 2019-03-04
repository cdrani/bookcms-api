# BookCMS API

Live: [bookcms-api](https://bookcms-api.herokuapp.com)

Users can sign up/in/out, add, delete, view, and edit books from the library 
as well as keep track of their current progress of through their books.

All of the above can be performed independent of the [frontend ui](https://github.com/cdrani/book-cms).

## Getting Started

These instructions will get you a copy of the project up and running on your
local machine for development and testing purposes using the MERN stack with
Express and MongoDB.  

* Apollo Server and Node.js as the backend server
* Heroku as database provider via SequelizeJs postgres dialect


### Prerequisites

This project runs on node and uses yarn.

### Installing

* Clone the repo
* cd into the folder
* Run `yarn` 

### Serve Project

Run the servers with the following command:

```
yarn start
```

Once its running, visit `http://localhost:8000` to interact with the api.

### Deploy on Heroku

You can deploy the project on [Heroku](https://www.heroku.com/) using the following steps:

1. Create a Heroku Account
2. On the terminal, run `heroku create` to create a new app
3. Run `git push heroku master` to start a deployment on Heroku.
4. Visit your project URL as assigned by Heroku (`heroku open`) to see a live deployment of the app.
