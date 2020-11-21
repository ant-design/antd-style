/* istanbul ignore file */

import { writeFileSync } from 'fs';
import { join } from 'path';

/**
 * 打印出 JSON 数据到路径中
 *
 * 如果出现不一致了,可以重新输出 JSON 对象
 * 类似 Enzyme 的快照功能
 *
 * @param json
 * @param name
 */
export const outputJSONData = (json: object, name?: string) => {
  writeFileSync(
    join(__dirname, `./json/${name || 'json'}.json`),
    JSON.stringify(json),
  );
};

/**
 * 更新
 */
export const isUpdate = process.env.UPDATE === '1';
