import 'reflect-metadata';
import { IDisposable } from './idisposable.interface';
import { InjectionTypes } from './injection.types.enum';
import { IType } from './itype.interface';


export class InjectorService extends Map implements IDisposable {

    public resolve<T>(target: IType<any>): T {
        const tokens = Reflect.getMetadata('design:paramtypes', target) || [];

        const injectionType = Reflect.getMetadata('design:injectiontype', target) || InjectionTypes.Transient;

        const parameters = tokens.map((parameter: IType<any>) => {
            return this.resolve(parameter);
        });

        if (injectionType === InjectionTypes.Singleton) {
            const oldInstance = this.get(target);

            if (oldInstance) { return oldInstance; }
        }

        const newClassInstance = new target(...parameters);

        if (injectionType === InjectionTypes.Singleton) {
            this.set(target, newClassInstance);
        }

        return newClassInstance;
    }

    public dispose() {
        for (const item in this.values()) {
            if (typeof item['dispose'] === 'function') {
                item['dispose']();
            }
        }

        this.clear();
    }
}
