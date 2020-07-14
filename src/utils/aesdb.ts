import {aes} from "@/utils/aes";

export module aesdb {
    /**
     * --------------------加解密处理----------------------
     */
        // @ts-ignore
    export const aes_key = Buffer.from("5SB7FwP2l+TKP3AR6dK8CKAYBX38zVdL4RjyS4aoyPs=", 'base64');
    // @ts-ignore
    export const aes_iv = Buffer.from("abcdefgh12345678", 'utf-8');

    //进行所有加密、解密操作前需要先初始化配置
    export function initAesCrypt() {
        //本地主要使用： aes-cbc-256
        aes.setKeySize(256);
        aes.setCipherMode(aes.CBC);
    }

    // 加密
    // @ts-ignore
    export function encrypt(message: Buffer): Buffer {
        aesdb.initAesCrypt();
        return aes.encBytes(message, aesdb.aes_key, aesdb.aes_iv);
    }

    // 解密
    // @ts-ignore
    export function decrypt(message: Buffer): Buffer {
        aesdb.initAesCrypt();
        return aes.decBytes(message, aesdb.aes_key, aesdb.aes_iv);
    }

    /**
     * --------------------本地缓存数据库管理----------------------
     */
    export const DBNAME = 'kispiano';
    export const DBVERSION = 1;
    export let DB_INSTANCE: null | IDBDatabase = null;

    export function getDb(): Promise<IDBDatabase> {
        return new Promise<IDBDatabase>((resolve, reject) => {
            if (aesdb.DB_INSTANCE == null) {
                // @ts-ignore
                const indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
                const request = indexedDB.open(aesdb.DBNAME, aesdb.DBVERSION);

                request.onupgradeneeded = function (event) {
                    // @ts-ignore
                    const db = event.target.result;
                    if (!db.objectStoreNames.contains('person')) {
                        const objectStore = db.createObjectStore('cache_xml', {
                            keyPath: 'urlPath',
                            autoIncrement: true
                        });
                        objectStore.createIndex("urlPath", "urlPath", {
                            unique: true
                        });
                    }
                };

                request.onsuccess = () => {
                    aesdb.DB_INSTANCE = request.result;
                    resolve(aesdb.DB_INSTANCE);
                };
                request.onerror = (event) => {
                    reject(event);
                };
            } else {
                resolve(aesdb.DB_INSTANCE);
            }
        });
    }

    export function getTransaction(): Promise<IDBTransaction> {
        return new Promise<IDBTransaction>((resolve, reject) => {
            aesdb.getDb().then(db => {
                resolve(db.transaction(['cache_xml'], 'readwrite'));
            }).catch(reason => {
                reject(reason);
            })
        })
    }
}