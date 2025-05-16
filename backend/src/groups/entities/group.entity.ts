import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Group {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    icon_url: string;
}
