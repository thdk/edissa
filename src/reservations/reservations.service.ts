import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { CreateReservationDto, UpdateReservationDto } from './dto';
import { Reservation } from './entities';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectRepository(Reservation)
    private merchantRepository: Repository<Reservation>,
  ) {}
  create(createMerchantDto: CreateReservationDto): Promise<Reservation> {
    return this.merchantRepository.save(createMerchantDto);
  }

  findAll(): Promise<Reservation[]> {
    return this.merchantRepository.find();
  }

  findOne(id: string): Promise<Reservation | null> {
    return this.merchantRepository.findOneBy({ id });
  }

  update(
    id: string,
    updateMerchantDto: UpdateReservationDto,
  ): Promise<UpdateResult> {
    return this.merchantRepository.update(id, updateMerchantDto);
  }

  remove(id: string): Promise<DeleteResult> {
    return this.merchantRepository.delete(id);
  }
}
