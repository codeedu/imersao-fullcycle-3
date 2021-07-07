import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { CreditCard } from './entities/credit-card.entity';
import { Invoice } from './entities/invoice.entity';

@Injectable()
export class InvoicesService {
  constructor(
    @InjectRepository(Invoice)
    private invoiceRepo: Repository<Invoice>,
    @InjectRepository(CreditCard)
    private creditCardRepo: Repository<CreditCard>,
  ) {}

  async create(createInvoiceDto: CreateInvoiceDto) {
    const { credit_card_number, ...data } = createInvoiceDto;
    const creditCard = await this.creditCardRepo.findOneOrFail({
      where: { number: credit_card_number },
    });
    const invoice = this.invoiceRepo.create({
      ...data,
      credit_card_id: creditCard.id,
    });
    return this.invoiceRepo.save(invoice);
  }

  findAll(creditCardNumber?: string) {
    let query = this.invoiceRepo
      .createQueryBuilder('invoice')
      .select(['invoice.*']);

    if (creditCardNumber) {
      query = query
        .leftJoin('invoice.credit_card', 'credit_card')
        .andWhere('credit_card.number = :creditCardNumber', {
          creditCardNumber,
        });
    }

    return query.execute();
  }
}
