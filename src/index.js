import './styles.css';
import './data';
import { isValid } from './utils';
import { data } from './data';



let filteredData;

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


