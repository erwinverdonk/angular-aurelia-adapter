import {bindable, inject, processContent, noView} from "aurelia-framework"
import {AngularJSCompiler} from "./angularjs-compiler"

@noView()
@processContent(false)
@inject(Element)
export class Angularjs {
  @bindable
  controller = {}

  @bindable
  modules: Array<string>|string = []

  constructor(private element: Element) {}

  attached () {
    if(this.element.children.length !== 1){
      throw "The content of <angularjs> must be a single HTMLElement"
    }

    AngularJSCompiler
      .create([].concat(this.modules))
      .compile(this.element.children[0], this.controller)
  }
}
