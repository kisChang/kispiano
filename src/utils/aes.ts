// @ts-ignore
import crypto from 'crypto';

export module aes {
    export const CBC = 'cbc';
    export const ECB = 'ecb';

    // @ts-ignore
    export const NULL_IV = Buffer.from([]);
    // @ts-ignore
    export const IV = Buffer.from([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);

    export let cipherMode = aes.ECB;
    export let keySize = 128;
    export let algorithm = 'aes-128-ecb';

    export function setAlgorithm() {
        aes.algorithm = 'aes-' + aes.keySize + '-' + aes.cipherMode;
    }

    export function setCipherMode(mode: string) {
        if (mode !== aes.CBC && mode !== aes.ECB) {
            throw ('AES.setCipherMode error: ' + mode);
        }
        aes.cipherMode = mode;
        aes.setAlgorithm();
    }

    export function setKeySize(size: number) {
        if (size !== 128 && size !== 256) {
            throw ('AES.setKeySize error: ' + size);
        }
        aes.keySize = size;
        aes.setAlgorithm();
        // console.log('setKeySize:%j',keySize);
    }

    /**
     * the key must match the keySize/8 , like:16 ,32
     * @param  {Buffer} key
     * @return {}
     */
    // @ts-ignore
    export function checkKey(key: Buffer): void {
        if (!key) {
            throw 'AES.checkKey error: key is null ';
        }
        if (key.length !== (aes.keySize / 8)) {
            throw 'AES.checkKey error: key length is not ' + (aes.keySize / 8) + ': ' + key.length;
        }
    }

    /**
     * buffer/bytes encription
     * @param  {Buffer} buff
     * @param  {Buffer} key  the length must be 16 or 32
     * @param  {Buffer} [newIv]   default is [0,0...0]
     * @return {encripted Buffer}
     */
    // @ts-ignore
    export function encBytes(buff: Buffer, key: Buffer, newIv?: Buffer): Buffer {
        aes.checkKey(key);
        let iv = newIv || aes.IV;
        if (aes.cipherMode === aes.ECB) iv = aes.NULL_IV;
        const cipher = crypto.createCipheriv(aes.algorithm, key, iv);
        cipher.setAutoPadding(true);
        // @ts-ignore
        const re = Buffer.concat([cipher.update(buff), cipher.final()]);
        // console.log('enc re:%s,len:%d', printBuf(re), re.length);
        return re;
    }

    /**
     * buffer/bytes decription
     * @param  {Buffer} buff
     * @param  {Buffer} key  the length must be 16 or 32
     * @param  {Buffer} [newIv] default is [0,0...0]
     * @return {encripted Buffer}
     */
    // @ts-ignore
    export function decBytes(buff: Buffer, key: Buffer, newIv?: Buffer): Buffer {
        aes.checkKey(key);
        let iv = newIv || aes.IV;
        if (aes.cipherMode === aes.ECB) iv = aes.NULL_IV;
        const decipher = crypto.createDecipheriv(aes.algorithm, key, iv);
        decipher.setAutoPadding(true);
        // @ts-ignore
        const out = Buffer.concat([decipher.update(buff), decipher.final()]);
        return out;
    }

}


