var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
System.register("angularjs-compiler", ["angular"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var angular, AngularJSCompiler;
    return {
        setters: [
            function (angular_1) {
                angular = angular_1;
            }
        ],
        execute: function () {
            AngularJSCompiler = (function () {
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
                        var ignoreAureliaChanges;
                        if (scope) {
                            compileScope.$ctrl = scope;
                            for (var _ in compileScope.$ctrl) {
                                (function (key) {
                                    var keyChangeHandler = scope.$ctrl[key + "Changed"];
                                    scope.$ctrl[key + "Changed"] = function (newValue, oldValue) {
                                        if (!ignoreAureliaChanges) {
                                            compileScope[key] = newValue;
                                            compileScope.$digest();
                                        }
                                        if (keyChangeHandler) {
                                            keyChangeHandler(newValue, oldValue);
                                        }
                                    };
                                })(_);
                            }
                        }
                        compiledElement = _this._compile(element)(compileScope);
                        compileScope.$digest();
                        new MutationObserver(function (records, observer) {
                            var elementData = compiledElement.data();
                            var targetScope = elementData.$isolateScope || elementData.$scope;
                            var scopeChangeFn = function (key, newValue, oldValue) {
                                ignoreAureliaChanges = true;
                                scope[key] = newValue;
                                ignoreAureliaChanges = false;
                            };
                            for (var _ in targetScope.$ctrl) {
                                (function (key) {
                                    targetScope.$watch("$ctrl." + key, function (newValue, oldValue) {
                                        if (!newValue || !oldValue || newValue === oldValue)
                                            return;
                                        return scopeChangeFn(key, newValue, oldValue);
                                    });
                                })(_);
                            }
                            targetScope.$digest();
                            observer.disconnect();
                        }).observe(compiledElement[0], { childList: true, subtree: true });
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
            exports_1("AngularJSCompiler", AngularJSCompiler);
        }
    };
});
System.register("angularjs-adapter", ["aurelia-framework", "angularjs-compiler"], function (exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    var aurelia_framework_1, angularjs_compiler_1, Angularjs;
    return {
        setters: [
            function (aurelia_framework_1_1) {
                aurelia_framework_1 = aurelia_framework_1_1;
            },
            function (angularjs_compiler_1_1) {
                angularjs_compiler_1 = angularjs_compiler_1_1;
            }
        ],
        execute: function () {
            Angularjs = (function () {
                function Angularjs(element) {
                    this.element = element;
                    this.controller = {};
                    this.modules = [];
                }
                Angularjs.prototype.attached = function () {
                    if (this.element.children.length !== 1) {
                        throw "The content of <angularjs> must be a single HTMLElement";
                    }
                    angularjs_compiler_1.AngularJSCompiler
                        .create([].concat(this.modules))
                        .compile(this.element.children[0], this.controller);
                };
                return Angularjs;
            }());
            __decorate([
                aurelia_framework_1.bindable,
                __metadata("design:type", Object)
            ], Angularjs.prototype, "controller", void 0);
            __decorate([
                aurelia_framework_1.bindable,
                __metadata("design:type", Object)
            ], Angularjs.prototype, "modules", void 0);
            Angularjs = __decorate([
                aurelia_framework_1.noView(),
                aurelia_framework_1.processContent(false),
                aurelia_framework_1.inject(Element),
                __metadata("design:paramtypes", [Element])
            ], Angularjs);
            exports_2("Angularjs", Angularjs);
        }
    };
});
//# sourceMappingURL=index.js.map