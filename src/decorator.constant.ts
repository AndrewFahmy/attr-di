import { InjectionTypes } from './injection.types.enum';
import { IType } from './itype.interface';

export const Injectable = (injectionType: InjectionTypes): (target: IType) => void => {
    return (target: IType) => {
        Reflect.defineMetadata('design:injectiontype', injectionType, target);
     };
};
