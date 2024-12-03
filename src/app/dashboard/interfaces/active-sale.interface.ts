export interface AddPaymentDto {
  saleId: string;
  payment: {
    amount: number;
    date: Date;
    paymentType: string;
  };
}
