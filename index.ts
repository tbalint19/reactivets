type Data<T> = {
    get: () => T
    set: (nextValue: T) => void
    subscribe: (func: (param: T) => void) => void
}

const data = <Type>(initialValue: Type): Data<Type> => {

    let value = initialValue

    const subscriptions: Array<(param: Type) => void> = []

    const subscribe = (func: (param: Type) => void): void => {
        func(value)
        subscriptions.push(func)
    }
    
    const get = (): Type => {
        return value
    }

    const set = (nextValue: Type): void => {
        value = nextValue
        for (const func of subscriptions) {
            func(nextValue)
        }
    }

    return { get, set, subscribe }
}

const renderNavbar = (x: unknown): void => console.log("the value in navbar is " + x)
const renderMain = (x: unknown): void => console.log("the value in main is " + x)
const renderFooter = (x: unknown): void => console.log("the value in footer is " + x)

let x = data<number>(5)
x.subscribe(renderNavbar)
x.subscribe(renderMain)
x.subscribe(renderFooter)

x.set(10)
x.set(20)
x.set(30)
x.set(40)
x.set(50)
x.set(60)



