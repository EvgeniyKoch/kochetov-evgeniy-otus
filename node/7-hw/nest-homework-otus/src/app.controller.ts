import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

// Контроллеры отвечают за обработку входящих запросов и возврат ответов клиенту.
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
