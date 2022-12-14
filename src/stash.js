const pipe = 
    (...fns) => 
    (x) => fns.reduce((v,f) => f(v),x);

    const getName =(person => person.name);
    console.log(getName({name: "mike"}));


const capatilizeFirstLetter = x => x.charAt(0).toUpperCase() +  x.slice(1);
console.log(capatilizeFirstLetter(getName( {name: "mike"})));


const getTwoLetters = x => x.substr(0,2);

const reverse = x => x.split("").reverse().join('');

console.log(reverse(getTwoLetters(capatilizeFirstLetter(getName({ name: "mike"})))));

const append = x => `${x} a bitch`;

console.log(append(reverse(getTwoLetters(capatilizeFirstLetter(getName({ name: "mike"}))))));

const r1 = pipe(getName,capatilizeFirstLetter,getTwoLetters,reverse, append)({name: 'mike'});
console.log(r1);


const data = [
    {
        boy: 'jeffrey',
        faction: 'bathhouse'
    },
    {
        boy: 'steven',
        faction: 'hitchhiker'
    }
]

export const Box = x => ({
    map: (f) => Box(f(x)),
    inspect: `Box${x}`,
    fold: (f) => f(x)
})


const findJeffrey = data => Box(data)
.map((x) => x.filter((b) => b.faction === 'bathhouse')[0])
.map(x=>x.boy)
.fold((x) => x);

console.log(findJeffrey(data));

const getFoodBetweenOneAndTwo = data => Box(data)
.map(x => x.filter(f => f.category === 'beverages'))
.map(x => x.filter(f => f.price > 1.0))
.map(x => x.filter(f => f.price <= 2.0))
.map(x => x.map(f => f.price))
.map(x => x.map(f => parseFloat(f)))
.map(x => x.reduce((a,c) => a + c))
.fold(x => x);

const r2 = getFoodBetweenOneAndTwo(data);
console.log(r2);

const filterData = property => {
    return function(value){
        return data.filter(i => i[property] === value);
    }
}

const curriedFilter = filterData('category');
const fruits = curriedFilter('fruit');
console.log(fruits)

const beverages = curriedFilter('beverages');
console.log(beverages);

const candy = curriedFilter('candy');
console.log(candy);

const addSubtractMultiply = a => {
    return function(b){
        return function(c){
            return function(d){
                return (a + b - c) * d;
            }
        }
    }
}

const step1 = addSubtractMultiply(10);
const step2 = step1(2);
const step3 = step2(3);
const result = step3(9);
console.log(result);