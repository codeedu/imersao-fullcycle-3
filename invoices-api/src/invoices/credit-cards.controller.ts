import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreditCardsService } from './credit-cards.service';
import { CreateCreditCardDto } from './dto/create-credit-card.dto';

@Controller('credit-cards')
export class CreditCardsController {
  constructor(private readonly creditCardService: CreditCardsService) {}

  @Post()
  create(@Body() createInvoiceDto: CreateCreditCardDto) {
    return this.creditCardService.create(createInvoiceDto);
  }

  @Get()
  findAll() {
    return this.creditCardService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.creditCardService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInvoiceDto) {
    return this.creditCardService.update(id, updateInvoiceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.creditCardService.remove(id);
  }
}
