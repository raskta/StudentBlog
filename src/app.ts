import express from 'express';
import routes from './utils/routes/routes';
import AppDataSource from './config/data-source';

const app = express();

app.use(express.json());
app.use(routes);

const port = process.env.PORT || 3000;

AppDataSource.initialize().then(() => {console.log('Database connected')}).catch((err) => {console.log(err)});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);                                                    
});

