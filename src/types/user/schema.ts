import { z } from "zod";
import { faker } from "@faker-js/faker/locale/id_ID";

export const UserSchema = z.object({
    id: z.string().optional(),
    name: z.string(),
    email: z.string().email(),
    country: z.string(),
    gender: z.string(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
})

export type UserTypes = z.infer<typeof UserSchema>


// Fungsi untuk membuat data pengguna acak sesuai dengan UserSchema
const generateRandomUser = (): UserTypes => {
    return {
        id: faker.string.uuid(),
        name: faker.person.fullName(),
        email: faker.internet.email(),
        country: faker.location.country(),
        gender: faker.helpers.arrayElement(['male', 'female']),
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent(),
    };
};

// Menghasilkan contoh data pengguna acak
const randomUser = generateRandomUser();
console.log(randomUser);

// Menghasilkan array data pengguna acak
export const generateRandomUsers = (count: number): UserTypes[] => {
    return Array.from({ length: count }, generateRandomUser);
};
