# antd-style 零运行时提取（执行任务单）

> 基于 `feat/zero-runtime-prototype`，目标是把当前 runtime collector 原型桥接替换为纯编译期提取，并在 LobeHub（Next + Vite 混合）最小接线验证。

## 0. 当前基线（必须先完成）

- [ ] 清理临时产物：`.tmp-extract-webpack/`
- [ ] 保持当前原型能力可回归：
  - `hydrateExtractedStyles`
  - `AntdStyleExtractWebpackPlugin`
  - `createStaticStyles(..., { styleId })`
- [ ] 固化验证入口（Node 脚本）用于回归：
  - collector 行为
  - extract 命中 / fallback
  - webpack emit 产物

建议命令：

```bash
npm run build
node scripts/verify-extract-prototype.cjs
```

---

## 1. P0 - 纯编译期提取替换 runtime collector

### 1.1 styleId 生成规则（稳定性）

**目标**：跨机器、跨时间、跨 CI 稳定。

- [ ] 规范 `styleId` 组成：`hash(filePath + exportName/callsite + salt)`
- [ ] 增加可配置 salt（如 `process.env.ANTD_STYLE_EXTRACT_SALT`）
- [ ] 文档化 styleId 冲突处理

涉及文件（建议）：

- `src/extract/styleId.ts`
- `src/extract/types.ts`
- `src/extract/ROADMAP.md`

验收：同一源码在两次构建 `styleId` 一致。

---

### 1.2 编译期提取器（Webpack 路径）

**目标**：不依赖 `ANTD_STYLE_EXTRACT_COLLECT`，直接从模块源码/AST 提取。

- [ ] 新增 webpack loader/plugin transform：
  - 识别 `createStaticStyles` 调用
  - 注入/校验 `styleId`
  - 收集 `styleId -> classMap + cssText` 到 compilation 上下文
- [ ] 替换当前 `collector.ts` runtime bridge 依赖
- [ ] 无法静态求值的表达式打标 fallback，不阻塞构建

涉及文件（建议）：

- `src/extract/webpackEmitPlugin.ts`
- `src/extract/collector.ts`（改为编译期收集容器或废弃）
- `src/extract/babelInjectStyleId.ts`（复用 AST 逻辑）
- `src/factories/createStaticStyles/index.ts`（移除 runtime collector bridge）

验收：关闭 `ANTD_STYLE_EXTRACT_COLLECT` 后仍能生成 manifest/css。

---

### 1.3 静态求值边界（先白名单）

**目标**：先可控、再扩展。

- [ ] 支持：
  - 字面量模板字符串
  - `cssVar` 映射
  - 简单常量拼接
- [ ] 不支持时 fallback：
  - 打 dev warning（含 file + styleId + reason）
  - 运行时仍可正确渲染

涉及文件（建议）：

- `src/extract/types.ts`
- `src/extract/ROADMAP.md`

验收：复杂动态表达式不会导致白屏/构建失败。

---

## 2. P1 - 接线（Next + Vite 双路径）

## 2.1 LobeHub Next 路径（auth/backend）

- [ ] 在 `next.config.ts` 注入提取插件（按开关启用）
- [ ] 根注水：`hydrateExtractedStyles(manifest)`
- [ ] CSS 资产确保进入页面

涉及文件（lobehub）：

- `next.config.ts`
- `src/layout/GlobalProvider/StyleRegistry.tsx`
- `src/layout/GlobalProvider/AppTheme.tsx`

---

## 2.2 LobeHub Vite SPA 路径（主流量）

- [ ] 提供 Vite/Rollup 等价 emit 插件：
  - 输出 `__antd-style.extract.manifest.json`
  - 输出 `__antd-style.extract.css`
- [ ] 在 SPA 启动注水（`SPAGlobalProvider`）
- [ ] 将 extract.css 注入 HTML（`transformIndexHtml` 或 runtime link）

涉及文件（lobehub-vite4）：

- `vite.config.ts`
- `src/layout/SPAGlobalProvider/index.tsx`
- `scripts/generateSpaTemplates.mts`
- `src/app/spa/[variants]/[[...path]]/route.ts`

验收：SPA 构建产物包含 extract 资产，且首屏样式正常。

---

## 3. P2 - 验证与指标

### 3.1 功能验证

- [ ] 产物存在：manifest + css
- [ ] manifest 包含 styleId 条目
- [ ] 命中 styleId 使用 extract classMap
- [ ] 缺条目 fallback 正常
- [ ] SSR/CSR className 一致，无明显 FOUC
- [ ] 深浅色切换正确

### 3.2 性能验证（粗测）

- [ ] style tag 注入次数下降
- [ ] hydration 样式相关 JS 时间下降
- [ ] 首屏稳定性提升（Chrome Performance 对比）

建议输出：

- `docs/extract-benchmark.md`（前后对比截图 + 数据）

---

## 4. P3 - 迁移与治理

- [ ] 先覆盖 `createStaticStyles`
- [ ] `createStyles` 维持 fallback，后续拆分静态/动态子集
- [ ] 提供 lint 规则：缺失 styleId 提示
- [ ] 提供 codemod：批量补 styleId（可选）

---

## 5. 风险与防线（必须落地）

- [ ] 跨 chunk 顺序和去重策略
- [ ] Turbopack / webpack / Vite 行为差异隔离
- [ ] source map 与调试体验
- [ ] 观测：fallback 计数与缺失 styleId 日志

---

## 6. 建议里程碑

- **M1（本周）**：Webpack 纯编译期提取替代 runtime collector
- **M2（下周）**：Vite 等价链路 + SPA 注水
- **M3（下周）**：性能对比与迁移文档
