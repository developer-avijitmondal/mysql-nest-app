import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UsersEntity } from './users.entity';
import { UsersDTO } from './users.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UsersEntity)
        private usersRepository: Repository<UsersEntity>,
    ) {}

    async showAll() {
        return await this.usersRepository.find();
    }

    async create(data: UsersDTO) {
        const user = this.usersRepository.create(data);
        await this.usersRepository.save(data);
        return user;
    }

    async update(id: number, data: UsersDTO) {
    //async update(id: number, data: UsersDTO): Promise<UsersDTO>  {
        // await this.usersRepository.update({ id }, data);
        // // return await this.usersRepository.findOne({ id });
        // return this.usersRepository.save(data);
        console.log(data);
        let photoToUpdate = await this.usersRepository.findOne(id);
        // photoToUpdate.name = "Me, my friends and polar bears";
        photoToUpdate.name = data.name;
        photoToUpdate.email = data.email;
        photoToUpdate.password = data.password;

        await this.usersRepository.save(photoToUpdate);
        return await this.usersRepository.findOne({ id });
        // const toUpdate = await this.usersRepository.findOne(id);
        // // const collection = await this.usersRepository.findOne(id)

        // let updated = Object.assign(toUpdate, data);
        
        // toUpdate.name = data.name
        // toUpdate.email = data.email
        // toUpdate.password = data.password
        
        // return await this.usersRepository.save(updated);
        // //return await toUpdate.save();

    }

    // async update(id: number, dto: UpdateUserDto): Promise<UserEntity> {
    //     let toUpdate = await this.userRepository.findOne(id);
    //     delete toUpdate.password;
    //     delete toUpdate.favorites;
    
    //     let updated = Object.assign(toUpdate, dto);
    //     return await this.userRepository.save(updated);
    // }
    
    // updateDog = async (id: string, dogDto: DogDto) => {
    //     return this.save({ ...dogDto, id: Number(id) });
    // };

    async findByEmail(email: string): Promise<UsersDTO> {
        return await this.usersRepository.findOne({
            where: {
                email: email,
            },
        });
    }

    async read(id: number) {
        return await this.usersRepository.findOne({ 
            where: { id: id } 
        });
    }

    async destroy(id: number) {
        await this.usersRepository.delete({ id });
        return { deleted: true };
    }
    
}
