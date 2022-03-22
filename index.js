const express = require('express');
const errorMiddleware = require('./middlewares/errorMiddleware');
const userController = require('./controllers/userController');

const app = express();
app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/user', userController);
app.use(errorMiddleware);

app.listen(3000, () => console.log('ouvindo porta 3000!'));