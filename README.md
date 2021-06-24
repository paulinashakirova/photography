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

- Run `npm run migrate` in the project folder of this repository, in a new terminal window. This will create three tables called 'topic', 'photo' and 'cart_items' in your database.

- Make sure you understand how the `topic` table is constructed. In your MySQL console, you can run `use photography;` and then `describe topic;` to see the structure of the topic table.

### Development

- Run `npm start` in project directory to start the Express server on port 5000
- In another terminal, do `cd client` and run `npm start` to start the client in development mode with hot reloading in port 3000.

## Basic Requirements

Create a webpage with the following functionality:

- [ ] A catalog of photos organized for topics (landscapes, portraits, travels, culture, flora, fauna, etc.).
- [ ] A form to add new topics. There should be fields to input the theme and description of the topic, and a URL of the photo that will represent the theme.
- [ ] A form to add new photos on each topic. There should be fields to input the title and description, separately, a list of topics to chose where to add the new photo and an input for the URL of the new photo.
  - After submitting the form, the new topic/photo should be added to the database and displayed on a user view.
- [ ] Each photo can be deleted with a delete button/icon. After clicking on this button, photo should be deleted from the database and the updated list of photos shown on the user view.
- [BONUS ] Each photo can be added to a shopping cart with an add button/icon. After clicking on this button, photo should be added to a cart, showing title and price.
  If there are some selected photos, these should add up prices and show a total.
- [ ] Style the app to make it look as polished as possible. Bootstrap is already loaded in the index.html file, so you can use it if you want to.

To accomplish this, you will need to:

- [ ] Finish the routes in the API server (`/routes/users.js`).
- [ ] Finish the front end (`/client/src/`). Create as many components as you need.

## Tips

Suggested Process:

1. Try and write the correct query in `mysql`.
1. Use that query to finish the endpoints in `/routes/topics.js and /routes/photos.js`.
1. Test your endpoints using Postman.
1. Call the endpoints from the front end.

_This is a student project that was created at [CodeOp](http://codeop.tech), a full stack development bootcamp in Barcelona._
