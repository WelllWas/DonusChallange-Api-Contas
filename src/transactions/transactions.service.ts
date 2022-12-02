import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { DepositTransactionDto } from './dto/deposit-transaction.dto';
import { User, UserDocument } from '../users/entities/user.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class TransactionsService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

  async transfer(createTransactionDto: CreateTransactionDto) {
    let response
    try {
      const sender = await this.userModel.findOne({ cpf: createTransactionDto.senderCpf })
      const receiver = await this.userModel.findOne({ cpf: createTransactionDto.receiverCpf })

      let valueSender = sender.balance - createTransactionDto.value;

      if (valueSender < 0) {
        return {
          statusCode: 401,
          body: "Sender has not enough balance to complete this transaction"
        }
      }

      const updateSender = { balance: valueSender }
      const updateReceiver = { balance: receiver.balance + createTransactionDto.value }

      await this.userModel.findOneAndUpdate({ cpf: sender.cpf }, updateSender)
      await this.userModel.findOneAndUpdate({ cpf: receiver.cpf }, updateReceiver)

      return {
        statusCode: 201,
        body: "Transaction successfully accomplished"
      }
    } catch (e) {
      return {
        statusCode: e.status || 502,
        body: e.message || "Internal Server Error"
      }
    }
  }

  async deposit(depositTransactionDto: DepositTransactionDto) {
    try {
      switch(true){
        case depositTransactionDto.value>2000:
          return{
            statusCode: 401,
            body: "Deposits over R$2000 aren't allowed for security reasons."
          }

        case depositTransactionDto.value<0:
          return{
            statusCode: 401,
            body: "Deposits under R$0 aren't allowed."
          }
      }

      const user = await this.userModel.findOne({ cpf: depositTransactionDto.cpf });

      const newBalance = user.balance + depositTransactionDto.value;

      const updatedBalance = { balance: newBalance };

      await this.userModel.findOneAndUpdate({ cpf: user.cpf }, updatedBalance);

      return{
        statusCode: 201,
        body: "Deposit successfully accomplished. New balance: R$" + newBalance
      }
    } catch (e) {
      return {
        statusCode: e.status || 502,
        body: e.message || "Internal Server Error"
      }
    }
  }
}
