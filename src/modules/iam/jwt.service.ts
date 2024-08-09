import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as config from 'config';
import { generateKeyPairSync, randomBytes } from 'crypto';
import { readFileSync } from 'fs';
import { Algorithm, JwtPayload, sign, verify } from 'jsonwebtoken';
import { JwtDto } from './dtos';

@Injectable()
export class JWTService {
  private publicKey: string;
  private privateKey: string;
  constructor() {
    if (config.get<boolean>('jwt.staticKey')) {
      this.publicKey = readFileSync(
        config.get<string>('jwt.publicKeyPath'),
      ).toString();
      this.privateKey = readFileSync(
        config.get<string>('jwt.privateKeyPath'),
      ).toString();
    } else {
      const { privateKey, publicKey } = generateKeyPairSync('rsa', {
        modulusLength: 4096,
        publicKeyEncoding: {
          type: 'spki',
          format: 'pem',
        },
        privateKeyEncoding: {
          type: 'pkcs8',
          format: 'pem',
        },
      });
      this.publicKey = publicKey;
      this.privateKey = privateKey;
    }
  }

  public generateJwtToken(subject: string, payload: any): JwtDto {
    const expiresIn = config.get('jwt.expiresIn');
    const signOptions = {
      issuer: config.get<string>('jwt.issuer'),
      audience: config.get<string>('jwt.audience'),
      expiresIn: config.get<string>('jwt.expiresIn'),
      algorithm: config.get<Algorithm>('jwt.algorithm'),
    };
    const jwtid = randomBytes(5).toString('hex');
    const accessToken = sign(payload, this.privateKey, {
      ...signOptions,
      jwtid,
      expiresIn,
      subject,
    });
    return { accessToken };
  }

  public decodeJwt(token: string): JwtPayload {
    const verifyOptions = {
      issuer: config.get<string>('jwt.issuer'),
      audience: config.get<string>('jwt.audience'),
      algorithms: [config.get<Algorithm>('jwt.algorithm')],
    };

    try {
      return verify(token, this.publicKey, verifyOptions) as JwtPayload;
    } catch (error) {
      throw new UnauthorizedException(
        'The json web token is badly signed, timed out, or formatted wrong.',
      );
    }
  }
}
