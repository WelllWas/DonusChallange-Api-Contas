import { Test, TestingModule } from '@nestjs/testing';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import { Transaction } from "./entities/transaction.entity"
import { Deposit } from "./entities/deposit.entity"
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { DepositTransactionDto } from './dto/deposit-transaction.dto';

const newTransacEntity = new Transaction({ senderCpf: "123456", receiverCpf: "654321", value: 1000 })
const newDepositEntity = new Deposit({ cpf: "123456", value: 1000 })

describe('TransactionsController', () => {
  let controller: TransactionsController;
  let service: TransactionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionsController],
      providers: [
        {
          provide: TransactionsService,
          useValue: {
            transfer: jest.fn().mockResolvedValue(newTransacEntity),
            deposit: jest.fn().mockResolvedValue(newDepositEntity)
          }
        }
      ],
    }).compile();

    controller = module.get<TransactionsController>(TransactionsController);
    service = module.get<TransactionsService>(TransactionsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('transfer', ()=> {
    it('should transfer the value successfully', async ()=> {
      //Arrange
      const body: CreateTransactionDto ={
        senderCpf: "123456",
        receiverCpf: "654321",
        value: 1000
      }
      //Act
      const result = await controller.transfer(body)

      //Assert
      expect(result).toEqual(newTransacEntity);
      expect(service.transfer).toHaveBeenCalledTimes(1)
    })

    it('should throw an exception', () => {
      //Arrange
      const body: CreateTransactionDto ={
        senderCpf: "123456",
        receiverCpf: "654321",
        value: 1000
      }
      //Act
      jest.spyOn(service, 'transfer').mockRejectedValueOnce(new Error());
      //Assert
      expect(controller.transfer(body)).rejects.toThrowError()
    })
  })

  describe('deposit', () => {
    it('should deposit the value on user account successfully', async ()=>{
      //Arrange
      const body: DepositTransactionDto ={
        cpf: "123456",
        value: 1000
      }
      //Act
      const response = await controller.deposit(body);
      //Assert
      expect(response).toEqual(newDepositEntity)
      expect(service.deposit).toHaveBeenCalledTimes(1)
    })

    it('should throw an exception', () => {
      //Arrange
      const body: DepositTransactionDto ={
        cpf: "123456",
        value: 1000
      }
      //Act
      jest.spyOn(service, 'deposit').mockRejectedValueOnce(new Error());
      //Assert
      expect(controller.deposit(body)).rejects.toThrowError()
    })
  })

});
