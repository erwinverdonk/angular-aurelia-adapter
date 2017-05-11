import * as angular from "angular";

/**
 * AngularJS compiler to compile DOM elements and invoke functions with dependency injection.
 */
class AngularJSCompiler {
  private _scope: angular.IScope;
  private _compile: angular.ICompileService;
  private _injector: angular.auto.IInjectorService;

  /**
   * Creates a new instance
   * @param {Element|string[]} [modules] Element to get injector of or array of module ids to create new injector.
   * @return {AngularJSCompiler} Instance
   */
  public static create = (modules: Element|Array<string> = []) => {
    return new AngularJSCompiler(modules);
  }

  /**
   * @private
   */
  private constructor (v: Element|Array<string> = []) {
    if(v instanceof Element){
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

  /**
   * Destroys the instance
   */
  public destroy = () => {
    this._scope.$destroy();
    this._scope = undefined;
    this._compile = undefined;
    this._injector = undefined;
  }

  /**
   * Compiles the DOM element with the given scope and priority.
   * @param {Element} element DOM element to compile
   * @param {*} [scope] Scope to use when compiling element
   * @return {Element} Compiled DOM element
   */
  public compile = (element: Element, scope?: any) => {
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

    compiledElement = this._compile(element)(compileScope);
    compileScope.$digest();

    return compiledElement;
  }

  /**
   * Invoke a function and supply arguments from injector.
   * @param {Function} fn The injectable function to invoke
   * @param {*} [self] The 'this' for the invoked function
   * @param {*} [locals] Argument names are read from this object first, before the injector is consulted.
   */
  public invoke = (fn: Function|Array<string|Function>, self?: any, locals?: {}) => {
    this._injector.invoke(fn as any, self, locals);
  }
}

export {
  AngularJSCompiler
};
