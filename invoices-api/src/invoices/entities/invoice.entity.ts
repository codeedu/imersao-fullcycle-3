import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CreditCard } from './credit-card.entity';
import { v4 as uuidv4 } from 'uuid';
import { Exclude } from 'class-transformer';

@Entity({ name: 'invoices' })
export class Invoice {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  amount: number;

  @Column()
  payment_date: Date;

  @Exclude()
  @Column()
  credit_card_id: string;

  @Column()
  transaction_id: string;

  @Column()
  store: string;

  @Column()
  description: string;

  @Exclude()
  @ManyToOne(() => CreditCard)
  @JoinColumn({
    name: 'credit_card_id',
  })
  credit_card: CreditCard;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @BeforeInsert() generateId() {
    if (this.id) {
      return;
    }
    this.id = uuidv4();
  }
}
