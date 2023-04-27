import { SupportedCurrencies } from "../enums/SupportedCurrencies";

export class CoinBaseExchangeRatesResponse {
    data: {
        currency: string;
        rates: Record<SupportedCurrencies, number>; 
    }
}