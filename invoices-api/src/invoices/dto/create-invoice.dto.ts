import { Type } from 'class-transformer';
import {
  IsISO8601,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';
import { Exists } from 'src/validators/exists.rule';
import { CreditCard } from '../entities/credit-card.entity';

export class CreateInvoiceDto {
  @Exists(CreditCard, 'number')
  @IsString()
  @IsNotEmpty()
  credit_card_number: string;

  @Min(0)
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsISO8601()
  @IsNotEmpty()
  payment_date: Date;

  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  store: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}

export class KafkaCreateInvoiceDto {
  @Type(() => CreateInvoiceDto)  
  @ValidateNested()  
  @IsObject()  
  @IsNotEmpty()
  value: CreateInvoiceDto;
}
