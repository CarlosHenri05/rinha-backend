import { Body, Controller, Post, Get, HttpCode } from '@nestjs/common';
import { PaymentsService } from '../service/payments.service';
import { PaymentDto, SummaryParams } from '../dto/payments.dto';

@Controller('api')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  // Retorna 201 por padrão no NestJS
  @Post('/payments')
  @HttpCode(201) // Especificado somente para termos certeza do retorno.
  public async postPayment(@Body() paymentDto: PaymentDto) {
    return await this.paymentsService.savePayment(paymentDto);
  }

  // Retorna 200 por padrão no NestJS
  @Get('payments-summary')
  @HttpCode(200) // Especificado somente para termos certeza do retorno.
  public async returnPaymentsSummary(@Body() summaryParams: SummaryParams) {
    return await this.paymentsService.returnPaymentsSummary(summaryParams);
  }
}
