import PubSub from '../lib/pubsub.js'

export default class Store {
    constructor(params){
        // 왜 여기서 self=this를 하는거지?
        // 그냥 this === Store아님? 질문!!
        let self = this;

        self.actions = {};
        self.mutations = {};
        self.state = {};
        // 이 스테이터스 필드가 언제든지 어떤 작업을 하는지결정하는데 사용된다?
        //We’re also adding a status element that we’ll use to determine what the object is doing at any given time
        self.status = 'resting';
        // 의존성을 주입했다.
        self.events = new PubSub();
        // 그리고 나서 params로 전달된 객체에 action이나 mutation이 전달되었는지 확인하는 작업을 할거야.
        // 이거 그냥 의존성 주입인건데? 
        if (params.hasOwnProperty("actions")){
            self.actions = params.actions;
        }

        if (params.hasOwnProperty("mutations")){
            self.mutations = params.mutations;
        }   


        // 내가 가지고 있는 궁금증 
        // 1. mutation, action이라는 상태는 browser가 제공하는가? 아님 내가 직접 쓰는것인가? => 내가 직접 만든 객체다...
        // 2. 프록시 객체 안에 정의한 함수 내부에서 self.state와 그냥 state는 어떻게 동작하는가?
        // 3. set이라는 trap함수가 어떤식으로 작동하는가...!!!
        self.state = new Proxy((params.state || {}), {
            set: function(state, key, value){
                console.log("what is the status1", self.status)
                console.log("1", self.state)
                console.log("1", state)
                state[key] = value // obj[property] = value
                console.log("2", self.state)
                console.log("2", state)
                console.log("what is the status2", self.status)
                console.log(`state change: ${key}: ${value}`)
                // 원래는  그냥 위에꺼만 동작할텐데,,, 이건 추가작업을 하는거야
                self.events.publish('stateChange', self.state) // 이때 self.stste는 무엇?
                console.log("what is the status3", self.status)
                // status가 뮤테이션이어야함... 뭐야
                if(self.status !== "mutation"){
                    console.warn(`you should use a mutation to set ${key}`);
                }

                self.status = "resting";    

                return true; // 내생각엔 리턴 value인데
                
            }
        })
    }
    // 와 뭔지 하나도 모르겠다.
    // 4. actions, mutations의 value에 callback함수 혹은 그냥 함수가 들어가는구나.
    async dispatch(actionKey, payload){
        let self = this;
        
        if(typeof self.actions[actionKey] !== "function"){
            console.error(`Action ${actionKey} dosen not exist.`);
            return false
        }

        console.group(`ACTION: ${actionKey}`);
        console.log("==action===status 전", self.status);
        // 깊게 함수를 들어가는 것이군!
        self.status = 'action';
        await self.actions[actionKey](self, payload); // actions는 함수 버켓이므로, actions안에 있는 함수,
        // 예를들어 addItem이라면, addItem(self, payload)라는 함수가 실행되는 것
        // 만약 inputValue가 "집청소"인 addItem을 실행했다면,
        // addItem(store 객체 자기자신, "집청소")를 입력한 함수가 실행되게 된다.
        
        console.log("==action===status 후", self.status);
        console.groupEnd();
        
        return true;
    }
    
    async commit(mutationKey, payload){
        let self = this;
        if (typeof self.mutations[mutationKey] !== "function"){
            console.error(`Mutation ${mutationKey} does not exist`);
            return false;
        }
        console.group("여기는 commit 시작")
        console.log("===commit==status 전", self.status);
        
        self.status = 'mutation';
        
        let newState = await self.mutations[mutationKey](self.state, payload);
        console.log("newState     ", newState)
        self.state = await Object.assign(self.state, newState); // set()이 발생하는 구간이라고 추측합니다. => setState랑 같은건가?
        console.log("===commit==status 후", self.status);
        console.log("여기는 commit 끝");
        console.groupEnd();
        return true;
    }


}