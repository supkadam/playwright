import config from "../config.json";

/**
 * BaseUrl class provides the base URL for API or web page navigation.
 * The URL is loaded from the config.json file.
 * 
 * This class uses a static property, so you don't need to instantiate it.
 */
export class BaseUrl {
    static baseurl: string = config.baseurl;
}
