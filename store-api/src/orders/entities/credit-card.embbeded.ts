import { Exclude, Expose } from 'class-transformer';
import { Column } from 'typeorm';

export class CreditCard {
  @Exclude()
  @Column({ name: 'credit_card_number' })
  number: string;

  @Exclude()
  @Column({ name: 'credit_card_name' })
  name: string;

  @Column({ name: 'credit_card_expiration_month' })
  expiration_month: number;

  @Column({ name: 'credit_card_expiration_year' })
  expiration_year: number;

  @Exclude()
  @Column({ name: 'credit_card_cvv' })
  cvv: string;

  @Expose({ name: 'number' })
  maskedNumber() {
    return '************' + this.number.substr(-4);
  }
}
