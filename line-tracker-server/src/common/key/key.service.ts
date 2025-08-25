import { Injectable } from '@nestjs/common';
import { generateKeyPairSync } from 'crypto';

@Injectable()
export class KeyService {
    public generateKeyPair(): { publicKey: string; privateKey: string } {
        const { publicKey, privateKey } = generateKeyPairSync('rsa', {
            modulusLength: 2048, // RSA key length
            publicKeyEncoding: {
                type: 'pkcs1',
                format: 'pem',
            },
            privateKeyEncoding: {
                type: 'pkcs1',
                format: 'pem',
            },
        });

        return { publicKey, privateKey };
    }

}
