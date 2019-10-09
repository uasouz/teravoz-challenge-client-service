type Morphism<T, U> = (value: T) => U;
type Predicate<T> = Morphism<T, boolean>;

const matched = (x: any) => ({
    is: () => matched(x),
    otherwise: () => x,
});

export const when = <T,R>(x: T) => ({
    is: (predicate: Predicate<T>, fn: (x: any)=> R): any => {
        return (predicate(x) ? matched(fn(x)) : when(x));
    },
    otherwise: (fn:(x: any)=> R) => fn(x),
});