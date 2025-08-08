import {Page, expect} from '@playwright/test';

// Page Object Model class representing login functionality
export class LoginPage{

    // Declare class variables
    private page: Page;
    private usernameInput: string;
    private passwordInput: string;
    private loginButton: string;
    private productLabel: string;

    //Initialize element locators/x-path in constructor
    constructor(page:Page){
        this.page = page;
        this.usernameInput = '#user-name';
        this.passwordInput = '#password';
        this.loginButton = '#login-button';
        this.productLabel = '.product_label';
    }

    // Navigate to login/home page
    async gotoLoginPage(){
        await this.page.goto('https://www.saucedemo.com/v1/');
    }

    // login using provided username and password
    async login(username:string,password:string){
        await this.page.locator(this.usernameInput).fill(username);
        await this.page.locator(this.passwordInput).fill(password);
        await this.page.locator(this.loginButton).click();
    }

    // Verify successful user login
    async verifyLogin(){
        await expect(this.page.locator(this.productLabel)).toBeVisible();
    }
}


