import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstname: string;

    @Column()
    lastname: string;

    @Column()
    username: string;

    @Column({ select: false })
    password: string;

    @Column()
    email: string;

    @Column()
    custom_profil_color: string;

    @Column()
    custom_username_color: string;

    @Column("text", { array: true, nullable: true })
    group_ids: string[];
}
