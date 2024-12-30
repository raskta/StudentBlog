import express from 'express';
import routes from './shared/routes/routes';
import AppDataSource from './config/data-source';
import { errorHandler } from './middleware/errorHandler.middleware';

const app = express();

app.use(express.json());

app.use(routes);

app.use(errorHandler as unknown as express.ErrorRequestHandler);

const port = process.env.PORT || 3000;

AppDataSource.initialize().then(() => {console.log('Database connected')}).catch((err: any) => {console.log(err)});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);                                                    
});

