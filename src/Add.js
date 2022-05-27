import styledComponents from "styled-components";
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { useHistory } from "react-router-dom"
import React, { useRef, useState } from "react";
import { useDispatch } from 'react-redux';
import { createWord } from "./redux/modules/word";
import { create } from "@mui/material/styles/createTransitions";
const Add = (props) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const word = useRef(null);
    const pinyin = useRef(null);
    const meaning = useRef(null);
    const example = useRef(null);
    const interpretation = useRef(null);
    const [w, setW] = useState();
    const [p, setP] = useState();
    const [m, setM] = useState();
    const [e, setE] = useState();
    const [i, setI] = useState();

    const addWord = (a, b, c, d, e) => {
        setW(a);
        setP(b);
        setM(c);
        setE(d);
        setI(e);
    }

    React.useEffect(() => {                         // 순수 자바스크립트 문법 가능??
        if (w && p && m && e && i){
            dispatch(createWord(w, p, e, m, i));
            history.goBack();
        }
    }, [w, p, m, e, i])                             // 안에 담긴 변수가 바뀔 떄 실행
                                                 // 몇 개가 바뀌든 한 번만 실행
    return (
        <div>
            <Stack sx={{ width: '30vw', margin: "auto" }} spacing={2}>
                <Alert severity="error">모든 칸을 다 입력해야합니다!</Alert>
            </Stack>
            <AddBox className='add-box'>
                <h3>단어 추가하기</h3>
                <InputBox>
                    <p>단어</p>
                    <Input ref={word}></Input>
                </InputBox>
                <InputBox>
                    <p>병음</p>
                    <Input ref={pinyin}></Input>
                </InputBox>
                <InputBox>
                    <p>의미</p>
                    <Input ref={meaning}></Input>
                </InputBox>
                <InputBox>
                    <p>예문</p>
                    <Input ref={example}></Input>
                </InputBox>
                <InputBox>
                    <p>해석</p>
                    <Input ref={interpretation}></Input>
                </InputBox>
                <Button variant="contained" style={{ marginTop: "20px" }} onClick={() => {
                    word.current.value&&pinyin.current.value&&meaning.current.value
                    &&example.current.value&&interpretation.current.value !== null ?
                     addWord(word.current.value, pinyin.current.value, meaning.current.value, example.current.value, interpretation.current.value,) 
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



export default Add;