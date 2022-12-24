import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { DataDto } from './interfaces/app.interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('sendDate')
  encryptdata(
    @Body() data: DataDto
  ){
    return this.appService.receivData(data);
  }

  @Get('decryptData/:id')
  decrypt(@Param() params){
   return this.appService.decryptData(params.id);
  }
  
  @Get()
  searchData(){
    return this.appService.searchData()
  }
}
