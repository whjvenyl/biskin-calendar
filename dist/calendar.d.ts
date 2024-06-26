declare interface Atomico<Props, PropsForInstance, Base>
extends AtomicoStatic<Props> {
    new (
    props?: JSXProxy<
    DOMTag<DOMThis<Base>, Props>,
    AtomicoThis<PropsForInstance, Base>
    >
    ): AtomicoThis<PropsForInstance, Base>;
}

declare interface AtomicoStatic<Props> extends HTMLElement {
    styles: Sheets[];
    props: SchemaInfer<Props>;
    /**
     * Meta property, allows associating the component's
     * props in typescript to external environments.
     */
    readonly "##props": Props;
    /**
     * Allows to identify a constructor created with Atomico
     */
    readonly "##atomico": true;
}

declare type AtomicoThis<Props = {}, Base = HTMLElement> = Props &
DOMThis<Base> & {
    update(): Promise<void>;
    updated: Promise<void>;
    mounted: Promise<void>;
    unmounted: Promise<void>;
    readonly symbolId: unique symbol;
};

export declare const CalendarDate: Atomico<    {
months: number;
value: string;
firstDayOfWeek: DaysOfWeek;
isDateDisallowed: (date: Date) => boolean;
min: string;
max: string;
locale: string | undefined;
focusedDate: string | undefined;
onFocusDay: (event: CustomEvent<Date>) => any;
showOutsideDays: boolean;
showWeekNumbers: boolean;
disableNavigation: boolean;
formatWeekNumbers: (weekNumber: number) => string;
readonly: boolean;
onChange: (event: Event) => any;
} & {}, {
months: number;
value: string;
firstDayOfWeek: DaysOfWeek;
isDateDisallowed: (date: Date) => boolean;
min: string;
max: string;
locale: string | undefined;
focusedDate: string | undefined;
onFocusDay: (event: CustomEvent<Date>) => any;
showOutsideDays: boolean;
showWeekNumbers: boolean;
disableNavigation: boolean;
formatWeekNumbers: (weekNumber: number) => string;
readonly: boolean;
onChange: (event: Event) => any;
} & {}, {
new (): HTMLElement;
prototype: HTMLElement;
}>;

export declare type CalendarDateProps = ComponentProps<typeof CalendarDate>;

export declare const CalendarMonth: Atomico<    {
offset: number;
onSelectDay: (event: CustomEvent<string>) => any;
onFocusDay: (event: CustomEvent<string>) => any;
onHoverDay: (event: CustomEvent<string>) => any;
} & {}, {
offset: number;
onSelectDay: (event: CustomEvent<string>) => any;
onFocusDay: (event: CustomEvent<string>) => any;
onHoverDay: (event: CustomEvent<string>) => any;
} & {}, {
new (): HTMLElement;
prototype: HTMLElement;
}>;

export declare type CalendarMonthProps = ComponentProps<typeof CalendarMonth>;

export declare const CalendarMulti: Atomico<    {
months: number;
value: string;
firstDayOfWeek: DaysOfWeek;
isDateDisallowed: (date: Date) => boolean;
min: string;
max: string;
locale: string | undefined;
focusedDate: string | undefined;
onFocusDay: (event: CustomEvent<Date>) => any;
showOutsideDays: boolean;
showWeekNumbers: boolean;
disableNavigation: boolean;
formatWeekNumbers: (weekNumber: number) => string;
readonly: boolean;
onChange: (event: Event) => any;
} & {}, {
months: number;
value: string;
firstDayOfWeek: DaysOfWeek;
isDateDisallowed: (date: Date) => boolean;
min: string;
max: string;
locale: string | undefined;
focusedDate: string | undefined;
onFocusDay: (event: CustomEvent<Date>) => any;
showOutsideDays: boolean;
showWeekNumbers: boolean;
disableNavigation: boolean;
formatWeekNumbers: (weekNumber: number) => string;
readonly: boolean;
onChange: (event: Event) => any;
} & {}, {
new (): HTMLElement;
prototype: HTMLElement;
}>;

export declare type CalendarMultiProps = ComponentProps<typeof CalendarMulti>;

