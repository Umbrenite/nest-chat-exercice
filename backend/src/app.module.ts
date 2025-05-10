import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DiscussionsModule } from './discussions/discussions.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Discussion } from './discussions/entities/discussion.entity';
import { UsersModule } from './users/users.module';
import { GroupsModule } from './groups/groups.module';
import { User } from './users/entities/user.entity';
import { Group } from './groups/entities/group.entity';


@Module({
  imports: [DiscussionsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'mydb',
      entities: [Discussion, User, Group],
      synchronize: true,
    }),
    UsersModule,
    GroupsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
