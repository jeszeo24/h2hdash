# Heart2Heart Dash App

A MVP from CodeOp's Full-Stack program, leveraging off front-end technologies such as React and React Router, along with CSS and Bootstrap for design. Back-end technologies of Node.js and Express were used, to connect client to server/database. Additional technologies used include Postman to test routes and MySQL for database creation. 

The purpose of the app is to facilitate long distance friendships/relationships - enabling groups of friends/couples to view at a glance the time and weather in their respective cities/countries. A notes component allows individuals to leave notes/thoughts for each other, while the photo carousel explains itself well enough. Finally you have the LuckGame component which is just a fun feature that displays a country at random upon being played - perhaps suggesting to said group of friends/couples where they should reunite next.

![Problem & Solution Slide](support/problem_solution.png)
![User Flow](support/user_flow.png)

## Setup

### Dependencies

Run `npm run install` in the project folder to install dependencies related to Express (the server).

There are additional node packages installed for purpose of both functionality and design. Please install them for optimal performance as listed below:
- Run `npm install react-icons` in the project folder to install the react icon package which will provide the icons used within the app

`cd client` and run `npm run install` install dependencies related to React (the client).

### Database Prep

- Access the MySQL interface in your terminal by running `mysql -u root -p`
- Create a new database called h2hdash: `create database h2hdash`
- Add a `.env` file to the project folder of this repository containing the MySQL authentication information for MySQL user. For example:

```bash
  DB_HOST=localhost
  DB_NAME=h2hdash
  DB_USER=root
  DB_PASS=YOURPASSWORD
```
- Run `npm run migrate` in the project folder of this repository, in a new terminal window. This will create a table called "notes" and "files" in your database.

- In your MySQL console, running `SHOW DATABASES;` will show you all available databases in your MySQL. 
  - Select the relevant database by running `USE h2hdash;`. 
  - Running `DESCRIBE notes;` in your MySQL console will allow you to see the structure of the notes table. 
    - Running `SELECT * FROM notes;` in your MySQL console will show you any available notes in table (note that init_db.sql in the model folder will have inserted placeholder data)
  - You can also run `describe files;` in your MySQL console to see the structure of the files table. 
    - Running `SELECT * FROM files;` in your MySQL console will show you any available files in the table (note in this case, no placeholder data)
  As an additional reference, see Database Schema below.
    - Notes and files database are not related/linked.
    
![Database Schema](support/database_schema.png)
![API routes](support/api_routes.png)

### Run Your Development Servers

- Run `npm start` in project directory to start the Express server on port 5000
- In another terminal, do `cd client` and run `npm start` to start the client in development mode with hot reloading in port 3000.
- You can test your client app in `http://localhost:3000`
- You can test your API in `http://localhost:5000/notes` (only notes has placeholder data)

## Notes

For the powerpoint presentation: `https://docs.google.com/presentation/d/1y_rAeFDhkDqVLgP6kRaHsAGazoeSCtTsTjWnncQQ7Zc/edit?usp=sharing`

Please find below a few additional notes:


4.) For TravelAdvisory.js (Travel Advisoriy page), the API searches based off ISO Country Alpha-2 codes `https://www.iban.com/country-codes`
No API key is necessary.

_This is a student project that was created at [CodeOp](http://CodeOp.tech), a full stack development bootcamp in Barcelona._