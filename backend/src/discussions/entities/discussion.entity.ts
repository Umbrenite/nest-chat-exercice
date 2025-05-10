import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Discussion {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    message: string;

    @Column()
    user_id: string;

    @Column()
    group_id: string;
}
