import db from "../../db";
import {Category, DBCategory, DBProduct, Product} from "../../client/src/types";
import ApiErrors from "../exceptions/api.errors";

export default class ProductService {

    static async getAllProducts(): Promise<Product[]> {
        const result = await db.query<DBProduct>(`SELECT * from products`)
        return this.serializeProducts(result.rows)
    }

    static async getById(id: number): Promise<Product> {
        const result = await db.query<DBProduct>(`SELECT * FROM products WHERE id = ${id}`)
        if (result.rows.length !== 1) {
            throw ApiErrors.BadRequest()
        }
        return await this.serializeProduct(result.rows[0])
    }

    static async getByIds(ids: number[]) {
        const queryPart = ids.map((id, index) =>
            index ? `OR id = ${id}`: `WHERE id = ${id}`
        ).join(' ')
        const result = await db.query(`SELECT * FROM products ${queryPart}`)
        return this.serializeProducts(result.rows)
    }

    static async getAllProductCategories(): Promise<DBCategory[]> {
        return (await db.query(`SELECT * FROM categories`)).rows
    }

    static async serializeProduct(dbProduct: DBProduct): Promise<Product> {
        const categories = await this.getAllProductCategories()
        const product = {...dbProduct}
        delete product.category_id
        return {...product, category: categories.find(category => category.id === dbProduct.category_id).type as Category }
    }

    static async serializeProducts(dbProducts: DBProduct[]): Promise<Product[]> {
        const categories = await this.getAllProductCategories()
        return dbProducts.map(product => {
            const productTmp = {...product, category_id: undefined}
            return {...productTmp, category: categories.find(category => category.id === product.category_id).type as Category }
        })
    }
}