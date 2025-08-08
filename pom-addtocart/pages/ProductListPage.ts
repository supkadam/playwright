import {Locator, Page, expect} from '@playwright/test';

// Page Object Model class representing product listing page
export class ProductListPage{

    // Declare class variables
    private page:Page;
    private productList:string;
    private productTitle:string;
    private addToCartBtn:string;
    private cartCountLocator:string;
    private cartCount:string = '1';

    // Initialize element locators/x-path in constructor
    constructor(page:Page){
        this.page = page;
        this.productList = '//div[@class="inventory_item"]';
        this.productTitle = '//div[@class="inventory_item_name"]';
        this.addToCartBtn = '.btn_primary.btn_inventory';
        this.cartCountLocator = '.shopping_cart_badge';
    }

    // Add product to cart
    async addToCart(productName:string) {
        // Getting all products
        const products:Locator = this.page.locator(this.productList);
        const count:number = await products.count();
        for(let i=0; i<count; i++){
            const product = products.nth(i);
            const prodName = await product.locator(this.productTitle).textContent();
            if(prodName === productName){
                await product.locator(this.addToCartBtn).click();
                break;
            }
        }       
    }

    // Verify that product get added to the cart
    async verifyItemAddedToCart(){
        const count = await this.page.locator(this.cartCountLocator).textContent();
        expect(count).toBe(this.cartCount);
    }

}