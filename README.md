# Attr-DI
Attribute based dependency injection library for TypeScript applications

## Installation

Install using **npm**

```
npm install attr-di --save
```

## Configuration
You first need to configure your project **tsconfig.json** file so that **attr-di** can work properly. You need to enable decorators and emit metadata as well

```json
"experimentalDecorators": true,
"emitDecoratorMetadata": true
```


## Usage
Select a class and before adding a decorator you need to select an injection type. Currently this library supports the following Lifetime injection types*

1. **Transient** a new instance will be created.
2. **Singleton** only a single copy will be created on first time it's requested (lazy loading) then this instance will be used throughout the application lifetime.

After selecting a type, delcaring a decorator is pretty easy

```typescript
import { Injectable, InjectionTypes } from "attr-di";

@Injectable(InjectionTypes.Singleton)  // <-- Decorator declaration
export class Service1 {
    ...
}
```


## Injection Patterns
The library can inject an instance using one of 2 patterns

### &nbsp;**Constructor Injection**
&nbsp; This is the most famous type of injection basically all you need to do is to define a variable inside the constructor, just make sure that all created variables are for types that have an `@Injectable()` decorator, otherwise the library won't be able to create an instance

```typescript
export class Component{
    constructor(private service : Service1){}
    ...
}
```


### &nbsp;**Variable Injection**
&nbsp; This is a custom injection pattern. Think of it like a setter injection, you want to create an instance of a class under certain conditions.

```typescript
import { injectorInstance } from 'attr-di';

const component = injectorInstance.resolve<Component>(Component);
```

The first declaration of **Service1** is in the generic form, this part is **Optional** and it's used to define the return type `T`, otherwise it'll return the `any` type.

As for the second declaration this is not an optional parameter, this is the type declaration that will be used to read it's constructor information.