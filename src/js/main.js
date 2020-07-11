// store 의존성의 집합체 -> 하나의 인스턴스를 가지고 작동하는건가?
import store from './store/index.js';

import Count from './components/count.js';
import List from './components/list.js';
import Status from './components/status.js';

console.log(store);

const countInstance = new Count();
const listInstance = new List();
const statusInstance = new Status();

const fromElement = document.querySelector('.js-form');
const inputElement = document.querySelector('#new-item-field');


const submitHandle = (event) =>{
    event.preventDefault();
    
    let value = inputElement.value.trim();
    console.log("asdasd")

    if (value.length){
        store.dispatch('addItem', value);
        
        inputElement.value = '';
        inputElement.focus(); // 해당 엘레먼츠에 커서가 있도록 유지
    }
}

fromElement.addEventListener('submit', submitHandle);
countInstance.render();
listInstance.render();
statusInstance.render();
