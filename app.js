if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
};
require('express-async-errors');

const Express = require('express');
const connectDB = require('./db/connect');
const methodOverride = require('method-override');

const notFound = require('./middlewares/not-found');
const errorHandlerMiddleware = require('./middlewares/error-handler');
const productsRouter = require('./routes/products');


const app = new Express();

app.set('view engine', 'ejs');
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.get('/', (req, res) => {
  res.status(200).render('index');
})
app.get('/about', (req, res) => {
  res.status(200).render('about');
})
app.use('/products', productsRouter);
app.use(notFound);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    })
  } catch(error) {
    console.log(error)
  }
};

start();
