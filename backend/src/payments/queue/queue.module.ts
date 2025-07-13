import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'payments-queue',
    }),
  ],
  exports: [BullModule],
})
export class QueueModule {}
