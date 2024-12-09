import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserUpdateDto } from './dto/user.update.dto';
import { RegisterDto } from '../auth/dto/register.dto';

@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository) {}

    async create(user: RegisterDto) {
        return await this.userRepository.create(user);
    }

    async update(userId: string, user: UserUpdateDto) {
        return await this.userRepository.update(userId, user);
    }

    async getById(userId: string) {
        return await this.userRepository.getById(userId)
    }

    async getAll() {
        return await this.userRepository.getAll();
    }

    async delete(userId: string) {
        return await this.userRepository.delete(userId);
    }

    async findByEmail(email: string) {
        return await this.userRepository.findByEmail(email);
    }
}