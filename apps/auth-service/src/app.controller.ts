import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { of } from 'rxjs';

@Controller()
export class AuthController {
  @MessagePattern('user.signup')
  handleSignup(@Payload() userData: any) {
    console.log('Received signup event:', userData);
    return { message: 'User signed up successfully' };
  }

  @MessagePattern('user.login')
  handleLogin(@Payload() credentials: any) {
    console.log('Handling login:', credentials);
    return of({ message: 'Login successful', token: 'jwt-token-here' }); // FIXED: Wrap in `of()`
  }

  @MessagePattern('user.get-profile')
  handleGetUser(@Payload() { id }: any) {
    console.log('🚀 Fetching user profile:', id);
    return of({ id: '125', name: 'John Doe', email: 'test@example.com' });
  }

  @MessagePattern('user.edit-profile')
  handleEditUser(@Payload() { id, userData }: any) {
    console.log('🚀 Editing user profile:', id, userData);
    return of({ message: 'User profile updated' });
  }
}
