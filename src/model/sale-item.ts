export class SaleItem {
    public readonly name: string;
    public readonly price: number;

    public constructor(name: string, price: number, featured?: boolean) {
        this.name = name;
        this.price = price;
    }
}