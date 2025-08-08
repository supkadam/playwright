import {Page, expect} from '@playwright/test';

export class CheckoutPage{

    // Declare class variables
    private page:Page;
    private addtoCartIcon:string;
    private checkoutButton:string;
    private firstName:string;
    private lastName:string;
    private postalCode:string;
    private continueBtn:string;
    private finishBtn:string;
    private orderConfirmation:string;

    // Initialize element locators/xpath in constructor
    constructor(page:Page){
        this.page = page;
        this.addtoCartIcon = '.shopping_cart_link';
        this.checkoutButton = '.btn_action.checkout_button';
        this.firstName = '#first-name';
        this.lastName = '#last-name';
        this.postalCode = '#postal-code';
        this.continueBtn = '.btn_primary.cart_button';
        this.finishBtn = '.btn_action.cart_button';
        this.orderConfirmation = '#checkout_complete_container';
    }

    // Checkout the items in the cart
    async checkoutCart(firstname:string, lastname:string, pincode:string){
        await this.page.locator(this.addtoCartIcon).click();
        await this.page.locator(this.checkoutButton).click();
        await this.page.locator(this.firstName).fill(firstname);
        await this.page.locator(this.lastName).fill(lastname);
        await this.page.locator(this.postalCode).fill(pincode);
        await this.page.locator(this.continueBtn).click();
        await this.page.locator(this.finishBtn).click();
    }

    // Verify that order is placed successfully
    async verifyOrderPlaced(){
        const confirmationDiv = this.page.locator(this.orderConfirmation);
        await expect(confirmationDiv).toBeVisible();
    }
}