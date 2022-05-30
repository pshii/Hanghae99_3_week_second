import styledComponents from "styled-components";
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { useHistory } from "react-router-dom"
import React, {useRef} from "react";
import { useDispatch } from 'react-redux';
import { createWord, createWordFB } from "./redux/modules/word";
const Add = (props) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const wordRef = useRef("")
    const pinyinRef = useRef("")
    const meaningRef = useRef("")
    const exampleRef = useRef("")
    const interpretationRef = useRef("");

    // configStore에 createBrowserHistory 안함 
    const addWord = () => {
        const word= wordRef.current.value;
        const pinyin= pinyinRef.current.value;
        const meaning= meaningRef.current.value;
        const example= exampleRef.current.value;
        const interpretation= interpretationRef.current.value;
        
        
        if (!(word && pinyin && meaning && example && interpretation)){
            alert('아직 입력하지 않은 항목이 있습니다.');
            return;    
        }
        const realWord = {
            word, pinyin, meaning, example, interpretation
        }
        dispatch(createWordFB(realWord));
        history.push("/");


        // dispatch(createWordFB({
        //     word: _word,
        //     pinyin: _pinyin,
        //     meaning: _meaning,
        //     example: _example,
        //     interpretation: _interpretation,
        // }))
        // history.goBack();
    }
    

    // React.useEffect(() => {                         // 순수 자바스크립트 문법 가능??
    //     if (w && p && m && e && i){                 // 첫 렌더링시에 실행 방지
    //         // dispatch(createWord(w, p, m, e, i));
    //         dispatch(createWordFB(w,p,m,e,i))
    //     }
    // }, [word])                             // 안에 담긴 변수가 바뀔 떄 실행
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
                    <Input ref={wordRef}></Input>
                </InputBox>
                <InputBox>
                    <p>병음</p>
                    <Input ref={pinyinRef}></Input>
                </InputBox>
                <InputBox>
                    <p>의미</p>
                    <Input ref={meaningRef}></Input>
                </InputBox>
                <InputBox>
                    <p>예문</p>
                    <Input ref={exampleRef}></Input>
                </InputBox>
                <InputBox>
                    <p>해석</p>
                    <Input ref={interpretationRef}></Input>
                </InputBox>
                <Button variant="contained" style={{ marginTop: "20px" }} onClick={() => {
                        addWord();                        
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