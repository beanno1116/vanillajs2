import './styles.css';
import './data';
import { isValid,formatMoney } from './utils';

import { data } from './data';




let filteredData = data;
// console.log(filteredData);

const state = {
    items: data,
    currentItem: {
        name: "",
        size: "",
        price: "",
        category: "",
    },
    priceSortDirection: 'down',
    sortType: 'price'
}

const getTotal = () => {
    return filteredData.reduce((acc,curr) => {
        return acc + +curr.price;
    },0);
}

const getCheapestItem = () => {
    
    return filteredData.reduce((acc,curr) => {
        if (acc.price < curr.price){
            return acc;
        }else{
            return curr;
        }
    },9999)
}

const displayCheapestItem = () => {
    const parent = document.getElementById('stats');
    const divName = "cheapest-div";
    const existing = document.getElementById(divName);
    if (existing){
        parent.removeChild(existing);
    }
    const cheapest = getCheapestItem();
    const div = document.createElement('div');
    div.id = divName;
    div.innerHTML = `The cheapest item is ${cheapest.name} and it is ${formatMoney(cheapest.price)}`;
    parent.appendChild(div);
}

const mostExpensiveItem = () => {
    return filteredData.reduce((acc,curr) => {
        if (acc.price > curr.price){
            return acc;
        }else{
            return curr;
        }
    },0);
}

const displayMostExpensiveItem = () => {
    const parent = document.getElementById('stats');
    const divName = "most-expensive";
    const existing = document.getElementById(divName);
    if (existing){
        parent.removeChild(existing);
    }
    const highest = mostExpensiveItem();
    const div = document.createElement('div');
    div.id = divName;
    
    div.innerHTML = `The most expensive item is ${highest.name} and it is ${formatMoney(highest.price)}`
    parent.appendChild(div);
}

const compare = (a,b) => {
    const fieldA = a.price;
    const fieldB = b.price;

    let comparison = 0;
    if (fieldA > fieldB){
        if (state.priceSortDirection === "down"){
            comparison = 1;
        }else{
            comparison = -1;
        }
    }else if (fieldA < fieldB){
        if (state.priceSortDirection === 'down'){
            comparison = -1;
        }else{
            comparison = 1;
        }
    }
    return comparison;
}

const sortData = () => {
    const sortedData = [...filteredData].sort(compare);
    filteredData = sortedData;
    buildTable();
}

const handleSortClick = (e) => {
    const caret = document.getElementById('price-caret');
    caret.classList.remove('top');
    caret.classList.remove('down');
    sortData();
    if (state.priceSortDirection === "down"){
        state.priceSortDirection = 'top';
        caret.classList.add('top');
    }else{
        state.priceSortDirection = 'down';
        caret.classList.add('down');
    }
    caret.removeEventListener('click',handleSortClick);
}

const assignCaretEvent = () => {
    const caret = document.getElementById('price-caret');
    caret.addEventListener('click',handleSortClick);
}


const addSvg = () => {
    state.items.forEach(i => {
        const svg = document.createElementNS("http://www.w3.org/2000/svg","svg");
        const path = document.createElementNS("http://www.w3.org/2000/svg","path");
        svg.setAttribute('viewbox','0 0 24 24');
        svg.setAttribute('height','24px');
        svg.setAttribute('width','24px');
        path.setAttribute('d','M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z');
        svg.appendChild(path);
        const div = document.getElementById('trash-' + i.id);
        div.appendChild(svg);

    })
}

const buildDeleteLinks = () => {
    const deletes = document.querySelectorAll('td[data-delete');
    for(let del of deletes){
        del.addEventListener("click",e => {
            deleteItem(+e.currentTarget.id.substring(3));
        })
    }
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

    // console.log(result);
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
    html += `<tr><th>Products</th><th>Size</th><th class="header-sort"><span>Price</span><span id="price-caret" class="chevron ${state.priceSortDirection}"></span></th><th>Category</th><th>Delete</th></tr>`;

    filteredData.map(item => {
        const {name,id,price,category,size} = item;
        html += `<tr><td>${name}</td><td>${size}</td><td>${formatMoney(price)}</td><td>${category}</td><td id="tr-${id}" style="cursor:pointer;" data-delete="${id}"><div style="text-align:center;" id="trash-${id}"></div></td></tr>`
    })
    html += `<tr><td colspan="2"></td><td>${formatMoney(getTotal())}</td><td colspan="2"></td></tr>`;
    html += '</table>';
    document.getElementById('items').innerHTML = html;
    buildDeleteLinks();
    displayCheapestItem();
    displayMostExpensiveItem();
    addSvg();
    assignCaretEvent();
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

    let html = '<select id="category-filter"><option value="0">Select a category to filter</option>';
    categories.map(c => {
        html += `<option value="${c}">${c}</option>`;
    })
    html += "</select>";
    document.getElementById('filter').innerHTML = html;
    const newSelect = document.getElementById('category-filter');
    newSelect.addEventListener('change',handleFilterChange);
}

buildFilterBox();

const deleteItem = id => {
    const itemIndex = state.items.findIndex(i => i.id === id);
    if ( itemIndex && itemIndex > 0){
        const copiedItems = Array.from(state.items);
        copiedItems.splice(itemIndex, 1);
        state.items = copiedItems;
        filteredData = copiedItems;
        buildTable();
    }
}

const saveButton = document.getElementById('save-item');

const clearForm = () => {
    Object.keys(state.currentItem).map(key => {
        document.getElementById(key).value = "";
    })
}

const saveItem = () => {
    const copyItems = [...state.items,state.currentItem];
    state.items = copyItems;
    filteredData = copyItems;
    clearForm();
    buildTable();
}
saveButton.addEventListener('click',saveItem);

const createItemCategory = () => {
    const categories = data.unique('category');
    let html = `<select id="category"><option value="0">Select a category</option>`;
    categories.map(c => {
        html += `<option value="${c}">${c}</option>`;
    })
    html += "</select>";
    document.getElementById('item-category').innerHTML = html;
    const newSelect = document.getElementById('category');
    newSelect.addEventListener('change',changeState);
}

createItemCategory();