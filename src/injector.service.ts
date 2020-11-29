import 'reflect-metadata';
import { IDisposable } from './idisposable.interface';
import { InjectionTypes } from './injection.types.enum';
import { IType } from './itype.interface';


export class InjectorService implements IDisposable {

    private _map: Map<any, any>;

    public constructor() { this._map = new Map(); }

    public resolve<T>(target: IType): any {
        const tokens = Reflect.getMetadata('design:paramtypes', target) || [];

        const injectionType = Reflect.getMetadata('design:injectiontype', target) || InjectionTypes.Transient;

        const parameters = tokens.map((parameter: IType) => {
            return this.resolve<T>(parameter);
        });

        if (injectionType === InjectionTypes.Singleton) {
            const oldInstance = this._map.get(target);

            if (oldInstance) { return oldInstance; }
        }

        const newClassInstance = new target<T>(...parameters);

        if (injectionType === InjectionTypes.Singleton) {
            this._map.set(target, newClassInstance);
        }

        return newClassInstance;
    }

    public dispose() {
        for (const item in this._map.values()) {
            if (typeof item['dispose'] === 'function') {
                item['dispose']();
            }
        }

        this._map.clear();
    }
}
