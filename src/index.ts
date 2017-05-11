export * from "./angular-aurelia-adapter";

export const configure = (aurelia) => {
  aurelia.globalResources("angular-aurelia-adapter/angularjs-adapter");
};
