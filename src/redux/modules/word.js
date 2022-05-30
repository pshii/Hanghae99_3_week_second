// word.js
import {
    collection,
    doc,
    getDoc,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
// Actions
const CREATE = 'word/CREATE';
const DELETE = 'word/DELETE';
const UPDATEWORD = 'word/UPDATEWORD';
const UPDATECHECK = "word/UPDATECHECK";

// 미들웨어 Actions
const LOAD = "word/LOAD"
const initialState = {
    is_loaded : false,
    list: [
        // { word: "十分", pinyin: "shífēn", meaning: "십분, 매우, 대단히, 충분히", example: "天气十分热", interpretation: "날씨가 대단히 덥다", checked: false },
        // { word: "必要", pinyin: "bìyào", meaning: "필요, 필요로 하는", example: "没有必要再讨论了", interpretation: "다시 토론할 필요가 없다", checked: false },
        // { word: "复印", pinyin: "fùyìn", meaning: "복사(하다), 복제", example: "复印材料", interpretation: "자료를 복사하다.", checked: false },
        // { word: "公演", pinyin: "gōngyǎn", meaning: "공연(하다), 상연(하다)", example: "该剧将于下月公演", interpretation: "그 연극은 다음 달에 공연할 것이다.", checked: false },
        // { word: "冰淇淋", pinyin: "bīngqílín", meaning: "아이스크림", example: "很多人都喜欢吃冰淇淋", interpretation: "많은 사람들이 아이스크림을 좋아한다", checked: false },
    ],
};


// Action Creators
export function createWord(word) {
    return { type: CREATE, word };
}
export function UpdateWord(word_data) {
    return { type: UPDATEWORD, word_data };
}
export function UpdateChecked(word) {
    return { type: UPDATECHECK, word }
}
export function deleteWord(idx) {   // (bucket_index)
    return { type: DELETE, idx };         // bucket_index)
}

// 미들웨어 Action Creators
export function loadWord(word_list) {
    return { type: LOAD, word_list };
}


// middlewares,  리덕스와 파이어베이스랑 통신하는 부분= redux thunk
export const loadWordFB = () => {
    return async function (dispatch) {
        // 데이터를 가져와요!
        const word_data = await getDocs(collection(db, "word_note")); // await Promise로 오는 데이터를 원하는데이터로 변환

        let word_list = [];

        // 하나씩 우리가 쓸 수 있는 배열 데이터로 만들어줍시다!
        word_data.forEach((w) => {
            // 콘솔로 확인해요!
            word_list.push({ id: w.id, ...w.data() }); //원하는 data만 가져옴
        });
        // 잘 만들어졌는 지 리스트도 확인해봐요! :)

        dispatch(loadWord(word_list));
    }
}

export const createWordFB = (word_data) => {
    return async function (dispatch) {  //await getDoc 해야 원하는 데이터값으로 나옴
        const docRef = await addDoc(collection(db, "word_note"), {   //방법 1
            ...word_data, checked: false
        }
        )
        const word = { id: docRef.id, ...word_data };       // 리덕스에만 id가 저장됨 ?         
        dispatch(createWord(word))
        // console.log((await getDoc(docRef)).data()) //await getDoc 해야 원하는 데이터값으로 나옴
        // const _word = await getDoc(docRef);                      // 방법2, 기다릴 필요 없다.
        // const word = {id:_word.id, ..._word.data()};           
        // dispatch(createWord(word))
    }
}
export const updateWordFB = (word_data) => {
    return async function (dispatch, getState) {
        const docRef = doc(db, "word_note", word_data.word_id)
        const _word = {
            word: word_data.word,
            pinyin: word_data.pinyin,
            meaning: word_data.meaning,
            example: word_data.example,
            interpretation: word_data.interpretation,
        }
        await updateDoc(docRef, _word)

        // console.log(getState().word)
        // const _word_list = getState().word.list; // 기존 state 데이터 다 가져오기
        // const word_index = _word_list.findIndex((w)=>{
        //     return w.id === word_data.word_id;
        // })
        dispatch(UpdateWord(_word))
    }
}

export const UpdateCheckedFB = (word) => {
    return async function (dispatch) {
        const docRef = doc(db, "word_note", word.id)

        const c = word.checked ? false : true;

        await updateDoc(docRef, { checked: c })
        dispatch(UpdateChecked(word))
    }
}

export const deleteWordFB = (id) => {
    return async function (dispatch, getState) {
        // if (!id){
        //     window.alert("아이디가 없네요");
        //     return;
        // }
        const docRef = doc(db, "word_note", id)

        await deleteDoc(docRef);

        const word_list = getState().word.list; // 기존 state 데이터 다 가져오기
        const word_index = word_list.findIndex((w) => {
            return w.id === id;
        })
        // console.log(word_index)
        dispatch(deleteWord(word_index))




    }
}





// Reducer                        //이전 값              
export default function reducer(state = initialState, action = {}) { //기존거 없애고,새로운거 추가하는 개념
    switch (action.type) {
        case "word/LOAD": {
            return { list: action.word_list, is_loaded : true }
        }
        case "word/CREATE": {
            // const dicWord = action.word
            // const new_word = {
            //     word: dicWord.word, pinyin: dicWord.pinyin, meaning: dicWord.meaning, id:dicWord.id,
            //      example: dicWord.example, interpretation: dicWord.interpretation, checked: false
            // }; // 새로운 배열 생성 
            // console.log(action.word)
            console.log({ list: [...state.list] })       // !!return 하기도 전에 이미 추가가 되어있다?
            // console.log({ list: [state.list, action.word] })
            console.log({ list: [...state.list, action.word] })
            return { list: [...state.list] }; // 새로운 배열 리턴
        }
        case "word/UPDATEWORD": {
            // const new_word_list = state.list.map((w, i) => {   //인덱스로 접근 값 하나만 바뀔때
            //     if (parseInt(action.idx) === i) {
            //         return {word:action.word, pinyin:action.pinyin, meaning:action.meaning,
            //             example:action.example, interpretation:action.interpretation,
            //         }
            //     }
            //     return {...w};
            // })
            const new_word_list = state.list.map((w, i) => {       // word로 접근, 값 다 바뀔때
                if (w.id === action.word_data.word_id) {
                    return {
                        word: action.word_data.word,
                        pinyin: action.word_data.pinyin,
                        meaning: action.word_data.meaning,
                        example: action.word_data.example,
                        interpretation: action.word_data.interpretation,
                        // checked: action.word_data.checked,
                    }
                }
                return { ...w }
            })
            // console.log({ list: new_word_list })
            return { list: new_word_list }; // 새로운 배열 리턴
        }

        case "word/UPDATECHECK": {
            const new_word_list = state.list.map((v) => {
                if (action.word.id === v.id) {

                    return { ...v, checked: v.checked ? false : true }
                } else {
                    return { ...v }
                }

            });
            // if (parseInt(action.word.word_id) === w.id) {
            //     if (w.checked) {
            //         return { ...w, checked: false }
            //     }
            //     return { ...w, checked: true }
            // }
            // return { ...w }
            // })



            return { list: new_word_list };
        }

        case "word/DELETE": {
            const new_word_list = state.list.filter((v, i) => {
                return parseInt(action.idx) !== i
            });
            // console.log({ list: new_word_list })
            return { list: new_word_list };
        }
        default: return state;
    }

}