export declare const CalendarRange: Atomico<    {
months: number;
value: string;
firstDayOfWeek: DaysOfWeek;
isDateDisallowed: (date: Date) => boolean;
min: string;
max: string;
locale: string | undefined;
focusedDate: string | undefined;
onFocusDay: (event: CustomEvent<Date>) => any;
showOutsideDays: boolean;
showWeekNumbers: boolean;
disableNavigation: boolean;
formatWeekNumbers: (weekNumber: number) => string;
readonly: boolean;
onChange: (event: Event) => any;
onRangeStart: (event: CustomEvent<Date>) => any;
onRangeEnd: (event: CustomEvent<Date>) => any;
} & {}, {
months: number;
value: string;
firstDayOfWeek: DaysOfWeek;
isDateDisallowed: (date: Date) => boolean;
min: string;
max: string;
locale: string | undefined;
focusedDate: string | undefined;
onFocusDay: (event: CustomEvent<Date>) => any;
showOutsideDays: boolean;
showWeekNumbers: boolean;
disableNavigation: boolean;
formatWeekNumbers: (weekNumber: number) => string;
readonly: boolean;
onChange: (event: Event) => any;
onRangeStart: (event: CustomEvent<Date>) => any;
onRangeEnd: (event: CustomEvent<Date>) => any;
} & {}, {
new (): HTMLElement;
prototype: HTMLElement;
}>;

export declare type CalendarRangeProps = ComponentProps<typeof CalendarRange>;

declare type CheckEvent<CurrentEvent, True> = CurrentEvent extends Event ? True : never;

declare type ComponentProps<T extends abstract new (...args: any) => any> = Simplify<Partial<Omit<InstanceType<T>, keyof HTMLElement | keyof AtomicoThis>>>;

declare type DaysOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6;

declare interface DOM$Attrs {
    [prop: `\$${string}`]: Nullable<string>;
}

declare type DOMCleanKeys =
| keyof DOMGenericProperties
| `add${string}`
| `get${string}`
| `set${string}`
| `has${string}`
| `matches${string}`
| `remove${string}`
| `replace${string}`
| `querySelector${string}`
| `offset${string}`
| `append${string}`
| `request${string}`
| `scroll${string}`
| `is${string}`
| `toggle${string}`
| `webkit${string}`
| `insert${string}`
| `client${string}`
| `child${string}`
| `${string}_${string}`
| `${string}HTML`
| `${string}Child`
| `${string}Validity`
| `${string}Capture`
| `${string}ElementSibling`
| "classList"
| "attributes"
| "normalize"
| "closest"
| "localName"
| "contains"
| "animate"
| "attachShadow"
| "outerText"
| "attachInternals"
| "click"
| "tagName"
| "focus"
| "submit"
| "accessKeyLabel"
| "elements"
| "isContentEditable"
| "innerText"
| "prepend"
| "namespaceURI"
| "blur"
| "dataset"
| "shadowRoot"
| keyof Omit<ChildNode, "textContent">;

declare type DOMCustomTarget<Target> = { customTarget: Target };

declare type DOMEvent<
Target = HTMLElement,
CurrentEvent = Event
> = Target extends string
? CurrentEvent extends AtomicoStatic<any>
? DOMGetEvent<Target, CurrentEvent>
: DOMEventType<Target, CurrentEvent>
: DOMTarget<DOMThis<Target>, CurrentEvent>;

declare type DOMEventHandler<Target, Handler> = Handler extends (
ev: infer CurrentEvent
) => any
? CurrentEvent extends Event
? (ev: DOMEvent<Target, CurrentEvent>) => any
: Handler
: Handler;

/**
 * @todo Rename Handler to Listener
 */

declare type DOMEventHandlerKeys<P> = {
    [I in keyof P]-?: NonNullable<P[I]> extends DOMEventHandlerValue<infer E>
    ? CheckEvent<E, I>
    : P[I] extends { value: DOMEventHandlerValue<infer E> }
    ? CheckEvent<E, I>
    : never;
}[keyof P];

declare interface DOMEventHandlerType extends FunctionConstructor {}

declare interface DOMEventHandlerValue<CurrentEvent> {
    (event: CurrentEvent): any;
}

declare type DOMEvents<Target> = {
    [Prop in keyof Target]?: Prop extends `on${string}`
    ? DOMEventHandler<Target, Target[Prop]>
    : Target[Prop];
};

declare type DOMEventTarget<CurrentEvent, CurrentTarget, Target> = {
    [I in keyof CurrentEvent]: I extends "currentTarget"
    ? CurrentTarget
    : I extends "target"
    ? Target
    : CurrentEvent[I];
};

declare type DOMEventType<Type extends string, CurrentEvent> = {
    [I in keyof "0" as `on${Type}`]: {
        type: DOMEventHandlerType;
        value: DOMEventHandlerValue<CurrentEvent>;
    };
};

