import { Exclude, Expose } from 'class-transformer';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Exclude()
@Entity({ name: 'credit_cards' })
export class CreditCard {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Expose()
  @Column()
  number: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @BeforeInsert() generateId() {
    if (this.id) {
      return;
    }
    this.id = uuidv4();
  }
}
