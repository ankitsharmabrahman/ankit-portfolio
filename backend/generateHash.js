
import bcrypt from 'bcryptjs';
import { randomBytes } from 'node:crypto';
import { createInterface } from 'node:readline/promises';

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

try {
  const password = await rl.question('Enter admin password: ');

  if (!password) {
    throw new Error('Password cannot be empty.');
  }

  const passwordHash = await bcrypt.hash(password, 12);
  const jwtSecret = randomBytes(32).toString('hex');

  console.log('\nAdd these values to your private backend .env file:');
  console.log('ADMIN_PASSWORD_HASH=' + passwordHash);
  console.log('JWT_SECRET=' + jwtSecret);
} finally {
  rl.close();
}