declare interface DOMGenericProperties {
    style?: string | Partial<CSSStyleDeclaration> | object;
    class?: string;
    id?: string;
    slot?: string;
    part?: string;
    is?: string;
    tabindex?: string | number;
    role?: string;
    shadowDom?: boolean | Partial<ShadowRootInit>;
    staticNode?: boolean;
    cloneNode?: boolean;
    width?: string | number;
    height?: string | number;
    key?: any;
    children?: any;
}

declare type DOMGetEvent<
Type extends string,
Element extends AtomicoStatic<any>
> = Element extends {
    "##props": infer Props;
}
? `on${Type}` extends keyof Props
? DOMGetEventBefore<NonNullable<Props[`on${Type}`]>, DOMThis<Element>>
: Event
: Event;

declare type DOMGetEventBefore<Value, Target> = Value extends DOMEventHandlerValue<
infer Event
>
? DOMEvent<HTMLElement, Event & DOMCustomTarget<Target>>
: null;

declare type DOMRef<Target> = {
    ref?: DOMRefValue<Target>;
};

declare type DOMRefValue<Target> = FillObject | ((target: Target) => any);

declare type DOMTag<Element, Props = null> = Props extends null
? PropsNullable<
Omit<DOMEvents<Element>, DOMCleanKeys> &
DOMGenericProperties &
DOMRef<Element>
> &
DOM$Attrs &
DOMUnknown
: PropsNullable<
Props &
Omit<DOMEvents<Element & Props>, keyof Props | DOMCleanKeys> &
DOMGenericProperties &
DOMRef<Element & Props>
> &
DOM$Attrs &
DOMUnknown;

declare type DOMTarget<
Target,
CurrentEvent,
Targets = Element | Node
> = CurrentEvent extends {
    customTarget: infer EventTarget;
}
? DOMTarget<Target, Omit<CurrentEvent, "customTarget">, EventTarget>
: DOMEventTarget<CurrentEvent, Target, Targets>;

declare type DOMThis<Element> = Element extends new (
...args: any[]
) => infer This
? This
: Element;

declare interface DOMUnknown {
    [prop: string]: any;
}

declare type EventInit_2 = CustomEventInit<any> & {
    type: string;
    base?: typeof CustomEvent | typeof Event;
};

declare type FillArray = any[];

declare type FillConstructor = abstract new (...args: any) => any;

declare type FillFunction = (...args: any[]) => any;

/**
 * Interface to fill in unknown properties like any | null | undefined
 */
declare interface FillObject {
    [index: string]: any;
}

declare type FillPromise = Promise<any>;

declare type GetTypeSelf<value extends TypesSelfValues> = {
    [I in keyof SelfConstructors]-?: value extends InstanceType<
    SelfConstructors[I]
    >
    ? keyof value extends keyof InstanceType<SelfConstructors[I]>
    ? SelfConstructors[I]
    : never
    : never;
}[keyof SelfConstructors];

declare type JSXProxy<Props, This> = {
    [I in keyof Props]?: I extends `on${string}`
    ? NonNullable<Props[I]> extends DOMEventHandlerValue<infer CurrentEvent>
    ? Nullable<
    (
    ev: DOMEventTarget<CurrentEvent, This, Element | Node>
    ) => any
    >
    : Props[I]
    : I extends "ref"
    ? DOMRefValue<This>
    : Props[I];
};

declare type Nullable<T> = NonNullable<T> | undefined | null;

declare type PropsNullable<Data> = {
    [I in keyof Data]?: Nullable<Data[I]>;
};

declare type SafeGlobal =
| "Event"
| "URL"
| "Range"
| "Image"
| "Crypto"
| "File"
| "Date"
| "Set"
| "Map"
| "RegExp"
| "Animation"
| `${string}Event`
| `Event${string}`
| `Clipboard${string}`
| `Animation${string}`
| `Form${string}`
| `Font${string}`
| `DOM${string}`
| `Touch${string}`
| `Mutation${string}`
| `Intersection${string}`
| `Message${string}`
| `HTML${string}`
| `SVG${string}`
| `Audio${string}`
| `Document${string}`
| `Weak${string}`
| `CSS${string}`
| `File${string}`;

declare type SchemaAny<Type> =
| SchemaReflect<{
    value: Type;
}>
| SchemaReflect<{
    value: () => Type;
}>
| SchemaReflect<{}>;

declare type SchemaBase = SchemaEvent & {
    attr?: string;
};

declare type SchemaEvent = {
    event?: EventInit_2;
};

declare type SchemaInfer<Props> = Required<
Omit<
    {
    [I in keyof Props]: Type<Props[I]>;
},
DOMEventHandlerKeys<Props>
>
>;

