require('dotenv').config();
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TransactionsModule } from './transactions/transactions.module';
import { MongooseModule } from '@nestjs/mongoose';
const DB_NAME = process.env.DB_NAME;
const DB_PASS = process.env.DB_PASS;

@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb+srv://${DB_NAME}:${DB_PASS}@apicluster.eq1jrsa.mongodb.net/Teste_ApiContas`
      ),
    UsersModule, TransactionsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
