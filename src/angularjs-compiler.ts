import * as angular from "angular";

class AngularJSCompiler {
  private _scope: angular.IScope;
  private _compile: angular.ICompileService;
  private _injector: angular.auto.IInjectorService;

  public static create = (modules: Node|Array<string> = []) => {
    return new AngularJSCompiler(modules);
  }

  public constructor (v: Node|Array<string> = []) {
    if(v instanceof Node){
        this._injector = angular.element(v).injector();
    } else {
      v = [].concat(v);

      // As this is not an actual AngularJS app we need to manually add $rootElement.
      angular.module("ngMonkey", ["ng"]).provider({
        $rootElement: function() {
          this.$get = function() {
            return angular.element(document);
          };
        }
      });

      // Add default angular modules
      v.splice(0, 0, "ngMonkey");

      this._injector = angular.injector(v);
    }

    this.invoke(($compile: angular.ICompileService, $rootScope: angular.IRootScopeService) => {
      "ngInject";

      this._scope = $rootScope.$new();
      this._compile = $compile;
    });
  }

  public destroy = () => {
    this._scope.$destroy();
    this._scope = undefined;
    this._compile = undefined;
    this._injector = undefined;
  }

  public compile = (element: Element|string, scope?: any, maxPriority?: number) => {
    const compileScope: angular.IScope = this._scope.$new();
    let compiledElement;

    if(scope){
      compileScope.$ctrl = scope;

      for(const _ in compileScope.$ctrl){
        (key => {
          const keyChangeHandler = scope[key + "Changed"];

          scope[key + "Changed"] = (newValue, oldValue) => {
            compileScope[key] = newValue;
            !compileScope.$$phase ? compileScope.$digest() : undefined;

            if(keyChangeHandler){
              keyChangeHandler(newValue, oldValue);
            }
          };
        })(_);
      }
    }

    compiledElement = this._compile(element as Element)(compileScope);
    compileScope.$digest();

    return compiledElement;
  }

  public invoke = (fn: Array<string|Function>|Function, self?: any, locals?: any) => {
    this._injector.invoke(fn as any, self, locals);
  }
}

export {
  AngularJSCompiler
};
