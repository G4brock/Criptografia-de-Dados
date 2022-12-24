import { Injectable, NotFoundException } from '@nestjs/common';
import { DataDto } from './interfaces/app.interface';
import { EncryDoc } from './schemas/app.schemas';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { EncryptService } from './encrypt/encrypt.service';

@Injectable()
export class AppService {
  constructor(
    @InjectModel('main') private encriptModel: Model<EncryDoc>,
    private readonly encryptService: EncryptService
  ) {}

  async receivData(data: DataDto){
    data.creditCardToken = await this.encryptService.encrypt(data.creditCardToken)
    data.userDocument = await this.encryptService.encrypt(data.userDocument)

    const create = new this.encriptModel(data);
    await create.save()

    return 'Registro Salvo com Sucesso'
  }

  async searchData(){
    let data = await this.encriptModel.find();
    return data;
  }

  async decryptData(id){
    let data = await this.encriptModel.findOne({"id": id})

    if(data){
      data.creditCardToken = await this.encryptService.decrypt(data.creditCardToken);
      data.userDocument = await this.encryptService.decrypt(data.userDocument)
    } else
      throw new NotFoundException()

    return data;
  }
  
}
