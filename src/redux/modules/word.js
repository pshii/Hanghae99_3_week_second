// word.js

// Actions
const CREATE = 'word/CREATE';
const DELETE = 'word/DELETE';
const UPDATE = "word/UPDATE";
const initialState = {
    list: [
        { word: "十分ㅇㄹ", pinyin: "shífēn", meaning: "십분, 매우, 대단히, 충분히", example: "天气十分热", interpretation: "날씨가 대단히 덥다" },
        { word: "必要", pinyin: "bìyào", meaning: "필요, 필요로 하는", example: "没有必要再讨论了", interpretation: "다시 토론할 필요가 없다" },
        { word: "复印", pinyin: "fùyìn", meaning: "복사(하다), 복제", example: "复印材料", interpretation: "자료를 복사하다." },
        { word: "公演", pinyin: "gōngyǎn", meaning: "공연(하다), 상연(하다)", example: "该剧将于下月公演", interpretation: "그 연극은 다음 달에 공연할 것이다." },
        { word: "冰淇淋", pinyin: "bīngqílín", meaning: "아이스크림", example: "很多人都喜欢吃冰淇淋", interpretation: "많은 사람들이 아이스크림을 좋아한다" },
    ],
};


// Action Creators
export function createWord(word, pinyin, meaning, example, interpretation) {
    return { type: CREATE, word, pinyin, meaning, example, interpretation };
}
export function complete(bucket_index) {
    return { type: UPDATE, bucket_index }
}
export function deleteBucket(bucket) {   // (bucket_index)
    return { type: DELETE, bucket };         // bucket_index)
}

// Reducer                        //이전 값              
export default function reducer(state = initialState, action = {}) { //기존거 없애고,새로운거 추가하는 개념
    switch (action.type) {
        case "word/CREATE": {
            const new_word = {
                word: action.word, pinyin: action.pinyin, meaning: action.meaning, example: action.example, interpretation: action.interpretation,
                word: action.word, pinyin: action.pinyin, meaning: action.meaning,
                example: action.example, interpretation: action.interpretation
            }; // 새로운 배열 생성 
            console.log({ list: [...state.list, new_word] })
            return { list: [...state.list, new_word] }; // 새로운 배열 리턴
        }
        // case "bucket/UPDATE": {
        //   const new_bucket_list = state.list.map((v, idx) => {
        //     if (parseInt(action.bucket_index) === idx) {
        //       // console.log({ ...v, completed: true })
        //       return { ...v, completed: true }
        //     } else {
        //       return { ...v }
        //     }

        //   });
        //   return { list: new_bucket_list };
        // }
        // case "bucket/DELETE": {
        //   const new_bucket_list = state.list.filter((v, idx) => {
        //     return parseInt(action.bucket) !== idx
        //   });
        //   return { list: new_bucket_list };
        // }
        default: return state;
    }
}



