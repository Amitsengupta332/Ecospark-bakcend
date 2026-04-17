export type TIPaymentResult = {
  clientSecret: string;
  amount: number;
  transactionId?: string;
};

export type TPaymentIntent = {
  participationId: string;
};

export type TPaymentConfirmation = {
  transactionId: string;
  participationId: string;
  amount: number;
  status: string;
  gatewayData?: any;
};