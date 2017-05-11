"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var angular = require("angular");
var AngularJSCompiler = (function () {
    function AngularJSCompiler(v) {
        if (v === void 0) { v = []; }
        var _this = this;
        this.destroy = function () {
            _this._scope.$destroy();
            _this._scope = undefined;
            _this._compile = undefined;
            _this._injector = undefined;
        };
        this.compile = function (element, scope, maxPriority) {
            var compileScope = _this._scope.$new();
            var compiledElement;
            if (scope) {
                compileScope.$ctrl = scope;
                for (var _ in compileScope.$ctrl) {
                    (function (key) {
                        var keyChangeHandler = scope[key + "Changed"];
                        scope[key + "Changed"] = function (newValue, oldValue) {
                            compileScope[key] = newValue;
                            !compileScope.$$phase ? compileScope.$digest() : undefined;
                            if (keyChangeHandler) {
                                keyChangeHandler(newValue, oldValue);
                            }
                        };
                    })(_);
                }
            }
            compiledElement = _this._compile(element)(compileScope);
            compileScope.$digest();
            return compiledElement;
        };
        this.invoke = function (fn, self, locals) {
            _this._injector.invoke(fn, self, locals);
        };
        if (v instanceof Node) {
            this._injector = angular.element(v).injector();
        }
        else {
            v = [].concat(v);
            angular.module("ngMonkey", ["ng"]).provider({
                $rootElement: function () {
                    this.$get = function () {
                        return angular.element(document);
                    };
                }
            });
            v.splice(0, 0, "ngMonkey");
            this._injector = angular.injector(v);
        }
        this.invoke(function ($compile, $rootScope) {
            "ngInject";
            _this._scope = $rootScope.$new();
            _this._compile = $compile;
        });
    }
    return AngularJSCompiler;
}());
AngularJSCompiler.create = function (modules) {
    if (modules === void 0) { modules = []; }
    return new AngularJSCompiler(modules);
};
exports.AngularJSCompiler = AngularJSCompiler;
