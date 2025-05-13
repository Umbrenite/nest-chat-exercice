import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Group {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column('text', { array: true })
    user_ids: string[];

    @Column()
    discussion_id: string;

    @Column()
    icon_url: string;
}
