import mongoose, { Mongoose } from 'mongoose';

const MONGODB_URL = process.env.MONGODB_URL!;

interface MongooseConn {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

//將 global 物件中的 mongoose 屬性賦值給 cache 變數。
let cache: MongooseConn = (global as any).mongoose;

if (!cache) {
  cache = (global as any).mongoose = { conn: null, promise: null };
}

//如果 cache.conn 已經存在（即已經有一個資料庫連接），則直接返回這個連接，避免重複連接。
export const connect = async () => {
  if (cache.conn) {
    return cache.conn;
  }

  //如果 cache.conn 不存在，則使用 mongoose.connect 方法建立一個新的資料庫連接，並將返回的 Promise 賦值給 cache.promise。
  cache.promise = mongoose.connect(MONGODB_URL, {
    dbName: 'clerkauthv5', //指定資料庫名稱
    bufferCommands: false, //禁用 Mongoose 的命令緩衝。
    connectTimeoutMS: 30000, //設定連接超時時間為 30 秒。
  });
  cache.conn = await cache.promise;
  return cache.conn;
};
//這段程式碼的主要目的是確保在應用程式的整個生命週期中只建立一次資料庫連接，從而提高效能並減少資源消耗。
