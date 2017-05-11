/// <reference types="angular" />
import * as angular from "angular";
declare class AngularJSCompiler {
    private _scope;
    private _compile;
    private _injector;
    static create: (modules?: string[] | Element) => AngularJSCompiler;
    private constructor(v?);
    destroy: () => void;
    compile: (element: Element, scope?: any) => any;
    invoke: (fn: angular.Injectable<Function>, self?: any, locals?: {}) => void;
}
export { AngularJSCompiler };