declare type SchemaOnlyPropWrapper<Constructor, Type> =
| SchemaProp<{
    type: Constructor;
}>
| SchemaProp<{
    type: Constructor;
    value: Type;
}>
| SchemaProp<{
    type: Constructor;
    value: () => Type;
}>;

declare type SchemaProp<type> = SchemaEvent & type;

declare type SchemaReflect<type> = SchemaBase & {
    reflect?: boolean;
} & type;

declare type SchemaReflectWrapper<Constructor, Type> =
| SchemaReflect<{
    type: Constructor;
}>
| SchemaReflect<{
    type: Constructor;
    value: Type;
}>
| SchemaReflect<{
    type: Constructor;
    value: () => Type;
}>;

declare type SchemaTypeCustom =
| TypeCustom<FillFunction>
| SchemaReflectWrapper<TypeCustom<FillFunction>, any>;

declare type Self = typeof window;

declare type SelfConstructors = Pick<
Self,
    {
    [I in keyof Self]-?: I extends string
    ? I extends Capitalize<I>
    ? Self[I] extends FillConstructor
    ? Self[I] extends SelfIgnore
    ? never
    : I extends SafeGlobal
    ? I
    : never
    : never
    : never
    : never;
}[keyof Self]
>;

declare type SelfIgnore =
| StringConstructor
| NumberConstructor
| BooleanConstructor
| FunctionConstructor
| ObjectConstructor
| PromiseConstructor
| SymbolConstructor
| ArrayConstructor;

declare type Sheet = CSSStyleSheet | HTMLStyleElement;

declare type Sheets = Sheet | Sheet[] | Sheets[];

declare type Simplify<T> = {
    [K in keyof T]: T[K];
} & {};

declare type Type<type> = type extends string
? TypeString<type>
: type extends number
? TypeNumber<type>
: type extends boolean
? TypeBoolean
: type extends TypeCustom<FillFunction>
? SchemaTypeCustom
: type extends FillPromise
? TypePromise<type>
: type extends symbol
? TypeSymbol<type>
: type extends FillArray
? TypeArray<type>
: type extends DOMStringMap
? TypeObject<type>
: type extends TypesSelfValues
? GetTypeSelf<type> extends never
? TypesDiscard<type>
: TypeConstructor<GetTypeSelf<type>>
: TypesDiscard<type>;

declare type TypeAny<type = any> = null | SchemaAny<type>;

declare type TypeArray<type extends FillArray> =
| ArrayConstructor
| SchemaReflectWrapper<ArrayConstructor, type>;

declare type TypeBoolean =
| BooleanConstructor
| SchemaReflectWrapper<BooleanConstructor, true | false>;

declare type TypeConstructor<type extends FillConstructor> =
| type
| SchemaOnlyPropWrapper<type, InstanceType<type>>;

declare type TypeCustom<Map extends FillFunction> = {
    name: "Custom";
    map: Map;
    serialize?: (value: ReturnType<Map>) => string;
};

declare type TypeFunction<type extends FillFunction> =
| FunctionConstructor
| SchemaOnlyPropWrapper<FunctionConstructor, type>;

declare type TypeNumber<type extends number> =
| NumberConstructor
| SchemaReflectWrapper<NumberConstructor, type>;

declare type TypeObject<type extends FillObject> =
| ObjectConstructor
| SchemaReflectWrapper<ObjectConstructor, type>;

declare type TypePromise<type extends FillPromise> =
| PromiseConstructor
| SchemaOnlyPropWrapper<PromiseConstructor, type>;

declare type TypesDiscard<type> = type extends FillFunction
? TypeFunction<type>
: type extends FillObject
? TypeObject<type>
: TypeAny<type>;

declare type TypesSelfValues = {
    [I in keyof SelfConstructors]-?: InstanceType<SelfConstructors[I]>;
}[keyof SelfConstructors];

declare type TypeString<type extends string> =
| StringConstructor
| SchemaReflectWrapper<StringConstructor, type>;

declare type TypeSymbol<type extends symbol> =
| SymbolConstructor
| SchemaOnlyPropWrapper<SymbolConstructor, type>;

export { }
// this is just a hacky workaround to ensure the global declarations make it into the dts rollup
// they get appended to the end of the file on vite build
declare global {
  interface HTMLElementTagNameMap {
    "calendar-month": InstanceType<typeof CalendarMonth>;
    "calendar-date": InstanceType<typeof CalendarDate>;
    "calendar-multi": InstanceType<typeof CalendarMulti>;
    "calendar-range": InstanceType<typeof CalendarRange>;
  }
}
