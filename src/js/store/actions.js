// 인터페이스인가?.. service 느낌이 강하다.
export default {
    async addItem(contextEqualStore, payloadEqualParam){
        console.group("여기는 action -> addItem")
        console.log("contextEqualStore", contextEqualStore) // 여기서 context는 store 객체... context는 추상화된 변수 이름
        console.log("payloadEqualParam", payloadEqualParam) // payload는 윗단(dispatch)에서 받아온 벨류
        console.log("status ",contextEqualStore.status);
        console.log("여기는 action -> addItem 끝")
        await contextEqualStore.commit('addItem', payloadEqualParam);
        console.groupEnd()
    },
    async clearItem(contextEqualStore, payloadEqualParam){
        console.group("여기는 action -> clearItem")
        console.log("contextEqualStore", contextEqualStore)
        console.log("payloadEqualParam", payloadEqualParam)
        console.log("status ",contextEqualStore.status);
        console.log("여기는 action -> clearItem 끝")
        await contextEqualStore.commit('clearItem', payloadEqualParam);
        console.groupEnd()
    }

}