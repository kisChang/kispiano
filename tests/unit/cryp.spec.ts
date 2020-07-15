import Aes from "@/utils/aes";

describe('cryptoCode', () => {

    it('should', () => {
        //key是16进制，需要转换为buffer，转换后buffer长度为16，即aes128，如果buffer长度是32则是aes256
        // @ts-ignore
        let key = Buffer.from("c4b84456c1379bec99c4d1b7e9f13173", 'hex');
        // @ts-ignore
        let key256 = Buffer.from("c4b84456c1379bec99c4d1b7e9f13173c4b84456c1379bec99c4d1b7e9f13173", 'hex');
        // @ts-ignore
        let iv = Buffer.from("abcdefgh12345678", "utf8");//字符串一定是16位

        const str = "helloworld 你好 HelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorld";
        // @ts-ignore
        let buffer = Buffer.from(str, "utf8");

        //aes-ecb-128 buffer
        let buffer_encrypt = Aes.encBytes(buffer, key);
        let crypto_buffer = Aes.decBytes(buffer_encrypt, key);
        expect(crypto_buffer.toString()).toEqual(str);

        //aes-cbc-128 buffer
        Aes.setCipherMode(Aes.CBC);
        buffer_encrypt = Aes.encBytes(buffer, key, iv);
        crypto_buffer = Aes.decBytes(buffer_encrypt, key, iv);
        expect(crypto_buffer.toString()).toEqual(str);

        //aes-ecb-256 buffer
        Aes.setKeySize(256);
        Aes.setCipherMode(Aes.ECB);
        buffer_encrypt = Aes.encBytes(buffer, key256);
        crypto_buffer = Aes.decBytes(buffer_encrypt, key256);
        expect(crypto_buffer.toString()).toEqual(str);


        //aes-cbc-256 buffer
        Aes.setKeySize(256);
        Aes.setCipherMode(Aes.CBC);
        buffer_encrypt = Aes.encBytes(buffer, key256, iv);
        crypto_buffer = Aes.decBytes(buffer_encrypt, key256, iv);
        expect(crypto_buffer.toString()).toEqual(str);

    });

});