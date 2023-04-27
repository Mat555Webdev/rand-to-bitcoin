import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { ExchangeRatesService } from './exchange-rates.service';
import {Response} from 'express';

@Controller('exchange-rates')
export class ExhangeRatesController {
    
    constructor(readonly exchangeRatesService: ExchangeRatesService) { }

    @Get('get-bitcoin-to-rand')
    public async GetBitCoinToRandRate(@Res() res: Response) {
        var result = await this.exchangeRatesService.getBitcoinToRandExchangeRates();

        if(!result){
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
        }

        res.status(HttpStatus.OK).send(result);
    }
}