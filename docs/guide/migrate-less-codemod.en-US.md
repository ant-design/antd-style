---

title: Less Application Automated Migration
order: 0
group: Migrating from Less

# Migrate Less Applications with Codemod

To facilitate the unified upgrade of business applications, we provide a one-click migration codemod from less to antd-style.

## Usage

Simply execute the following command in the project root directory:

```bash
npx @chenshuai2144/less2cssinjs less2js -i src
```

Where `src` is the project directory.

![](https://github-production-user-asset-6210df.s3.amazonaws.com/28616219/243153216-bed3780c-1642-456f-8b04-a81940f62fec.png)

## Transformation Logic

In this codemod, we will perform the following transformations:

For less files:

1. Create a new `[file].style.ts` file, where `file` is the name of the less file.
2. Convert the styles in the less file to the css object syntax in antd-style.
3. Flatten the nested syntax in less to a single level.
4. Automatically replace less variables with antd-style tokens.

For ts files:

1. Replace import less with `import useStyles from '[file].style'`.
2. Add `const { style } = useStyles()`.

## Notes

TBD
