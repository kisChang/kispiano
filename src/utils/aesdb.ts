// @ts-ignore
import {createCipheriv, createDecipheriv} from "crypto";

//https://www.jianshu.com/p/c716fa3c4678
export namespace aesdb {
    export const aes_key = "5SB7FwP2l+TKP3AR6dK8CKAYBX38zVdL4RjyS4aoyPs=";

    // DES 加密
    export function encrypt(message: any, key: string): any {
        return desBase(message, key, createCipheriv);
    }

    // DES 解密
    export function decrypt(message: any, key: string): any {
        return desBase(message, key, createDecipheriv);
    }

    function desBase(message: any, key: string, func: any): any {
        key = key.length >= 8 ? key.slice(0, 8) : key.concat('0'.repeat(8 - key.length));
        const keyHex = Array.from(key)
        // @ts-ignore
        const cipher = func('aes-256-ecb', keyHex, "");
        cipher.setAutoPadding(true)
        let c = cipher.update(message)
        let d = cipher.final();
        // @ts-ignore
        return Buffer.concat([c, d]);
    }

    const DBNAME = 'kispiano';
    const DBVERSION = 1;
    let DB_INSTANCE: null | IDBDatabase = null;

    export function getDb(): Promise<IDBDatabase> {
        return new Promise<IDBDatabase>((resolve, reject) => {
            if (DB_INSTANCE == null) {
                // @ts-ignore
                const indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
                const request = indexedDB.open(DBNAME, DBVERSION);

                request.onupgradeneeded = function (event) {
                    // @ts-ignore
                    let db = event.target.result;
                    if (!db.objectStoreNames.contains('person')) {
                        let objectStore = db.createObjectStore('cache_xml', {
                            keyPath: 'urlPath',
                            autoIncrement: true
                        });
                        objectStore.createIndex("urlPath", "urlPath", {
                            unique: true
                        });
                    }
                };

                request.onsuccess = function (event) {
                    DB_INSTANCE = request.result;
                    resolve(DB_INSTANCE);
                };
                request.onerror = function (event) {
                    reject(event);
                };
            } else {
                resolve(DB_INSTANCE);
            }
        });
    }

    export function getTransaction(): Promise<IDBTransaction> {
        return new Promise<IDBTransaction>((resolve, reject) => {
            getDb().then(db => {
                resolve(db.transaction(['cache_xml'], 'readwrite'));
            }).catch(reason => {
                reject(reason);
            })
        })
    }
}