import { InjectionTypes } from './injection.types.enum';
import { IType } from './itype.interface';

export const Injectable = (injectionType: InjectionTypes): (target: IType<any>) => void => {
    return (target: IType<any>) => {
        Reflect.defineMetadata('design:injectiontype', injectionType, target);
     };
};
