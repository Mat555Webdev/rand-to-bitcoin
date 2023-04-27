import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnDestroy } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { Observable, Subject, takeUntil } from 'rxjs';
import { BitcoinToRandExchangeRates } from 'src/app/models/bitcoin-to-rand-exchange-rates';
import { RandToBitcoinService } from './rand-to-bitcoin.service';
import { ConvertToTwoDecimalPipe } from 'src/app/pipes/convert-to-two-decimal.pipe';

@Component({
  selector: 'app-rand-to-bitcoin',
  templateUrl: './rand-to-bitcoin.component.html',
  styleUrls: ['./rand-to-bitcoin.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    MatInputModule,
    ReactiveFormsModule,
    ConvertToTwoDecimalPipe
  ],
  providers: [RandToBitcoinService],
})
export class RandToBitcoinComponent implements OnDestroy {
  public randInputControl: FormControl<number> = new FormControl(0, {
    nonNullable: true,
  });
  public bitcoinControl: FormControl<number> = new FormControl(0, {
    nonNullable: true,
  });
  public randToBitcoinExchangeRates$: Observable<BitcoinToRandExchangeRates | null> =
    this.randToBitCoinService.randToBitcoinExchangeRates$;

  private _subscribeUntilSubject: Subject<boolean> = new Subject();

  constructor(readonly randToBitCoinService: RandToBitcoinService) {
    this.registerControlSubscriptions();
    this.disableBitcoinControl();
  }

  disableBitcoinControl() {
    this.bitcoinControl.disable();
  }

  ngOnDestroy(): void {
    //ensure subscriptions are closed to avoid memory leaks
    this._subscribeUntilSubject.next(true);
    this._subscribeUntilSubject.complete();
  }

  public clearRandInputControl(): void {
    this.randInputControl.patchValue(0);
  }

  private registerControlSubscriptions() {
    this.subscribeToRandInputControl();
  }
  //monitors for changes on the rand control (user input) then calculates the bitcoin value
  private subscribeToRandInputControl() {
    this.randInputControl.valueChanges
      .pipe(takeUntil(this._subscribeUntilSubject))
      .subscribe((randInput) => {
        if(!randInput || randInput === 0){
          this.bitcoinControl.patchValue(0);
          return;
        }
        
        var valueInBitcoin = this.randToBitCoinService.calculateBitCoinValueOfRand(randInput);

        if(valueInBitcoin)
          this.bitcoinControl.patchValue(valueInBitcoin);
      });
  }
}
