import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

interface ActiveUserRequest {
  userId: string;
}

export const ActiveUserId = createParamDecorator<undefined>(
  (data: undefined, context: ExecutionContext): string | undefined => {
    const request = context.switchToHttp().getRequest<ActiveUserRequest>();
    const userId = request.userId;

    if (!userId) {
      throw new UnauthorizedException('User not authenticated');
    }

    return userId;
  },
);
