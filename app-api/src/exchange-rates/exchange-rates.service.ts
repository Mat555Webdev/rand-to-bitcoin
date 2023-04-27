import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { CoinBaseExchangeRatesResponse } from './models/coin-base-exchange-rates-response-dto';
import { BtcToRand } from './models/btc-to-rand';
import { SupportedCurrencies } from './enums/SupportedCurrencies';

@Injectable()
export class ExchangeRatesService {
  private readonly _exchangeRateEndpoint: string = 'https://api.coinbase.com/v2/exchange-rates';
  private readonly _defaultCurrency = 'ZAR';

  constructor(readonly httpService: HttpService) {};

  async oneBitcoinInRands(): Promise<BtcToRand> {
    const bitcoinExchangeRates = await this.fetchExchangeRatesFromCoinBaseApi(SupportedCurrencies.BTC);

    const result: BtcToRand = {
        bitcoinValue: 1,
        randValue: bitcoinExchangeRates.data.rates[SupportedCurrencies.ZAR]
    };

    return result;
  }

  async oneRandInBitcoin(): Promise<BtcToRand> {
    const bitcoinExchangeRates = await this.fetchExchangeRatesFromCoinBaseApi(SupportedCurrencies.ZAR);

    const result: BtcToRand = {
        bitcoinValue: bitcoinExchangeRates.data.rates[SupportedCurrencies.BTC],
        randValue: 1
    };

    return result;
  }

  //method configured to support any currency, ZAR set to default due to the scope of the requirements
  async fetchExchangeRatesFromCoinBaseApi(currency: string): Promise<CoinBaseExchangeRatesResponse> {
    const { data } = await firstValueFrom(
      this.httpService.get<CoinBaseExchangeRatesResponse>(`${this._exchangeRateEndpoint}?currency=${currency ?? this._defaultCurrency}`).pipe(
        catchError((error: AxiosError) => {
          throw 'Failed to fetch exchange rates from coin base api';
        }),
      ),
    );

    return data;
  }
}
