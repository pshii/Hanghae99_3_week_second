import styledComponents from "styled-components";
import Button from '@mui/material/Button';
import { useHistory } from "react-router-dom"
import React, { useRef, useState } from "react";
import { useDispatch } from 'react-redux';
import {useSelector} from "react-redux";
import { useParams } from "react-router-dom";
import { updateWordFB } from "./redux/modules/word";
const Update = (props) =>{
    const word_list = useSelector((state) => state.word.list);
    const dispatch = useDispatch();
    const history = useHistory();
    const {index} = useParams();
    const wordRef = useRef(null);
    const pinyinRef = useRef(null);
    const meaningRef = useRef(null);
    const exampleRef = useRef(null);
    const interpretationRef = useRef(null);
   
   
    // React.useEffect(() => {                         // 순수 자바스크립트 문법 가능??
    //     if (w && p && m && e && i){                 // 첫 렌더링시에 실행 방지
    //         dispatch(UpdateWord(w, p, m, e, i,index));
    //         history.goBack();
    //     }
    // }, [w, p, m, e, i]) 
    const updateWord = (id,checked) => {
        const word= wordRef.current.value;
        const pinyin= pinyinRef.current.value;
        const meaning= meaningRef.current.value;
        const example= exampleRef.current.value;
        const interpretation= interpretationRef.current.value;
        const word_id = id;
        const c = checked;

        // if (word && pinyin && meaning && example && interpretation){

        // }
        if (!(word && pinyin && meaning && example && interpretation)){
            alert('아직 입력하지 않은 항목이 있습니다.');
            return;    
        }
        const realWord = {
            word, pinyin, meaning, example, interpretation, word_id, c
        }
        console.log(realWord)
        dispatch(updateWordFB(realWord));
        history.goBack();
    }
    return (
        <div>
            <AddBox className='add-box' >
                <h3>단어 수정하기</h3>
                <InputBox>
                    <p>단어</p>
                    <Input ref={wordRef} defaultValue={word_list[index]?.word} ></Input>
                </InputBox>
                <InputBox>
                    <p>병음</p>
                    <Input ref={pinyinRef} defaultValue={word_list[index]?.pinyin}></Input>
                </InputBox>
                <InputBox>
                    <p>의미</p>
                    <Input ref={meaningRef}  defaultValue={word_list[index]?.meaning}></Input>
                </InputBox>
                <InputBox>
                    <p>예문</p>
                    <Input ref={exampleRef} defaultValue={word_list[index]?.example}></Input>
                </InputBox>
                <InputBox>
                    <p>해석</p>
                    <Input ref={interpretationRef} defaultValue={word_list[index]?.interpretation}></Input>
                </InputBox>

                <Button variant="contained" style={{ marginTop: "20px" }} onClick={() => {
                    wordRef.current.value&&pinyinRef.current.value&&meaningRef.current.value
                    &&exampleRef.current.value&&interpretationRef.current.value !== null ?
                     updateWord(word_list[index].id, word_list[index].checked) 
                    : alert('아직 입력하지 않은 항목이 있습니다.');
                    // history.goBack();/
                }} >저장하기</Button>
            </AddBox>

        </div>

    );
}
const AddBox = styledComponents.div`
    width : 30vw;
    height : 70vh;
    border: 1px solid #6799FF;
    margin : 20px auto;
    border-radius: 20px;
    font-family: 'Nanum Gothic', sans-serif;

`;
const InputBox = styledComponents.div`
    text-align : left;
    input:focus {
        border-bottom : 2px solid rgba(103,153,255,1);
    }
    padding : 0 20px;
`;
const Input = styledComponents.input`
    outline : none;
    border : none;
    border-bottom : 2px solid rgba(103,153,255,0.3);
    transition : .5s;
    width : 100%;    
    font-size : 1.2rem;
`;


export default Update;