import bcryptjs from 'bcryptjs';
import DBLocal from 'db-local';
import crypto from 'node:crypto';
import { SALT_ROUNDS } from './config.js';

const { Schema } = new DBLocal({ path: './db' });

const User = Schema('User', {
    _id: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true }
});

export class UserRepository {
    static async create({ username, password }) {
        Validation.username(username);
        Validation.password(password);

        const user = await User.findOne({ username });
        if (user) throw new Error('Username already exists');

        const id = crypto.randomUUID();

        const hashedPassword = await bcryptjs.hash(password, SALT_ROUNDS);

        await User.create({
            _id: id,
            username,
            password: hashedPassword
        }).save();

        return id;
    }

    // static async login({});
}

class Validation {
    static username(username) {
        if (typeof username !== 'string') throw new Error('username must be a string');
        if (username.length < 3) throw new Error('Username debe tener más de 3 caracteres');
    }
    static password(password) {
        if (typeof password !== 'string') throw new Error('password must be a string');
        if (password.length < 6) throw new Error('password debe tener más de 5 caracteres');
    }
}
