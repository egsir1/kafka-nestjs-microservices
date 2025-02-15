import {
  Controller,
  Post,
  Body,
  Inject,
  Get,
  Param,
  Put,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { KafkaReplyTopic } from './kafka-reply.decorator';

export const replyTopics = [
  'user.login',
  'user.verify-password',
  'user.forgot-password',
  'user.confirm-reset',
  'user.get-profile',
  'user.edit-profile',
  'user.get-all',
  'user.delete',
  'user.social-auth',
  'user.register',
];

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authClient: ClientKafka,
  ) {}

  // Fire-and-Forget: user.signup
  @Post('signup')
  signup(@Body() userData: any) {
    console.log('🚀 ~ AuthController ~ signup ~ userData:', userData);
    this.authClient.emit('user.signup', userData);
    return { message: 'Signup request received' };
  }

  // Request-response: user.login
  @Post('login')
  @KafkaReplyTopic('user.login')
  async login(@Body() credentials: any): Promise<{ accessToken: string }> {
    console.log('🚀 ~ AuthController ~ login ~ credentials:', credentials);

    const response = await firstValueFrom<{ accessToken: string }>(
      this.authClient.send('user.login', credentials),
    );
    return response;
  }

  @Get('user/:id')
  @KafkaReplyTopic('user.get-profile')
  async getUser(@Param('id') id: string): Promise<any> {
    console.log('🚀 ~ AuthController ~ getUser:', id);
    return firstValueFrom(this.authClient.send('user.get-profile', { id }));
  }

  @Put('user/:id')
  @KafkaReplyTopic('user.edit-profile')
  async editUser(
    @Param('id') id: string,
    @Body() userData: { [key: string]: any },
  ): Promise<{ message: string }> {
    console.log('🚀 ~ AuthController ~ editUser:', id, userData);
    return firstValueFrom(
      this.authClient.send('user.edit-profile', { id, userData }),
    );
  }
}
