import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsInt,
  IsNotEmpty,
  IsObject,
  IsString,
  IsUUID,
  MaxLength,
  Min,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Product } from 'src/products/entities/product.entity';
import { Exists } from 'src/validators/exists.rule';
import { MinCallback } from 'src/validators/min-callback.rule';

class CreditCardDto {
  @MaxLength(16)
  @MinLength(16)
  @IsString()
  @IsNotEmpty()
  number: string;

  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  name: string;

  @MinCallback(() => new Date().getMonth() + 1)
  @IsInt()
  @IsNotEmpty()
  expiration_month: number; //vazio, inteiro, new Date()

  @MinCallback(() => new Date().getFullYear())
  @IsInt()
  @IsNotEmpty()
  expiration_year: number;

  @MaxLength(4)
  @IsString()
  @IsNotEmpty()
  cvv: string;
}

class OrderItemDto {
  @Min(1)
  @IsInt()
  @IsNotEmpty()
  quantity: number;

  @Exists(Product)
  @IsUUID('4')
  @IsString()
  @IsNotEmpty()
  product_id: string;
}

export class CreateOrderDto {
  @Type(() => CreditCardDto)
  @ValidateNested()
  @IsObject()
  @IsNotEmpty()
  credit_card: CreditCardDto;

  @Type(() => OrderItemDto)
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @IsArray()
  @IsNotEmpty()
  items: OrderItemDto[];
}
