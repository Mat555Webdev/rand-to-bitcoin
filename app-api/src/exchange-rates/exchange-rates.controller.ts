import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { ExchangeRatesService } from './exchange-rates.service';
import {Response} from 'express';

@Controller('exchange-rates')
export class ExhangeRatesController {
    
    constructor(readonly exchangeRatesService: ExchangeRatesService) { }

    @Get('bitcoin-to-rand')
    //TODO: create type for query
    public async GetBitCoinToRandRate(@Res() res: Response) {
        var result = await this.exchangeRatesService.oneBitcoinInRands();

        if(!result){
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
        }

        res.status(HttpStatus.OK).send(result);
    }

    @Get('rand-to-bitcoin')
    public async GetRandToBitCoinRate(@Res() res: Response) {
        var result = await this.exchangeRatesService.oneRandInBitcoin();

        if(!result){
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
        }

        res.status(HttpStatus.OK).send(result);
    }
}