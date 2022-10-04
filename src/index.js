import './styles.css';


console.log(
    "Ready to start coding"
);

// const pipe = 
//     (...fns) => 
//     (x) => fns.reduce((v,f) => f(v),x);

//     const getName =(person => person.name);
//     console.log(getName({name: "mike"}));


// const capatilizeFirstLetter = x => x.charAt(0).toUpperCase() +  x.slice(1);
// console.log(capatilizeFirstLetter(getName( {name: "mike"})));


// const getTwoLetters = x => x.substr(0,2);

// const reverse = x => x.split("").reverse().join('');

// console.log(reverse(getTwoLetters(capatilizeFirstLetter(getName({ name: "mike"})))));

// const append = x => `${x} a bitch`;

// console.log(append(reverse(getTwoLetters(capatilizeFirstLetter(getName({ name: "mike"}))))));

// const r1 = pipe(getName,capatilizeFirstLetter,getTwoLetters,reverse, append)({name: 'mike'});
// console.log(r1);


// const data = [
//     {
//         boy: 'jeffrey',
//         faction: 'bathhouse'
//     },
//     {
//         boy: 'steven',
//         faction: 'hitchhiker'
//     }
// ]

// const Box = x => ({
//     map: (f) => Box(f(x)),
//     inspect: `Box${x}`,
//     fold: (f) => f(x)
// })


// const findJeffrey = data => Box(data)
// .map((x) => x.filter((b) => b.faction === 'bathhouse')[0])
// .map(x=>x.boy)
// .fold((x) => x);

// console.log(findJeffrey(data));
