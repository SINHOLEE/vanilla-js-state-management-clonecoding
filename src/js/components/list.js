import Component from '../lib/component.js';
import store from '../store/index.js'; // container같은 역할인가?

export default class List extends Component{
    constructor(){
        // 생성자 인자가 원래 props = {}이거였지
        console.log('list');

        super({
            store,
            element: document.querySelector('.js-items')
        });
    }

    render(){
        let self = this;

        if(store.state.items.length === 0){
            // 그냥 vanilla 쓸때 문제점 1. html dom 객체를 다룰때, 쌩으로 타이핑 해야한다.
            self.element.innerHTML = `<p class="no-items">You've done nothing yet &#x1f622;</p>`;
            return;
        }


        self.element.innerHTML = `
        <ul class="app__items">
            ${store.state.items.map(item =>{
                return `
                <li>${item}<button aria-label="elete this item">x</button></li>
                `
            }).join('')}
        </ul>
        `;
        // 만약 .join('')이 없다면 어떻게 될까?

        self.element.querySelectorAll('button').forEach((button, index)=>{
            button.addEventListener('click', ()=>{
                store.dispatch('clearItem', { index });  // 그냥 index면 어떻게 될까? 
            });
        });
    }
};