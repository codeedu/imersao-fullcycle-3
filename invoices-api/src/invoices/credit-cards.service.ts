import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCreditCardDto } from './dto/create-credit-card.dto';
import { CreditCard } from './entities/credit-card.entity';

@Injectable()
export class CreditCardsService {
  constructor(
    @InjectRepository(CreditCard)
    private creditCardRepo: Repository<CreditCard>,
  ) {}
  create(createCreditCardDto: CreateCreditCardDto) {
    const creditCard = this.creditCardRepo.create(createCreditCardDto);
    return this.creditCardRepo.save(creditCard);
  }

  findAll() {
    return this.creditCardRepo.find();
  }

  findOne(id: string) {
    return `This action returns a #${id} credit-card`;
  }

  update(id: string, updateCreditCardDto) {
    return `This action updates a #${id} credit-card`;
  }

  remove(id: string) {
    return `This action removes a #${id} credit-card`;
  }
}
