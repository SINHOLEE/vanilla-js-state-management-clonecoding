// 배열의 값에 접근할때, 그 객체의 이름을 출력하라

const cats = [
    {name:"aa", age:2},
    {name:"bb", age:3}
]


console.log(cats[0].name)

// 진짜 오버라이드 같네
// 기본 동작에 추가하는 느낌
const catsNameProxy = new Proxy(cats, {
    get: function(target, property){
        const ret = target[property];
        console.log(ret)
        const { name } = ret;
        console.log(`Come here ${name}`)
        return ret;
    }
})

console.log(catsNameProxy[0])

// cats.get()

const handler = {
    get: function(target, property){
        console.log("에에??")
        return property in target ? target[property] : 37;
    }
}

const myProxy = new Proxy({}, handler);

myProxy.a = 1;

console.log(myProxy.b);

const target = {};

const newMyProxy = new Proxy(target, {}); // 함수는 없고, 그냥 타겟만 넘겨줌

newMyProxy.a = 2;

console.log(newMyProxy)

let validator = {
    set: function(obj, prop, value){
        if (prop === "age"){
            if (!Number.isInteger(value)){
                throw new TypeError('The age is not an integer');
            }

            if (value > 200){
                throw new RangeError('The age seems invalid');
            }
        }
        // defalt behavior
        obj[prop] = value;
    }
}

let person = new Proxy({}, validator);

person.age = 100;
console.log(person)
// person.age = 300;
