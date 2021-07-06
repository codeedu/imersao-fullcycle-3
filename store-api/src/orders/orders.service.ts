import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/products/entities/product.entity';
import { Connection, In, Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order, OrderStatus } from './entities/order.entity';
import { PaymentService } from './payment/payment.service';
import { validate as uuidValidate } from 'uuid';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(Product) private productRepo: Repository<Product>,
    private paymentService: PaymentService,
    private connection: Connection,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const order = this.orderRepo.create(createOrderDto);

    const products = await this.productRepo.find({
      where: {
        id: In(order.items.map((item) => item.product_id)),
      },
    });

    order.items.forEach((item) => {
      const product = products.find(
        (product) => product.id === item.product_id,
      );
      item.price = product.price;
    });
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const newOrder = await queryRunner.manager.save(order);
      await this.paymentService.payment({
        creditCard: {
          name: order.credit_card.name,
          number: order.credit_card.number,
          expirationMonth: order.credit_card.expiration_month,
          expirationYear: order.credit_card.expiration_year,
          cvv: order.credit_card.cvv,
        },
        amount: order.total,
        store: process.env.STORE_NAME,
        description: `Produtos: ${products.map((p) => p.name).join(', ')}`,
      });
      await queryRunner.manager.update(
        Order,
        { id: newOrder.id },
        {
          status: OrderStatus.Approved,
        },
      );
      queryRunner.commitTransaction();
      return this.orderRepo.findOne(newOrder.id, { relations: ['items'] });
    } catch (e) {
      await queryRunner.rollbackTransaction();
      console.log(e.name);
      throw e;
    } finally {
      await queryRunner.release();
    }
  }

  async findAll() {
    const orders = await this.orderRepo.find();
    console.log(orders.length);
    return orders;
  }

  findOne(id: string) {
    return this.orderRepo.findOneOrFail(id, {
      relations: ['items', 'items.product'],
    });
  }

  update(id: string, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: string) {
    return `This action removes a #${id} order`;
  }
}
