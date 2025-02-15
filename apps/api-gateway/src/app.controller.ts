import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authClient: ClientKafka,
    @Inject('PAYMENT_SERVICE') private readonly paymentClient: ClientKafka,
  ) {}

  // @Post('auth/signup')
  // signup(@Body() userData: any) {
  //   return this.authClient.emit('user.signup', userData);
  // }

  // // Payment Processing (Sent to PAYMENT_SERVICE)
  // @Post('payment')
  // processPayment(@Body() paymentData: any) {
  //   return this.paymentClient.emit('payment.process', paymentData);
  // }
}
