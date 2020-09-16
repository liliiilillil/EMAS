/**
 * 给router中的组件动态增加 webpack 和 modules 属性
 */

function insertCode(options, t) {
  if (options.isArrayExpression()) {
    options.get('elements').forEach((option) => insertCode(option, t));
    return;
  }
  if (options.isObjectExpression()) {
    let properties = options.get('properties');
    let propertiesMap = {};

    properties.forEach((property) => {
      let key = property.get('key');
      propertiesMap[key.node.name] = property;
    });

    if (propertiesMap.webpack) {
      return;
    }

    let dynamicProperty = propertiesMap.component;
    let loaderMethod;
    let dynamicImports = [];

    if (dynamicProperty) {
      loaderMethod = dynamicProperty.get('value');
      loaderMethod.traverse({
        Import: function Import(path) {
          dynamicImports.push(path.parentPath);
        },
      });
    }

    if (propertiesMap.layout) {
      dynamicProperty = propertiesMap.layout;
      loaderMethod = propertiesMap.layout.get('value');
      loaderMethod.traverse({
        Import: function Import(path) {
          dynamicImports.push(path.parentPath);
        },
      });
    }

    if (propertiesMap.subRouters) {
      let children = propertiesMap.subRouters.get('value');
      if (children.isArrayExpression()) {
        insertCode(children, t);
      }
    }

    if (!dynamicImports.length) return;

    dynamicProperty.insertAfter(
      t.objectProperty(
        t.identifier('webpack'),
        t.arrowFunctionExpression(
          [],
          t.arrayExpression(
            dynamicImports.map((dynamicImport) => {
              return t.callExpression(t.memberExpression(t.identifier('require'), t.identifier('resolveWeak')), [
                dynamicImport.get('arguments')[0].node,
              ]);
            }),
          ),
        ),
      ),
    );

    dynamicProperty.insertAfter(
      t.objectProperty(
        t.identifier('modules'),
        t.arrayExpression(
          dynamicImports.map((dynamicImport) => {
            return dynamicImport.get('arguments')[0].node;
          }),
        ),
      ),
    );
  }
}

module.exports = function(_ref) {
  const t = _ref.types;

  return {
    visitor: {
      ImportDeclaration: function ImportDeclaration(path) {
        let source = path.node.source.value;
        if (!source.endsWith('plugins/router-wrapper')) return;

        let defaultSpecifier = path.get('specifiers').find((specifier) => {
          return specifier.isImportDefaultSpecifier();
        });

        if (!defaultSpecifier) return;

        let bindingName = defaultSpecifier.node.local.name;

        let binding = path.scope.getBinding(bindingName);

        binding.referencePaths.forEach((refPath) => {
          let callExpression = refPath.parentPath;
          if (
            callExpression.isMemberExpression() &&
            callExpression.node.computed === false &&
            callExpression.get('property').isIdentifier({ name: 'Map' })
          ) {
            callExpression = callExpression.parentPath;
          }

          if (!callExpression.isCallExpression()) return;

          let args = callExpression.get('arguments');
          if (args.length !== 1) throw callExpression.error;

          let options = args[0];
          insertCode(options, t);
        });
      },
    },
  };
};
