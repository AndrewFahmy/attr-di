import { InjectorService } from './injector.service';
import { IType } from './itype.interface';

export class InjectorManager {
    private _service: InjectorService;

    public constructor() { this._service = new InjectorService(); }

    public getInstance<T>(target: IType): T {
        return this._service.resolve(target) as T;
    }

    public getInstanceWithParameter<T, Tparameter>(target: IType): T {
        return this._service.resolve<Tparameter>(target) as T;
    }
}
