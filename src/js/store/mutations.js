// mutations interface 역할을 하는것인가? // doa느낌이 강하다.

export default {
    // 이 함수를 호출할때, state는 객체 주소를 받고, payload는 뭔지 모르겠다. 아마 새로 추가되는 혹은 삭제되는 대상이겠지
    // 이 대상이 객체인가? string인가? 확인해야한다. 
    async addItem(state, payload){
        console.group("여기는 mutations -> addItem")
        console.log("state ", state)
        console.log("payload ", payload)
        console.log("여기는 mutations -> addItem 끝")
        await state.items.push(payload);
        console.log("state push 후 ", state)
        console.groupEnd()
        return state;
    },

    async clearItem(state, payload){

        // 이 로직은 작동하지 않는다. 왜? 
        // 1. state는 싱글톤 객체이므로 새롭게 변할 수 없다. 특히 proxy 객체이다.
        // 2. 그렇기때문에 재 할당 let, const 둘다 작동하지 않는다.
        // 3. 즉 원본 배열을 수정할 수 있는 splice 함수가 제대로 작동되는 것이다.
        // {
        //     let result = state.items.filter((item,idx) => {
        //         console.log("-------------------------------muta -> clearItem")
        //         return idx !== payload.index}); // 내로직
        //     return result; 
        // }
        console.group("여기는 mutations -> clearItem 변하기 전")
        console.log("state 전 ", state)
        console.log("payload 전 ", payload)
        
        await state.items.splice(payload.index, 1); // payload가 뭐야?
        console.log("state 후 ", state)
        console.log("payload 후 ", payload)
        console.log("여기는 mutations -> clearItem 끝")
        console.groupEnd()
        return state;
    }
}