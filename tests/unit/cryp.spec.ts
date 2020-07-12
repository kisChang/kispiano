/*
密钥的创建
openssl genrsa -out rsa_private.key 1024
openssl rsa -in rsa_private.key -pubout -out rsa_public.key
*/

import {aesdb} from '@/utils/aesdb';

describe('cryptoCode', () => {

    it('should', () => {

        let data = "HelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorld";
        let key = "5SB7FwP2l+TKP3AR6dK8CKAYBX38zVdL4RjyS4aoyPs=";

        // 公钥加密
        let secret = aesdb.encrypt(Array.from(data), key);
        // 私钥解密
        let result = aesdb.decrypt(secret, key);
        console.log(result.toString()); // hello
        expect(data).toEqual(result.toString());

    });

});