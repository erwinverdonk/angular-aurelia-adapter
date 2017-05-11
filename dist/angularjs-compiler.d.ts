/// <reference types="angular" />
import * as angular from "angular";
declare class AngularJSCompiler {
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
