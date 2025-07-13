import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { PaymentDto } from '../dto/payments.dto';
import { PaymentsService } from '../service/payments.service';
import { PaymentType } from 'generated/prisma';

@Processor('payments-queue')
export class PaymentsProcessor {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Process()
  async handle(job: Job<PaymentDto>) {
    try {
      await this.paymentsService.savePayment(job.data);
    } catch (error) {
      job.data.type = PaymentType.FALLBACK;
      await this.paymentsService.savePayment(job.data);
    }
  }
}
