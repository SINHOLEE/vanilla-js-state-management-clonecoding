import Component from '../lib/component.js';
import store from '../store/index.js';

export default class Count extends Component {
    constructor(){
        console.log('count');
        super({
            store,
            element: document.querySelector('.js-count')
        }); // store는 관리하고 싶은 데이터들의 버켓, element는 이 컴포넌트가 바라보고 있는 돔 객체
        // 생성자로 넘어간 element는 this.element = props.element로 할당되어서 render함수 안의
        // this.element는 이 클래스에서 선언한 .js-count 돔을 가리킨다.
    }

    render() {
        let suffix = store.state.items.length !== 1 ? "s" : ""; // 복수 표현하려고..
        let emoji = store.state.items.length > 0 ? '&#x1f64c;' : '&#x1f622;'; 

        this.element.innerHTML = `
            <small>You've done</small>
            ${store.state.items.length}
            <small>thing${suffix} today ${emoji}</small>
        `; // aside 에 필요한 공간 지금까지 할일이 남은 개수 표현

    }
}