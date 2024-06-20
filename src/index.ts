import fs from 'fs'

import express, { Express } from 'express';
import cookies from "cookie-parser";

import { CS571Initializer } from '@cs571/su24-api-framework'
import { CS571SaleItemsRoute } from './routes/items';
import { SaleItem } from './model/sale-item';
import { CS571CheckoutRoute } from './routes/checkout';

console.log("Welcome to HW11!");

const app: Express = express();

app.use(cookies());

const appBundle = CS571Initializer.init(app, {
  allowNoAuth: [],
  skipAuth: false
});

const saleItems = JSON.parse(fs.readFileSync("includes/sale-items.json").toString()).map((good: SaleItem) => { return {...good, featured: false}})

appBundle.router.addRoutes([
  new CS571SaleItemsRoute(saleItems),
  new CS571CheckoutRoute(saleItems),
])

app.listen(appBundle.config.PORT, () => {
  console.log(`Running at :${appBundle.config.PORT}`);
});
