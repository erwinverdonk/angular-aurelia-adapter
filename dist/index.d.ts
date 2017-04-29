/// <reference types="angular" />
declare module "angularjs-compiler" {
    import * as angular from "angular";
    class AngularJSCompiler {
        private _scope;
        private _compile;
        private _injector;
        static create: (modules?: string[] | Node) => AngularJSCompiler;
        constructor(v?: Node | Array<string>);
        destroy: () => void;
        compile: (element: string | Element, scope?: any, maxPriority?: number) => any;
        invoke: (fn: angular.Injectable<Function>, self?: any, locals?: any) => void;
    }
    export { AngularJSCompiler };
}
declare module "angularjs-adapter" {
    export class Angularjs {
        private element;
        controller: {};
        modules: Array<string> | string;
        constructor(element: Element);
        attached(): void;
    }
}
