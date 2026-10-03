# 凯恩斯主义与现代货币理论

这本教材比较凯恩斯原始理论、战后凯恩斯主义综合体系与现代货币理论（MMT），并用新凯恩斯主义、后凯恩斯主义及中美制度帮助界定分歧。

延续相邻 us-econ 与 cn-econ 教材的教学方式：完整机制、逐步算例、原始资料带读、条件化比较与带推理的练习答案。

- [全书目录与阅读路线](textbook/README.md)
- [从第一章开始：我们究竟在比较什么](textbook/01-what-are-we-comparing.md)
- [政策比较入口：19 充分就业与就业保障](textbook/19-full-employment-and-job-guarantee.md)
- [最终综合案例：28 面对同一个经济体，写出两套政策方案](textbook/28-policy-design-workshop.md)
- [核心争论对照表](textbook/appendix-d-disputes.md)

全书完整初稿于 2026-10-03 完成：7 篇、28 章、6 份附录，含 175 道分章练习、8 组账户练习及 7 份综合作业，均附推理与参考答案。内容覆盖理论来源、逐笔账户、政策分歧、历史与中美制度，并以同一个经济体的两套政策方案收束。

所有教学算例与真实历史数据分别标注；原文和官方资料在正文就近链接。文件可直接用 Markdown 阅读器打开；[附录 F](textbook/appendix-f-us-cn-connections.md)提供与相邻 us-econ、cn-econ 教材的对应阅读路径。

## 在线阅读与本地开发

- [在线教材](https://fangpings.github.io/mmt/)
- [GitHub 仓库](https://github.com/fangpings/mmt)

阅读站沿用 us-econ、cn-econ 的 VitePress 配置，支持中文搜索、章节导航、深浅色模式和折叠答案。正文保留跨仓库本地链接，构建时自动转换成对应教材的在线地址。

使用 Node.js 22 和 npm：

```sh
npm ci
npm run dev
```

构建及预览：

```sh
npm run build
npm run preview
```

GitHub Pages 使用 GitHub Actions 发布；推送到 main 后自动构建，也可在 Actions 页面手动运行 Deploy VitePress to GitHub Pages。站点路径为 /mmt/，构建产物与依赖不纳入 Git。部署配置见 [.github/workflows/pages.yml](.github/workflows/pages.yml)。
