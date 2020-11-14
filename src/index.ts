import { InjectorManager } from './injector.manager';

export const injectorInstance = new InjectorManager();
export { Injectable } from './decorator.constant';
export { IDisposable } from './idisposable.interface';
export { InjectionTypes } from './injection.types.enum';
