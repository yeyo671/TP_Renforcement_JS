import { User } from './user';
import { UserService } from './user.service';
import * as fs from 'fs';

const PATH = './src/user/user.json';

export class UserJSONService implements UserService {

    private readUsersFromFile(): User[] {
        if (!fs.existsSync(PATH)) {
            return [];
        }
        const data = fs.readFileSync(PATH, 'utf-8');
        return JSON.parse(data).users || [];
    }

    private writeUsersToFile(users: User[]): void {
        const data = JSON.stringify({ users });
        fs.writeFileSync(PATH, data, 'utf-8');
    }

    add(username: string): User {
        const users = this.readUsersFromFile();
        const id = users.length > 0 ? users[users.length - 1].id + 1 : 1;
        const newUser: User = { id, username };
        users.push(newUser);
        this.writeUsersToFile(users);
        return newUser;
    }

    getById(id: number): User | null {
        const users = this.readUsersFromFile();
        return users.find(user => user.id === id) || null;
    }
}
