import { join } from 'path';

import { writeFileSync } from 'fs';

/**
 * 打印出 JSON 数据到路径中
 *
 * 如果出现不一致了,可以重新输出 JSON 对象
 * 类似 Enzyme 的快照功能
 *
 * @param json
 * @param name
 */
export const outputJSONData = (json: object, name: string) => {
  writeFileSync(join(__dirname, `./json/${name}.json`), JSON.stringify(json));
};

export const isUpdate = process.env.UPDATE === '1';
