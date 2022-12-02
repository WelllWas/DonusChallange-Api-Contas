import { Controller, Post, Body } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { DepositTransactionDto } from './dto/deposit-transaction.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('transactions')
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post('transfer')
  @ApiBody({type: CreateTransactionDto})
  async transfer(@Body() createTransactionDto: CreateTransactionDto) {
    const payload = await this.transactionsService.transfer(createTransactionDto);
    return payload
  }

  @Post('deposit')
  @ApiBody({type: DepositTransactionDto})
  async deposit(@Body() depositTransactionDto: DepositTransactionDto){
    const payload = await this.transactionsService.deposit(depositTransactionDto);
    return payload
  }
}
