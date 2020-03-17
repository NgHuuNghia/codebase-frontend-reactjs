module.exports = require('babel-jest').createTransformer({
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current'
        }
      }
    ],
    '@babel/preset-react'
  ],
  plugins: [
    'react-hot-loader/babel',
    [
      '@babel/plugin-proposal-decorators',
      { legacy: true }
    ],
    [
      '@babel/plugin-proposal-class-properties',
      { loose: true }
    ],
    '@babel/plugin-transform-runtime',
    '@babel/plugin-proposal-optional-chaining',
    [
      '@babel/plugin-proposal-private-methods',
      { loose: true }
    ],
    '@babel/plugin-transform-modules-commonjs',
    [
      'import',
      {
        libraryName: 'antd',
        libraryDirectory: 'lib',
        style: true
      },
      'antd'
    ],
    [
      'import',
      {
        libraryName: 'react-use',
        libraryDirectory: 'lib',
        camel2DashComponentName: false
      },
      'react-use'
    ],
    [
      'import',
      {
        libraryName: '@digihcs/innos-ui3',
        libraryDirectory: 'lib',
        style: true
      }
    ]
  ]
})
