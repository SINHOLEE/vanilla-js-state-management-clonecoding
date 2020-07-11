export default class PubSub {
    // What we’ve got there is a fresh new class and 
    // we’re setting this.events as a blank object by default. 
    // The this.events object will hold our named events.
    constructor(){
        // 이벤트들을 객체로 관리하네?
        this.events = {}
    }

    subscribe(event, callbackForRender) {
        // 이때 디스는 pubsub을 가리킬까?
        let self = this;

        // this.events에 인자로 받은 이벤트가 없다면, 새로운 이벤트를받은것이므로
        // 그 이벤트에 대한 리스트를 만든다.
        // 이렇게 하는 이유는 아중에 타입체크를 하지 않아도 되게끔 하기 위해 이게 무슨말일까
        if(!self.events.hasOwnProperty(event)){
            self.events[event] = [];
        }

        // 위에서 만든 이벤트 리스트에 콜백함수를 append한다. 왜???
        // 아직은 이해가 되지 않는 구조
        // 이때 반환하는 값은 해당 이벤트의 length 왜? 누군가는 콜백개수가 얼마나
        // 남았는지가 유용한 정보일 수 있기 때문에
        console.group("여기는 subcribe 입니다.")
        console.log("this ", this)
        console.log("self ", self)
        console.log("event ", event)
        console.log("callbackForRender ", callbackForRender)
        console.log("self.events ", self.events)
        console.log("여기는 subcribe 끝입니다.")
        self.events[event].push(callbackForRender);
        console.groupEnd()
        return; 
    }

    publish(event, data ={}){
        let self = this;
        // 이건 아마 구독하지 않은 이벤트는 예외처리하는게 아닌가 싶다.
        if (!self.events.hasOwnProperty(event)){
            return [];
        }
        // 내해석
        // 만약 퍼블리시함수가 실행되면서 이벤트와 데이터를 받고,
        // 그 이벤트가 이미 구독중인 이벤트라면, 콜백함수를 data인자로 실행한 뒤에 return된 값을 해당 리스트에 재할당한다.
        console.groupEnd("여기는 publish 입니다.")
        console.log("this ", this)
        console.log("self ", self)
        console.log("event ", event)
        console.log("data ", data)
        console.log("self.events ", self.events)
        //
        // This method first checks to see if the passed event exists in our collection. 
        // If not, we return an empty array. No dramas. 
        // If there is an event, we loop through each stored callback and pass the data into it. 
        // If there are no callbacks (which shouldn’t ever be the case), 
        // it’s all good, because we created that event with an empty array in the subscribe method.
        console.log("여기는 publish 끝입니다.")
        self.events[event].map(callbackEqualRender=>{
            console.log("callbackEqualRender ------------", callbackEqualRender);
            console.log("data-----------------", data);
            // callbackEqualRender(data)}); // data를 넣지 않아도 동작한다... 그리고 없는것이 더 의미가 맞는거 같다.
            callbackEqualRender()}); // 사실 모든 컴포넌트들을 한바퀴 돌리면서 랜더링 해라라는 뜻
        console.groupEnd()
        return;
        }
        

}