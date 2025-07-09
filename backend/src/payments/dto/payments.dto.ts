import { PaymentType } from 'generated/prisma';

export class PaymentDto {
  amount: number;
  type: PaymentType;
}

export class PaymentSummary {
  default: {
    totalRequests: number | null;
    totalAmount: number | null;
  };
  fallback: {
    totalRequests: number | null;
    totalAmount: number | null;
  };
}

export interface SummaryParams {
  from: Date;
  to: Date;
}
