import { plainToInstance } from 'class-transformer';
import { IsNotEmpty, IsString, validateSync } from 'class-validator';

class Env {
  @IsNotEmpty()
  @IsString()
  jwtSecret: string;

  @IsNotEmpty()
  @IsString()
  dbUrl: string;

  @IsNotEmpty()
  @IsString()
  jwtExpiresIn: string;
}

export const env: Env = plainToInstance(Env, {
  jwtSecret: process.env.JWT_SECRET,
  dbUrl: process.env.DATABASE_URL,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN,
});

const errors = validateSync(env);

if (errors.length > 0) {
  throw new Error(JSON.stringify(errors, null, 4));
}
