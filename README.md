# Quec Panel

RN 面板前端基建，本仓库为 monorepo，基于 pnpm 的 workspace，包含了 quec panel 的所有组件和文档。

-   packages/base-ui: 基础组件库
-   packages/theme: 主题库
-   packages/utils: 工具库
-   packages/business-ui: 业务组件库
-   dumi-docs: dumi 文档，兼顾开发调试功能

子包之间的引用使用 workspace 协议，如：

```json
{
    "dependencies": {
        "@quec/panel-base-ui": "workspace:*"
    }
}
```

## 依赖安装

```shell
pnpm install
```

## 开发调试

### base-ui

需要执行多个命令

```shell
pnpm dev:theme
pnpm dev:base-ui
pnpm dev:docs
```

### utils

接入了 vitest，可通过 vitest 实时调试

```shell
pnpm -C packages/utils vitest:watch
```

vitest ui 界面

```shell
pnpm -C packages/utils vitest:ui
```

覆盖率报告

```shell
pnpm -C packages/utils vitest:coverage
```

更改 utils 代码后，如果其他的子包要使用，需要重新编译

```shell
pnpm -C packages/utils build
```

### business-ui

TODO

## 发布

通过 changesets 进行版本管理，可以在任何时候（一般在功能开发完成时）通过命令生成 changeset。

```shell
pnpm changeset
```

ps: 发布beta版本
```shell
pnpm changeset pre enter beta
```

根据提示选择变更的库，根据以下规则选择更新的版本号：

-   patch: bug fix
-   minor: 新增功能
-   major: breaking change

然后根据提示输入变更的描述，最后会.changeset 目录下生成一个随机文件名的 changeset 文件，
这个文件提交之前可以更改。

合并到 master 分支后会触发 gitlab-ci，自动发布新版本和 npm 包。

changesets 的详细用法见[官方仓库](https://github.com/changesets/changesets）
