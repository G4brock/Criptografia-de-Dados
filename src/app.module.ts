import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EncrySchema } from './schemas/app.schemas';
import { EncryptModule } from './encrypt/encrypt.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/encrypt'),
    MongooseModule.forFeature([{name: 'main', schema: EncrySchema}]),
    EncryptModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
