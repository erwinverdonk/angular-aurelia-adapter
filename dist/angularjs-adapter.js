"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var aurelia_framework_1 = require("aurelia-framework");
var angularjs_compiler_1 = require("./angularjs-compiler");
var Angularjs = (function () {
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
    aurelia_framework_1.bindable
], Angularjs.prototype, "controller", void 0);
__decorate([
    aurelia_framework_1.bindable
], Angularjs.prototype, "modules", void 0);
Angularjs = __decorate([
    aurelia_framework_1.noView(),
    aurelia_framework_1.processContent(false),
    aurelia_framework_1.inject(Element)
], Angularjs);
exports.Angularjs = Angularjs;
