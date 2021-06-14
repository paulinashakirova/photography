# karenina-photography

## Setup

### Dependencies

- Run `npm install` in project directory. This will install server-related dependencies such as `express`.
- `cd client` and run `npm install`. This will install client dependencies (React).

### Database Prep

- Access the MySQL interface in your terminal by running `mysql -u root -p`
- Create a new database called photography: `create database photography`
- Add a `.env` file to the project folder of this repository containing the MySQL authentication information for MySQL user. For example:

```bash
  DB_HOST=localhost
  DB_USER=root
  DB_NAME=photography
  DB_PASS=YOURPASSWORD
```

- Run `npm run migrate` in the project folder of this repository, in a new terminal window. This will create a table called 'topics' in your database.

- Make sure you understand how the `topics` table is constructed. In your MySQL console, you can run `use photography;` and then `describe topics;` to see the structure of the students table.

### Development

- Run `npm start` in project directory to start the Express server on port 5000
- In another terminal, do `cd client` and run `npm start` to start the client in development mode with hot reloading in port 3000.

## Basic Requirements

Create a webpage with the following functionality:

- [ ] A catalog of photos organized for topics (landscapes, portraits, travels, culture).
- [ ] A form to add new photos on each field. There should be fields to input the title and description, separately, and a list of topics to chose where to add the new photo.
  - After submitting the form, the new photo should be added to the database and displayed on the page.
- [ ] Each photo can be deleted with a delete button7icon. After clicking on this button, photo should be deleted from the database and the updated list of photos shown on the page
- [ ] Style the app to make it look as polished as possible. Bootstrap is already loaded in the index.html file, so you can use it if you want to.
- [ ] Clicking on a photo should show the photo's title, and a short description at the top of the catalog. The info to display this featured photo should be obtained from a fetch request to `/topics/:field/:id`

To accomplish this, you will need to:

- [ ] Finish the routes in the API server (`/routes/students.js`).
- [ ] Finish the front end (`/client/src/`). Create as many components as you need.

## Guidelines

- Do not use any presentations from the class or any notes you have taken.
- Try to do the test **without looking at code you have previously written**. If you get stuck for more than 30min, you may look at your previous code - but make sure you let your instructor know.
- The only resources you may use online are:
  - [MDN docs](https://developer.mozilla.org/en-US/)
  - [Express docs](https://expressjs.com/en/api.html)
  - [MySQL docs](https://dev.mysql.com/doc/refman/8.0/en/database-use.html)
  - [React docs](https://reactjs.org/docs/hello-world.html)
- Make sure you give yourself a grade before turning it in!

## Tips

Suggested Process:

1. Try and write the correct query in `mysql`.
1. Use that query to finish the endpoints in `/routes/students.js`.
1. Test your endpoints using Postman.
1. Call the endpoints from the front end.
