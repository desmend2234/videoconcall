'use server';

import User from '@/app/modals/user.modal';
import { connect } from '@/db';

export async function createUser(user: any) {
  try {
    await connect();
    const newUser = await User.create(user);
    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    console.error('Error creating user', error);
  }
}

// 將 newUser 物件轉換為 JSON 字串，然後再解析回 JavaScript 物件。
// 這樣做的目的是移除 Mongoose 文件中的所有內部屬性和方法，只保留純粹的資料物件。
// 最終返回這個純粹的資料物件。
// 這段程式碼通常用於處理資料庫操作，確保返回的資料格式化為純粹的 JSON 物件，便於在 API 中使用或傳遞給前端。
