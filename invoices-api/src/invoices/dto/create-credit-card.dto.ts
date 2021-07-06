import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { NotExists } from 'src/validators/not-exists.rule';
import { CreditCard } from '../entities/credit-card.entity';

export class CreateCreditCardDto {
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  name: string;

  @NotExists(CreditCard, 'number')
  @MaxLength(16)
  @MinLength(16)
  @IsString()
  @IsNotEmpty()
  number: string;
}
