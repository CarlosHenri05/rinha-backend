import { Module } from '@nestjs/common';

import { PaymentsService } from './payments/service/payments.service';
import { PaymentsController } from './payments/controller/payments.controller';

@Module({
  imports: [],
  controllers: [PaymentsController],
  providers: [PaymentsService],
})
export class AppModule {}
