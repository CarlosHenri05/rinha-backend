import { Injectable } from '@nestjs/common';
import { Payment, PaymentType, PrismaClient } from 'generated/prisma';
import { PaymentDto, SummaryParams, PaymentSummary } from '../dto/payments.dto';

@Injectable()
export class PaymentsService {
  constructor(private readonly prisma: PrismaClient) {}

  async savePayment(paymentDto: PaymentDto): Promise<Payment> {
    return await this.prisma.payment.create({
      data: paymentDto,
    });
  }

  async returnPaymentsSummary(
    summaryParams: SummaryParams,
  ): Promise<PaymentSummary> {
    const defaultSummary = await this.prisma.payment.aggregate({
      where: {
        type: PaymentType.DEFAULT,
        date: {
          gte: summaryParams.from,
          lte: summaryParams.to,
        },
      },
      _sum: {
        amount: true,
      },
    });

    const fallbackSummary = await this.prisma.payment.aggregate({
      where: {
        type: PaymentType.FALLBACK,
        date: {
          gte: summaryParams.from,
          lte: summaryParams.to,
        },
      },
      _sum: {
        amount: true,
      },
    });

    return {
      default: {
        totalRequests: await this.prisma.payment.count({
          where: {
            type: PaymentType.DEFAULT,
            date: {
              gte: summaryParams.from,
              lte: summaryParams.to,
            },
          },
        }),
        totalAmount: defaultSummary._sum ? defaultSummary._sum.amount : 0,
      },
      fallback: {
        totalRequests: await this.prisma.payment.count({
          where: {
            type: PaymentType.FALLBACK,
            date: {
              gte: summaryParams.from,
              lte: summaryParams.to,
            },
          },
        }),
        totalAmount: fallbackSummary._sum ? fallbackSummary._sum.amount : 0,
      },
    };
  }
}
