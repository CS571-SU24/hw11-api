import { Express } from 'express';

import { CS571Route } from "@cs571/su24-api-framework/src/interfaces/route";
import { SaleItem } from '../model/sale-item';

export class CS571SaleItemsRoute implements CS571Route {

    public static readonly ROUTE_NAME: string = '/rest/su24/hw11/items';

    private readonly saleItems: SaleItem[];

    public constructor(saleItems: SaleItem[]) {
        this.saleItems = [...saleItems];
    }

    public addRoute(app: Express): void {
        app.get(CS571SaleItemsRoute.ROUTE_NAME, (req, res) => {
            res.status(200).set('Cache-control', 'public, max-age=30').send(this.saleItems);
        })
    }

    public getRouteName(): string {
        return CS571SaleItemsRoute.ROUTE_NAME;
    }
}