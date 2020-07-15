import Aes from "@/utils/aes";

/**
 * 应用内的加密、解密工具类，隐藏相关参数
 * 缓存数据库管理
 */
export default class Aesdb {
    /**
     * --------------------加解密处理----------------------
     */
    public static aes_key = Buffer.from("5SB7FwP2l+TKP3AR6dK8CKAYBX38zVdL4RjyS4aoyPs=", 'base64');
    public static aes_iv = Buffer.from("abcdefgh12345678", 'utf-8');

    //进行所有加密、解密操作前需要先初始化配置
    public static initAesCrypt() {
        //本地主要使用： aes-cbc-256
        Aes.setKeySize(256);
        Aes.setCipherMode(Aes.CBC);
    }

    // 加密
    public static encrypt(message: Buffer): Buffer {
        Aesdb.initAesCrypt();
        return Aes.encBytes(message, Aesdb.aes_key, Aesdb.aes_iv);
    }

    // 解密
    public static decrypt(message: Buffer): Buffer {
        Aesdb.initAesCrypt();
        return Aes.decBytes(message, Aesdb.aes_key, Aesdb.aes_iv);
    }

    /**
     * --------------------本地缓存数据库管理----------------------
     */
    public static DBNAME = 'kispiano';
    public static DBVERSION = 1;
    public static DB_INSTANCE: null | IDBDatabase = null;

    public static getDb(): Promise<IDBDatabase> {
        return new Promise<IDBDatabase>((resolve, reject) => {
            if (Aesdb.DB_INSTANCE == null) {
                // @ts-ignore
                const indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
                const request = indexedDB.open(Aesdb.DBNAME, Aesdb.DBVERSION);

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
                    Aesdb.DB_INSTANCE = request.result;
                    resolve(Aesdb.DB_INSTANCE);
                };
                request.onerror = (event) => {
                    reject(event);
                };
            } else {
                resolve(Aesdb.DB_INSTANCE);
            }
        });
    }

    public static getTransaction(): Promise<IDBTransaction> {
        return new Promise<IDBTransaction>((resolve, reject) => {
            Aesdb.getDb().then(db => {
                resolve(db.transaction(['cache_xml'], 'readwrite'));
            }).catch(reason => {
                reject(reason);
            })
        })
    }

}