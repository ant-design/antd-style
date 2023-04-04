import { defineConfig } from 'dumi';

const isProd = process.env.NODE_ENV === 'production';

// 不是预览模式 同时是生产环境
const isProdSite = process.env.PREVIEW !== '1' && isProd;

export default defineConfig({
  themeConfig: {
    name: 'Ant Design Style',
    logo: 'https://gw.alipayobjects.com/zos/hitu-asset/c88e3678-6900-4289-8538-31367c2d30f2/hitu-1609235995955-image.png',
    github: 'https://github.com/ant-design/antd-style',
    apiHeader: {
      pkg: 'antd-style',
      docUrl: '{github}/blob/master/docs/api/{title}.md',
    },
    syntaxTheme: {
      shiki: {
        dark: 'one-dark-pro',
      },
    },
    footer: 'Made with ❤️ by 蚂蚁集团 - AFX & 数字科技',
  },
  // @ts-ignore
  ssr: isProd ? {} : false,
  favicons: [
    'https://gw.alipayobjects.com/zos/hitu-asset/c88e3678-6900-4289-8538-31367c2d30f2/hitu-1609235995955-image.png',
  ],
  // 部署在非根目录时, base 和 publicPath 都需要配置
  base: isProdSite ? '/antd-style/' : '/',
  publicPath: isProdSite ? '/antd-style/' : '/',
  styles: [
    `html, body { background: transparent;  }

  @media (prefers-color-scheme: dark) {
    html, body { background: #0E1116; }
  }`,
  ],
  extraBabelPlugins: ['@emotion'],
  scripts: [
    `
     !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.async=!0,p.src=s.api_host+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="capture identify alias people.set people.set_once set_config register register_once unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled onFeatureFlags".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
    posthog.init('phc_opzQkyrq6tim3eBoeRYwY0No5hZ9Dl5ws7iQLpNrLXG',{api_host:'https://app.posthog.com'})
`,
  ],
  codeSplitting: {
    jsStrategy: 'granularChunks',
  },
});
