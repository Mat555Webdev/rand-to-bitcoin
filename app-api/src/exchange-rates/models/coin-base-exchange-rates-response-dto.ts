export class CoinBaseExchangeRatesResponse {
    data: {
        currency: string;
        rates: Record<string, number>; 
    }
}