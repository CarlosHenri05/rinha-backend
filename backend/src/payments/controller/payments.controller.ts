import { Body, Controller, Post, Get, HttpCode, Inject } from '@nestjs/common';
import { PaymentsService } from '../service/payments.service';
import { PaymentDto, SummaryParams } from '../dto/payments.dto';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Controller('api')
export class PaymentsController {
  constructor(
    @InjectQueue('payments-queue') private readonly paymentsQueue: Queue,
    private readonly paymentsService: PaymentsService,
  ) {}

  // Retorna 201 por padrão no NestJS
  @Post('/payments')
  @HttpCode(202) // Especificado somente para termos certeza do retorno.
  public async postPayment(@Body() paymentDto: PaymentDto) {
    await this.paymentsQueue.add('payment-job', paymentDto);
    return { status: 'queued', message: 'Payment enqueued' };
  }

  // Retorna 200 por padrão no NestJS
  @Get('payments-summary')
  @HttpCode(200) // Especificado somente para termos certeza do retorno.
  public async returnPaymentsSummary(@Body() summaryParams: SummaryParams) {
    return await this.paymentsService.returnPaymentsSummary(summaryParams);
  }
}
