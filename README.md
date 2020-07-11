# Vanilla JS State Manager 를 만들어 보자

## 목표

- react, vue 등 다양한 프레임 워크를 수박 겉 핥기 식으로 다루어 보았습니다. 이때 항상 같이 사용하는 라이브러리가 전역 state 관리 툴인데, 이 도구 사용 없이 프로젝트를 진행하다보니 과연 없으면 얼마나 불편할까가 궁금했습니다. 하여 해당 프로젝트를 진행하면서, state 관리 라이브러리의 로직은 어떻게 동작하는지 직접 코드로 짜보면서 이해하는 시간을 가지려고 합니다.

- 해당 프로젝트는 [링크](https://css-tricks.com/build-a-state-management-system-with-vanilla-javascript)를 필두로 쫒아가는 방식으로 진행합니다.

### 라이브러리 개발

#### 1. pub/sub 디자인 패턴

- 해당 어플리케이션은 우리가 다른 이벤트를 `구독` 하는 함수를 만드는 것입니다. 
- 또한 우리가 주시하고 있는 이벤트를 `publish` 하는 어플리케이션입니다.
- pub/sub 패턴은 이해하기 쉽지 않다.  예를 들자면,
- pub/sub 현실세계 예시
  - 코스요리를 제공하는 식당에는 서버, 요리사, 손님이 있고 손님은 최대한 코스요리를 끊이지 않게 받고 싶어하는 요구가 있다.
  - 서버는 에피타이저를 손님에게 제공한 후, 에피타이저를 다 먹을때 쯤의 타이밍을 파악해서 다음 요리를 준비하도록 요리사에게 `신호`를 보내야 한다. 
  - 요리사는 해당 `신호`를 받으면 그 `신호`에 따른 `요리하기`한다.
  - 여기서 `신호`는 event, `요리하기`는 callback 함수 이다.

#### 2. pubsub.js

```
// 해당 구조로 파일을 만든다.

/js
├── lib
└── pubsub.js
```

```javascript
export default class PubSub {
  constructor() {
    this.events = {};
  }
```

- pubsub이라는 클래스를 생성하고, `this.events`라는 필드를 생상한다.
- `this.events`는 우리가 이름짓는 이벤트들을 담는 역할을 한다.

```javascript
export default class PubSub {
    // What we’ve got there is a fresh new class and 
    // we’re setting this.events as a blank object by default. 
    // The this.events object will hold our named events.
    constructor(){
        this.events = {}
    }

    subscribe(event, callback) {
        let self = this;

        // this.events에 인자로 받은 이벤트가 없다면, 새로운 이벤트를받은것이므로
        // 그 이벤트에 대한 리스트를 만든다.
        // 이렇게 하는 이유는 아중에 타입체크를 하지 않아도 되게끔 하기 위함이다.
        // 이게 무슨말일까
        if(!self.events.hasOwnProperty(event)){
            self.events[event] = [];
        }

        // 위에서 만든 이벤트 리스트에 콜백함수를 append한다. 왜???
        // 아직은 이해가 되지 않는 구조
        // 이때 반환하는 값은 해당 이벤트의 length 왜? 누군가는 콜백개수가 얼마나
        // 남았는지가 유용한 정보일 수 있기 때문에
        return self.events[event].push(callback);
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
        
        //
        // This method first checks to see if the passed event exists in our collection. 
        // If not, we return an empty array. No dramas. 
        // If there is an event, we loop through each stored callback and pass the data into it. 
        // If there are no callbacks (which shouldn’t ever be the case), 
        // it’s all good, because we created that event with an empty array in the subscribe method.
        return self.events[event].map(callback=>callback(data));
    }

    
}
```

- pubsub.js완성

#### 3. sotre

-  contains our application state, a `commit` method that will call our **>mutations**, and lastly, a `dispatch` function that will call our **actions**
-  Amongst this and core to the `Store` object, there will be a Proxy-based system that will monitor and broadcast state changes with our `PubSub` module.
- 즉 핵심함수는 commit과 dispatch 이것은 proxy 패던을 기반으로 하는 동작
