import { UnauthorizedException } from '@nestjs/common';
import { createHmac, timingSafeEqual } from 'node:crypto';

const accessTokenSecret = 'sword-task-dev-secret';

export interface AccessTokenPayload {
  sub: number;
  email: string;
  nickname: string;
}

export function signAccessToken(payload: AccessTokenPayload): string {
  const header = base64UrlEncode({ alg: 'HS256', typ: 'JWT' });
  const encodedPayload = base64UrlEncode(payload);
  const signature = createSignature(header, encodedPayload);

  return `${header}.${encodedPayload}.${signature}`;
}

export function verifyAccessToken(accessToken: string): AccessTokenPayload {
  const [header, payload, signature] = accessToken.split('.');

  if (!header || !payload || !signature) {
    throw new UnauthorizedException('유효하지 않은 토큰입니다.');
  }

  const expectedSignature = createSignature(header, payload);
  const signatureBuffer = Buffer.from(signature);
  const expectedSignatureBuffer = Buffer.from(expectedSignature);

  if (
    signatureBuffer.length !== expectedSignatureBuffer.length ||
    !timingSafeEqual(signatureBuffer, expectedSignatureBuffer)
  ) {
    throw new UnauthorizedException('유효하지 않은 토큰입니다.');
  }

  return JSON.parse(
    Buffer.from(payload, 'base64url').toString('utf8'),
  ) as AccessTokenPayload;
}

function createSignature(header: string, payload: string): string {
  return createHmac('sha256', accessTokenSecret)
    .update(`${header}.${payload}`)
    .digest('base64url');
}

function base64UrlEncode(value: object): string {
  return Buffer.from(JSON.stringify(value)).toString('base64url');
}
