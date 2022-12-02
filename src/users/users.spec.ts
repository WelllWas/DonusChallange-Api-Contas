import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

const userEntitiesList: User[] = [
  new User({ name: 'Well', cpf: '3551321', balance: 1213 }),
  new User({ name: 'John', cpf: '351321', balance: 10356 }),
  new User({ name: 'Arthur', cpf: '984351', balance: 13546 })
]

const newUserEntity = new User({ name: "Well", cpf: "4163513", balance: 1000 })

const updatedUserEntity = new User({name: "Well2", cpf:"123456", balance: 10000})

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            create: jest.fn().mockResolvedValue(newUserEntity),
            findAll: jest.fn().mockResolvedValue(userEntitiesList),
            findOne: jest.fn().mockResolvedValue(userEntitiesList[0]),
            update: jest.fn().mockResolvedValue(updatedUserEntity),
            remove: jest.fn().mockResolvedValue(undefined)
          }
        }
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    it('should return a list of users', async () => {
      //Act
      const result = await controller.findAll();
      //Assert
      expect(result).toEqual(userEntitiesList);
      expect(service.findAll).toHaveBeenCalledTimes(1);
    })

    it('should throw an exception', () => {
      //Act
      jest.spyOn(service, 'findAll').mockRejectedValueOnce(new Error());
      //Assert
      expect(controller.findAll()).rejects.toThrowError()
    })
  })

  describe('getOne', ()=>{
    it('should return a single user', async ()=>{
      //Act
      const result = await controller.findOne('1')
      //Assert
      expect(result).toEqual(userEntitiesList[0]);
      expect(service.findOne).toHaveBeenCalledTimes(1);
    })

    it('should throw an exception', () => {
      //Act
      jest.spyOn(service, 'findOne').mockRejectedValueOnce(new Error());
      //Assert
      expect(controller.findOne('1')).rejects.toThrowError()
    })
  })

  describe('create', () => {
    it('should create a new user', async () => {
      //Arrange
      const body: CreateUserDto = {
        name: "Well",
        cpf: "4163513",
        balance: 1000
      }
      //Act
      const result = await controller.create(body)
      // Assert
      expect(result).toEqual(newUserEntity);
      expect(service.create).toHaveBeenCalledTimes(1);
    })

    it('should throw an exception', () => {
      //Arrange
      const body: CreateUserDto = {
        name: "Well",
        cpf: "4163513",
        balance: 1000
      }
      //Act
      jest.spyOn(service, 'create').mockRejectedValueOnce(new Error());
      //Assert
      expect(controller.create(body)).rejects.toThrowError()
    })
  })

  describe('update', ()=> {
    it('should update a user successfully', async ()=>{
      //Arrange
      const body: UpdateUserDto = {
        name: "Well2",
        cpf: "123456",
        balance: 10000
      }
      //Act
      const result = await controller.update('1', body)

      //Assert
      expect(result).toEqual(updatedUserEntity);
      expect(service.update).toHaveBeenCalledTimes(1)
    })

    it('should throw an exception', () => {
      //Arrange
      const body: UpdateUserDto = {
        name: "Well",
        cpf: "4163513",
        balance: 1000
      }
      //Act
      jest.spyOn(service, 'update').mockRejectedValueOnce(new Error());
      //Assert
      expect(controller.update('1',body)).rejects.toThrowError()
    })
  })

  describe('delete', ()=> {
    it('should delete a user', async()=> {
      //Act
      const result = await controller.remove('1');
      //Assert
      expect(result).toBeUndefined();
      expect(service.remove).toHaveBeenCalledTimes(1);
    })

    it('should throw an exception', () => {
      //Act
      jest.spyOn(service, 'remove').mockRejectedValueOnce(new Error());
      //Assert
      expect(controller.remove('1')).rejects.toThrowError()
    })
  })

});
