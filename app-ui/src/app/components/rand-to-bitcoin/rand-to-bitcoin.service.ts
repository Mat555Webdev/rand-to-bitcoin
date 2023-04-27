import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, firstValueFrom } from 'rxjs';
import { BitcoinToRandExchangeRates } from 'src/app/models/bitcoin-to-rand-exchange-rates';

@Injectable({
  providedIn: 'root',
})
export class RandToBitcoinService {
  private readonly _endpoint: string = 'http://localhost:3000/exchange-rates/get-bitcoin-to-rand';
  //behaviour subject used to retain the exchange rates
  private readonly _randToBitcoinExchangeRatesSubject =
    new BehaviorSubject<BitcoinToRandExchangeRates | null>(null);

  constructor(private httpClient: HttpClient) {
    this.fetchRandToBitcoinExchangeRates();
  }

  public get randToBitcoinExchangeRates$(): Observable<BitcoinToRandExchangeRates | null> {
    return this._randToBitcoinExchangeRatesSubject.asObservable();
  }

  private get randToBitcoinExchangeRates(): BitcoinToRandExchangeRates | null {
    return this._randToBitcoinExchangeRatesSubject.getValue();
  }

  public async fetchRandToBitcoinExchangeRates(): Promise<void> {
    const result = await firstValueFrom(
      this.httpClient.get<BitcoinToRandExchangeRates>(`${this._endpoint}`).pipe(
        catchError((err) => {
          throw `${err}, Failed to fetch exchange rates from coin base api`;
        })
      )
    );

    this._randToBitcoinExchangeRatesSubject.next(result);
  }

  //method invoked when a user changes the rand input
  public calculateBitCoinValueOfRand(randValue: number): number | null {
    if(this.randToBitcoinExchangeRates){
      var result = randValue * this.randToBitcoinExchangeRates.oneRandConvertedToBitcoin;

      return result;
    }

    return null;
  }
}
