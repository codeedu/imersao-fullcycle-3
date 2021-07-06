import { Controller, Get, Param, ValidationPipe } from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { KafkaCreateInvoiceDto } from './dto/create-invoice.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('credit-cards/:creditCardNumber/invoices')
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}

  @MessagePattern('transactions')
  create(@Payload(new ValidationPipe()) message: KafkaCreateInvoiceDto) {
    return this.invoicesService.create(message.value);
  }

  @Get()
  findAll(@Param('creditCardNumber') creditCardNumber: string) {
    return this.invoicesService.findAll(creditCardNumber);
  }
}
