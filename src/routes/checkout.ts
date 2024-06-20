import { Express } from 'express';

import { CS571Route } from "@cs571/su24-api-framework/src/interfaces/route";
import { v4 as uuidv4 } from 'uuid';
import { SaleItem } from '../model/sale-item';


export class CS571CheckoutRoute implements CS571Route {

    public static readonly ROUTE_NAME: string = '/rest/su24/hw11/checkout';

    private readonly saleItems: SaleItem[];


    public constructor(saleItems: SaleItem[]) {
        this.saleItems = saleItems;
    }

    public addRoute(app: Express): void {
        app.post(CS571CheckoutRoute.ROUTE_NAME, (req, res) => {
            let isValid = this.saleItems.map(i => i.name).every(n => {
                const field = req.body[n];
                return field !== undefined && field !== null && Number.isInteger(field) && parseInt(field) >= 0;
            })
            isValid = isValid && this.saleItems.reduce((acc: number, curr: SaleItem) => acc + req.body[curr.name], 0) > 0
            if (isValid) {
                res.status(200).send({
                    msg: "Successfully purchased!",
                    dt: Date.now(),
                    confirmationId: uuidv4()
                });
            } else {
                res.status(400).send({
                    msg: "The purchase was unsuccessful. Please refer to the documentation for details."
                });
            }
            
        })
    }

    public getRouteName(): string {
        return CS571CheckoutRoute.ROUTE_NAME;
    }
}