# angular-aurelia-adapter
Adapter to use Angular components and code inside an Aurelia project.

# Installation
1. Install the plugin into your project using npm
  ```
  npm install angular-aurelia-adapter
  ```
2. Import the plugin using the `aurelia` configuration object

  ```javascript
  export function configure(aurelia) {
    aurelia.use
      .standardConfiguration()
      // Install the plugin
      .plugin('angular-aurelia-adapter');
    aurelia.start().then(_ => _.setRoot());
  }
  ```

# Using the template adapter
Since the plugin is globalized, you can use it by placing a `<angularjs>` custom element in any of your views:

  ```html
  <angularjs modules.bind="HelloWorld.id" controller.bind="HelloWorld.controller">
    <hello-world value="$ctrl.value"></hello-world>
  </angularjs>
  ```

# Using the template compiler
```javascript
import {AngularJSCompiler} from "angular-aurelia-adapter";

AngularJSCompiler
  .create(["yourModuleIDs"])
  .compile(this.elementToCompile, this.myController);
```

# Using the injectable function invoker
```javascript
import {AngularJSCompiler} from "angular-aurelia-adapter";

AngularJSCompiler
  .create(["yourModuleIDs"])
  .invoke(($location, $timeout) => {
    $timeout(_ => {
      $location.path("/newValue");
    }, 1000);
  });
```
