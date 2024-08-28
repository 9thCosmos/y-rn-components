module.exports = {
  root: true,
  extends: [
    // 官方拓展
    'eslint:recommended',
    // 插件拓展
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    // 开源社区拓展
    'airbnb-base',
  ],
  env: {
    node: true,
    browser: true,
    es6: true,
  },
  globals: {
    global: true,
  },
  parser: '@typescript-eslint/parser',
  rules: {
    // 0，不启用这个规则   1，出现问题会有警告   2，出现问题会报错
    // 关闭prettier
    'prettier/prettier': 0,
    'space-before-function-paren': 0,
    'no-bitwise': 0, // 禁止使用位运算符
    'no-plusplus': 0, // ++，--
    'no-underscore-dangle': 0, // 禁止方法下划线,
    'operator-linebreak': ['error', 'after'], // 当一条语句太长不能放在一行时，将操作符放在行首位置
    // 格式限制
    // 'max-len': ['error', { code: 100, tabWidth: 2 }],
    'max-len': 0,
    'no-param-reassign': 0, // 禁止给参数重新赋值
    'react/jsx-key': 2, // 在数组或迭代器中验证JSX具有key属性
    'object-curly-newline': 0,
    'linebreak-style': [0, 'error', 'window'],
    'no-restricted-globals': 0, // 禁用特定的全局变量
    'class-methods-use-this': 0,
    'global-require': 0, // 禁用全局require
    'no-unused-vars': 1, // 禁止未使用的变量
    'arrow-parens': 0, // 箭头函数必须使用圆括号
    'react/prop-types': ['error', { ignore: ['navigation'] }], // 不用校验navigation中的导航参数
    'no-class-assign': 2, // 禁止给类赋值
    'no-cond-assign': 2, // 禁止在条件表达式中使用赋值语句
    'no-const-assign': 2, // 禁止修改const声明的变量
    // 自己定制
    // 'prettier/prettier': ['error', { singleQuote: true, parser: 'flow' }],
    'no-console': 0, // 不禁用console
    'no-return-assign': 1,
    'prefer-const': 2, // 变量未重新分配，提示使用const
    'no-func-assign': 2, // 禁止重复的函数声明
    'no-invalid-this': 0, // 禁止无效的this，只能用在构造器，类，对象字面量
    'no-redeclare': 2, // 禁止重复声明变量
    'no-spaced-func': 2, // 函数调用时 函数名与()之间不能有空格
    'no-this-before-super': 0, // 在调用super()之前不能使用this或super
    'no-undef': 2, // 不能有未定义的变量
    'import/newline-after-import': 0,
    'import/no-dynamic-require': 0,
    'import/no-extraneous-dependencies': 0,
    'import/no-named-as-default': 0,
    'import/no-unresolved': 0,
    'no-nested-ternary': 0,
    'import/extensions': 0,
    'react/jsx-closing-bracket-location': 0, // 在JSX中验证右括号位置
    'react/jsx-curly-spacing': [2, { when: 'never', children: true }], // 在JSX属性和表达式中加强或禁止大括号内的空格。
    'react/jsx-no-bind': 0,
    'react/destructuring-assignment': 0,
    'no-mixed-operators': 0,
    'react/jsx-no-literals': 0, // 防止使用未包装的JSX字符串
    'react/prefer-stateless-function': 0,
    'react/jsx-no-undef': 1, // 在JSX中禁止未声明的变量
    'react/jsx-pascal-case': 0, // 为用户定义的JSX组件强制使用PascalCase
    'react/jsx-sort-props': 0, // 强化props按字母排序
    'react/jsx-uses-react': 1, // 防止反应被错误地标记为未使用
    'react/jsx-uses-vars': 2, // 防止在JSX中使用的变量被错误地标记为未使用
    'react/no-danger': 0, // 防止使用危险的JSX属性
    'react/no-did-mount-set-state': 1, // 防止在componentDidMount中使用setState
    'react/no-did-update-set-state': 1, // 防止在componentDidUpdate中使用setState
    'react/no-direct-mutation-state': 2, // 防止this.state的直接变异
    'react/no-multi-comp': 1, // 防止每个文件有多个组件定义
    'no-extra-boolean-cast': 2, // 禁止不必要的bool转换
    'react/no-array-index-key': 0, // 防止在数组中遍历中使用数组key做索引
    'react/no-deprecated': 1, // 不使用弃用的方法
    'react/jsx-equals-spacing': 2, // 在JSX属性中强制或禁止等号周围的空格
    'no-unreachable': 1, // 不能有无法执行的代码
    'no-mixed-spaces-and-tabs': 2, // 禁止混用tab和空格
    camelcase: 2, // 强制驼峰法命名
    'no-var': 2, // 对var警告
    'no-constant-condition': 2, // 禁止在条件中使用常量表达式
    'no-dupe-keys': 2, // 在创建对象不允许键重复 {a:1,a:1}
    'no-dupe-args': 2, // 函数参数不能重复
    'no-duplicate-case': 2, // switch中的case标签不能重复
    'import/no-duplicates': 0,
    'no-multiple-empty-lines': [1, { max: 2 }], // 不允许多个空行
    quotes: [2, 'single'], // 单引号
    'comma-spacing': [2, { before: false, after: true }],
    'arrow-spacing': [2, { before: true, after: true }], // 箭头函数后面空格
    'space-infix-ops': 2, // 条件句前后空格
    'function-paren-newline': ['off'],
    'comma-dangle': ['error', 'only-multiline'], // 当最后一个元素或属性与闭括号 ] 或 } 在 不同的行时，允许（但不要求）使用拖尾逗号；当在 同一行时，禁止使用拖尾逗号。
    'import/prefer-default-export': 0,
    smart: 0,
    eqeqeq: 0,
    'no-unused-expressions': 1, // 禁止出现未使用过的表达式
    'implicit-arrow-linebreak': 0,
    'consistent-return': 0, // 要求 return 语句要么总是指定返回的值，要么不指定
    'array-callback-return': 0,
    'react/sort-comp': 0,
    '@typescript-eslint/no-unused-vars': 0,
    'no-confusing-arrow': 1,
    'prefer-destructuring': 0,
    'import/no-cycle': 0,
    'func-names': 0,
    'no-use-before-define': 0,
    'react/display-name': 0,
    'arrow-body-style': 0,
    'no-else-return': 0,
    'no-lone-blocks': 2, // 禁止不必要的嵌套块
    'no-inline-comments': 0, // 禁止行内备注
    'no-ex-assign': 2, // 禁止给catch语句中的异常参数赋值
    indent: 0,
    'no-lonely-if': 0, // 禁止if单独作为条件语句
    'semi': [0],
  },
}
