import './styles.css';
import './data';
import { isValid } from './utils';
import { data } from './data';



let filteredData = data;
console.log(filteredData);

const state = {
    items: data,
    currentItem: {
        name: "",
        size: "",
        price: "",
        category: "",
    },
}

const changeState = element => {
    const {id, value} = element.target;
    if (!isValid(value) || !isValid(id)) return;
    

    setValue(id,value);

    const result = {
        ...state,
        currentItem: {
            ...(state.currentItem[id] = value)
        }
    }

    console.log(result);
    return result;
}

const setValue = (id, value) => {
    if (!isValid(value)) return;
    document.getElementById(id).value = value;
}

const inputs = document.getElementsByTagName('input');

for(let input of inputs){
    input.addEventListener('change',changeState);
}


const buildTable = () => {
    let html =  `<table style="width:90%;margin:20px auto;color:#000;">`;
    html += '<tr><th>Products</th><th>Size</th><th>Price</th><th>Category</th><th>Delete</th></tr>';

    filteredData.map(item => {
        const {name,price,category,size} = item;
        html += `<tr><td>${name}</td><td>${size}</td><td>${price}</td><td>${category}</td><td>Delete</td></tr>`
    })

    html += '</table>';
    document.getElementById('items').innerHTML = html;
}

buildTable();


Array.prototype.unique = function(field){
    const newArray = [];
    this.forEach(record => {
        const {[field]:targetField} = record;
        if (!newArray.includes(targetField)){
            newArray.push(targetField);
        }
    });
    return newArray;
}

const handleFilterChange = (e) => {
    if (e.target.value === '0'){
        filteredData = state.items;
    }else{
        filteredData = state.items.filter(d => d.category === e.target.value);
    }
    buildTable();
}

const buildFilterBox = () => {
    const categories = data.unique('category');

    let html = '<select id="category-filter"><option value="0">Select a category to filter</option>'
    categories.map(c => {
        html += `<option value="${c}">${c}</option>`;
    })
    html += '</select>';
    document.getElementById('filter').innerHTML = html;
    const newSelect = document.getElementById('category-filter');
    newSelect.addEventListener('change',handleFilterChange);
}

buildFilterBox();