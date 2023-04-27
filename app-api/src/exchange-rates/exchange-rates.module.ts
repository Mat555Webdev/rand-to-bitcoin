import { Module } from '@nestjs/common';
import { ExhangeRatesController } from './exchange-rates.controller';
import { ExchangeRatesService } from './exchange-rates.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [ExhangeRatesController],
  providers: [ExchangeRatesService],
})
export class ExchangeRatesModule {}
