const express = require('express');
const errorMiddleware = require('./middlewares/errorMiddleware');
const userController = require('./controllers/userController');
const loginController = require('./controllers/loginController');
const categoriesController = require('./controllers/categoriesController');
const blogPostController = require('./controllers/blogPostController');

const app = express();
app.use(express.json());

app.get('/', (request, response) => {
  response.send();
});

app.use('/user', userController);
app.use('/login', loginController);
app.use('/categories', categoriesController);
app.use('/post', blogPostController);

app.use(errorMiddleware);

app.listen(3000, () => console.log('ouvindo porta 3000!'));