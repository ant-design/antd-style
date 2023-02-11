import Features from '../../components/Features';

export default () => (
  <Features
    items={[
      // {
      //   title: '基于 Emotion 构建',
      //   avatar:
      //     'https://mdn.alipayobjects.com/huamei_rqvucu/afts/img/A*MvKkQqXEyfQAAAAAAAAAAAAADoN6AQ/original',
      //   description: 'Ant Design Style 的底层实现基于 Emotion 实现，兼具丰富的写法能力与性能表现',
      //   imageStyle: 'light',
      //   row: 6,
      // },
      {
        title: '内置 antd token',
        link: '/guide/switch-theme',
        description: '默认集成 Ant Design V5 的 Token System，主题定制轻而易举，token 消费灵活易用',
        avatar:
          'https://gw.alipayobjects.com/zos/hitu-asset/c88e3678-6900-4289-8538-31367c2d30f2/hitu-1609235995955-image.png',
        imageStyle: 'light',
        row: 7,
      },
      {
        title: '暗色模式一键切换',
        link: '/guide/switch-theme',
        description:
          '我们基于 antd v5 cssinjs 动态主题配置与暗色主题算法，为应用级场景封装了简单易用的亮暗色主题切换能力，使用便捷，上手简单。',
        avatar:
          'https://mdn.alipayobjects.com/huamei_rqvucu/afts/img/A*8KE7T7l39J0AAAAAAAAAAAAADoN6AQ/original',
        imageStyle: 'primary',
      },
      {
        title: '复合样式 —— Stylish',
        description:
          'Ant Design Style 提供了复合样式的能力，我们称它为 Stylish。Stylish 可以通过组合多个原子 token 来组织形成复杂的交互样式，实现样式片段的复用度。',
        link: '/guide/stylish',
        avatar:
          'https://mdn.alipayobjects.com/huamei_rqvucu/afts/img/A*_in2RLf5pY8AAAAAAAAAAAAADoN6AQ/original',
        imageStyle: 'primary',
        row: 8,
      },
      {
        title: '主题灵活扩展',
        description:
          'Ant Design Style 提供自定义 token 与 自定义 stylish 的功能，当 antd 默认的 token 不能满足样式诉求时，可以灵活扩展出自己的主题体系，并在 CSS in JS 中自由消费。',
        link: '/guide/custom-theme',
        avatar:
          'https://mdn.alipayobjects.com/huamei_rqvucu/afts/img/A*6sjjRa7lLhAAAAAAAAAAAAAADoN6AQ/original',
        imageStyle: 'primary',
        row: 8,
      },

      {
        title: 'less 平滑迁移',
        description:
          '旧项目需要迁移？使用 antd-style 可以将项目中的 less 较低成本地迁移到 CSS in JS，并获得更好的用户体验与开发体验。',
        link: '/guide/migrate-from-less',
        avatar:
          'https://mdn.alipayobjects.com/huamei_rqvucu/afts/img/A*5H2ySLO-X4cAAAAAAAAAAAAADoN6AQ/original',
        imageStyle: 'primary',
      },
      {
        title: '微应用良好兼容',
        description:
          'Ant Design Style 默认兼容 qiankun 微应用（但会牺牲一点性能）。同时，为不需要微应用的场景提供性能优化选项。',
        avatar:
          'https://mdn.alipayobjects.com/huamei_rqvucu/afts/img/A*tZNeQIUYx_4AAAAAAAAAAAAADoN6AQ/original',
        imageStyle: 'primary',
        row: 6,
      },
      {
        title: '响应式轻松适配',
        description:
          'Ant Design Style 将为响应式应用提供便捷的工具函数，帮助开发者快速完成响应式主题开发。',
        avatar:
          'https://mdn.alipayobjects.com/huamei_rqvucu/afts/img/A*5H2ySLO-X4cAAAAAAAAAAAAADoN6AQ/original',
        row: 6,
      },
    ]}
  ></Features>
);
