import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateMerchantDto } from './dto/create-merchant.dto';
import { UpdateMerchantDto } from './dto/update-merchant.dto';
import { Merchant } from './entities/merchant.entity';

@Injectable()
export class MerchantsService {
  constructor(
    @InjectRepository(Merchant)
    private merchantRepository: Repository<Merchant>,
  ) {}
  create(createMerchantDto: CreateMerchantDto): Promise<Merchant> {
    return this.merchantRepository.save(createMerchantDto);
  }

  findAll(): Promise<Merchant[]> {
    return this.merchantRepository.find();
  }

  findOne(id: string): Promise<Merchant | null> {
    return this.merchantRepository.findOneBy({ id });
  }

  update(
    id: string,
    updateMerchantDto: UpdateMerchantDto,
  ): Promise<UpdateResult> {
    return this.merchantRepository.update(id, updateMerchantDto);
  }

  remove(id: string): Promise<DeleteResult> {
    return this.merchantRepository.delete(id);
  }
}
