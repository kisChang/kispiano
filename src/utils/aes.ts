import crypto from 'crypto';

/**
 * AES 加密、解密工具类
 */
export default class Aes {
    public static CBC = 'cbc';
    public static ECB = 'ecb';

    public static NULL_IV = Buffer.from([]);
    public static IV = Buffer.from([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);

    //默认加密
    public static cipherMode = Aes.ECB;
    public static keySize = 128;
    public static algorithm = 'aes-128-ecb';

    public static setAlgorithm() {
        Aes.algorithm = 'aes-' + Aes.keySize + '-' + Aes.cipherMode;
    }

    public static setCipherMode(mode: string) {
        if (mode !== Aes.CBC && mode !== Aes.ECB) {
            throw ('AES.setCipherMode error: ' + mode);
        }
        Aes.cipherMode = mode;
        Aes.setAlgorithm();
    }

    public static setKeySize(size: number) {
        if (size !== 128 && size !== 256) {
            throw ('AES.setKeySize error: ' + size);
        }
        Aes.keySize = size;
        Aes.setAlgorithm();
        // console.log('setKeySize:%j',keySize);
    }

    /**
     * the key must match the keySize/8 , like:16 ,32
     * @param  {Buffer} key
     * @return {}
     */
    public static checkKey(key: Buffer): void {
        if (!key) {
            throw 'AES.checkKey error: key is null ';
        }
        if (key.length !== (Aes.keySize / 8)) {
            throw 'AES.checkKey error: key length is not ' + (Aes.keySize / 8) + ': ' + key.length;
        }
    }

    /**
     * buffer/bytes encription
     * @param  {Buffer} buff
     * @param  {Buffer} key  the length must be 16 or 32
     * @param  {Buffer} [newIv]   default is [0,0...0]
     * @return {encripted Buffer}
     */
    public static encBytes(buff: Buffer, key: Buffer, newIv?: Buffer): Buffer {
        Aes.checkKey(key);
        let iv = newIv || Aes.IV;
        if (Aes.cipherMode === Aes.ECB) iv = Aes.NULL_IV;
        const cipher = crypto.createCipheriv(Aes.algorithm, key, iv);
        cipher.setAutoPadding(true);
        return Buffer.concat([cipher.update(buff), cipher.final()]);
    }

    /**
     * buffer/bytes decription
     * @param  {Buffer} buff
     * @param  {Buffer} key  the length must be 16 or 32
     * @param  {Buffer} [newIv] default is [0,0...0]
     * @return {encripted Buffer}
     */
    public static decBytes(buff: Buffer, key: Buffer, newIv?: Buffer): Buffer {
        Aes.checkKey(key);
        let iv = newIv || Aes.IV;
        if (Aes.cipherMode === Aes.ECB) iv = Aes.NULL_IV;
        const decipher = crypto.createDecipheriv(Aes.algorithm, key, iv);
        decipher.setAutoPadding(true);
        return Buffer.concat([decipher.update(buff), decipher.final()]);
    }

}


