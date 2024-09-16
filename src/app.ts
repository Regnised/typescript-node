import express, { Request, Response, NextFunction } from 'express';
import { json } from 'body-parser';
import _ from './libs';
import { Product } from './product.model';
import 'reflect-metadata';
import { plainToClass, plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

import todoRoutes from './routes/todos';

const app = express();

app.use(json());
app.use('/todos', todoRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: err.message });
});

// CLASS validator
const products = [
  { title: '', price: 1 },
  { title: '22222', price: 10 },
];

const loadedProducts = plainToInstance(Product, products);

console.log(loadedProducts[0]);
const p1 = new Product('A book', 123);
for (const prod of loadedProducts) {
  validate(prod).then((errors) => {
    if (errors.length > 0) {
      console.log(errors);
    }
  });
  console.log(prod.getInformation());
}

// class validator

app.listen(3000);
