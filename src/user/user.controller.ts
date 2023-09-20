import { User } from './user';
import { UserService } from './user.service';

export class UserController {
    constructor(private userService: UserService) { }

    add(username: string): User {
        if (username === '') {
            throw new Error('username is empty');
        }
        else if (username.trim() === '') {
            throw new Error('username is whitespaced');
        }
        else if (username.length < 3) {
            throw new Error('username is too short');
        }

        return this.userService.add(username);
    }

    getById(id: number): User | null {
        if (id < 0) {
            throw new Error('id is negative');
        }
        else if (id % 1 !== 0) {
            throw new Error('id is not a decimal');
        }
        else if (id === 0) {
            throw new Error('id is zero');
        }
        return this.userService.getById(id);
    }
}
