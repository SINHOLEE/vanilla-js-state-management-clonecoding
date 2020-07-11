import Store from '../store/store.js';


// 이걸 상속해서 다른 컴포넌트들을 생성할때마다 이런식으로 관리하겠다?
export default class Component{
    // 프롭스로 뭘 받을까?
    constructor(props = {}){
        let self = this;
        
        // 이 컴포넌트 클래스를 상속받는 자식 컴포넌트에서 랜더함수가 있다면
        // 그 랜더를 바라보고, 아니면 빈 함수를 바라보도록 한다.
        console.group("생성자 확인용")
        console.log("component 생성자 확인용 self",self);
        console.log("component 생성자 확인용 this",this);
        console.log("props ", props);
        console.groupEnd()
    
        this.render = this.render || function() {};  
        // 스토어클래스는 해당 인스턴스를 주는 역할보다는, 컴포넌트안의 생성자 함수 내부에서
        // checking용으로 쓴다.
        if(props.store instanceof Store){
            // global 하게 stateChange이벤트를 갖고, 이는 곧 react하다.
            props.store.events.subscribe('stateChange', ()=>self.render());
        }
        // element는 뭐지?
        if(props.hasOwnProperty('element')){
            this.element = props.element;
        }
    }
}