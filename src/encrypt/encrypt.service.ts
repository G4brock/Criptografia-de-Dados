import { Injectable } from '@nestjs/common';
import { createCipheriv, createDecipheriv, randomBytes, randomFill, scrypt, Cipher, createHash } from 'crypto';


@Injectable()
export class EncryptService {
    //Como o iv e o password são gerados a cada sessão, se um dado foi encryptado em uma 
    //sessão anterior o sistema não conseguirá ler na sessão, atual.
    //é possível gerar esse dado uma vez e armazenar em algum local para resolver esse problema.

    iv = randomBytes(16);
    password = randomBytes(32);
    
    async encrypt(text: string){
        const cipher = createCipheriv("aes-256-cbc", this.password, this.iv);

        let encryptedText = cipher.update(text, "utf-8", "hex");
        encryptedText += cipher.final("hex");
        
        return encryptedText
    }

    async decrypt(text: string){
        const decipher = createDecipheriv("aes-256-cbc", this.password, this.iv);

        let decryptedText = decipher.update(text, "hex", "utf-8");
        decryptedText += decipher.final("utf8");

        return decryptedText
    }
}
