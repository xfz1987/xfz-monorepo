## 📚 Hooks API

[查看 API 文档](https://raw.githack.com/xfz1987/xfz-monorepo/master/packages/hooks/docs/index.html)

## 安装配置 microbundle

1.npm install microbundle --save

2.配置 package.json

```json
{
	"name": "xfz-sdk",
	"version": "1.0.0",
	"description": "项目描述",
	"main": "lib/monitor.js",
	"license": "MIT",
	"source": "src/index.ts",
	"unpkg": "lib/monitor-sdk.umd.js",
	"types": "lib/typings/index.d.ts",
	"module": "lib/monitor-sdk.module.js",
	"scripts": {
		"start": "microbundle watch",
		"build": "microbundle"
	},
	"devpendencies": {
		"microbundle": "^0.13.0"
	}
}
```

### 生成 typedoc

1. npm install typedoc --save

2. 编写好注释

3. 配置 package.json

```json
"scripts": {
  // 从src中生成doc到docs
  "doc": "typedoc --out docs src"
},
```

4. 配置 tsconfig.json，否则 tsdoc 没办法分析

```json
{
	"compilerOptions": {
		"target": "esnext", // 指定 ECMAScript 版本
		"module": "esnext",
		"declaration": true, // 开启ts分析
		"declarationMap": true,
		"declarationDir": "./typings" // 将ts类型生成到该文件夹下
	},
	"include": ["src"],
	"exclude": ["node_modules", "lib", "**/*.spec.ts"] // *** 不进行类型检查的文件 ***
}
```

### 合并 typings 工具

- [@microsoft/api-extractor](https://api-extractor.com/)
- - API 提取工具，可帮助构建更好的 TypeScript 库软件包 []

#### 安装配置 api-extractor

1.npm install -D @microsoft/api-extractor

2.配置 package.json

```json
"scripts": {
  "api:init": "api-extractor init",
  "api:run": "api-extractor run --local --verbose"
},
```

3.生成 api-extractor 配置文件
npm run api:init

生成 api-extractor.json，并配置

```json
{
	// 微软的标准，无需关心
	"$schema": "https://developer.microsoft.com/json-schemas/api-extractor/v7/api-extractor.schema.json",
	// 指定分析入口
	"mainEntryPointFilePath": "<projectFolder>/lib/typings/index.d.ts",
	"bundledPackages": [],
	"compiler": {
		"overrideTsconfig": {
			"compilerOptions": {
				"declaration": false
			}
		}
	},
	// 不用这玩意，不好看,而且费劲
	"apiReport": {
		"enabled": false,
		"reportTempFolder": "<projectFolder>/temp/"
	},
	// 不用
	"docModel": {
		"enabled": false,
		"apiJsonFilePath": "<projectFolder>/temp/<unscopedPackageName>.api.json"
	},
	"dtsRollup": {
		"enabled": true,
		"untrimmedFilePath": "<projectFolder>/typings/<unscopedPackageName>.d.ts",
		"omitTrimmingComments": true
	},
	// 不用
	"tsdocMetadata": {
		"enabled": false,
		"tsdocMetadataFilePath": "<projectFolder>/dist/tsdoc-metadata.json"
	},
	"messages": {
		"compilerMessageReporting": {
			"default": {
				"logLevel": "warning"
			}
		},
		"extractorMessageReporting": {
			"default": {
				"logLevel": "warning"
			}
		},
		"tsdocMessageReporting": {
			"default": {
				"logLevel": "warning"
			}
		}
	}
}
```

4.npm run api:run 跑一下

- 把 microbundle 生成的 typings 里面的所有类型声明文件合并成一个文件，并生成到 lib/typings/index.d.ts，妥妥滴

## 发布步骤

1. npm run build
2. npm run api:run
3. npm run api:doc
4. npm 发版

```json
// 其他配置项
// ...
// 设置 typings 指向
"typings": "typings/index.d.ts",
```

你就说帅不帅
