import React, { Component, useState } from "react";
import styledComponents from "styled-components";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { useHistory } from "react-router-dom"
import { useSelector } from 'react-redux';
import Icon from '@mdi/react'
import { mdiCheckOutline } from '@mdi/js';
import { mdiBorderColor } from '@mdi/js';
import { mdiClose } from '@mdi/js';
import { useDispatch } from "react-redux";
import { deleteWordFB, UpdateCheckedFB } from "./redux/modules/word";
import { loadWordFB } from "./redux/modules/word";
import Spinner from "./Spinner";

const List = (props) => {
    const is_loaded = useSelector(state => state.word.is_loaded)
console.log(is_loaded)
    const history = useHistory();
    const data = useSelector((state) => state);
    const word_list = data.word.list;
    const dispatch = useDispatch();
    // const [temp, setTemp] = useState(false);
    React.useEffect(() => {
              
        dispatch(loadWordFB());   
      }, []);

    
    const bgColorChange = (e) => {
        // const target = e.target.parentElement.parentElement.parentElement;
        // target.style.backgroundColor = temp ? "#6799FF" : "white";
        // setTemp(temp ? false : true);
    }
    return (
        <div>
            <ListBox className='list-box' >
                {word_list.map((w, i) => {
                    return (
                        <Card key={i} checked={w.checked} style={{color : w.checked ? "white" : "inherit" }}  >

                            <Title>{w.word}
                                <div style={{ display: "flex", position:"absolute", top:"0%", right:"2%"  }}>
                                    <Icon path={mdiCheckOutline} size={1} horizontal vertical rotate={180} 
                                    color = {w.checked ? "white" : "#6799FF"}
                                    onClick={(e)=>{
                                        // console.log(e.target)
                                        // bgColorChange(e)
                                        dispatch(UpdateCheckedFB(w));
                                    }}
                                    />
                                    <Icon path={mdiBorderColor}  size={1} horizontal vertical rotate={180}
                                    color = {w.checked ? "white" : "#6799FF"}
                                    onClick={() => {
                                        history.push(`/update/${i}`);
                                    }}
                                    />
                                    <Icon path={mdiClose} size={1.2} horizontal vertical rotate={180} color = {w.checked ? "white" : "#6799FF"}
                                    onClick={()=>{
                                        dispatch(deleteWordFB(w.id));
                                    }}
                                    />
                                </div>
                            </Title>
                            <Span>[{w.pinyin}]</Span>
                            <Span>{w.meaning}</Span>
                            <Span style={{ color: w.checked ? "white" : "blue" }}>{w.example}</Span>
                            <Span style={{ color: w.checked ? "white" : "blue" }}>{w.interpretation}</Span>
                        </Card>
                    );
                })}

                <BtnAdd>
                    <Fab color="primary" aria-label="add" onClick={() => {
                        history.push("/add");
                    }} >
                        <AddIcon />
                    </Fab>
                </BtnAdd>
                
            </ListBox>
            {!is_loaded && <Spinner/>}

        </div>
    );
}

const ListBox = styledComponents.div`
    width: 80vw;
    margin : auto;
    font-family: 'Nanum Gothic', sans-serif;
    display:flex;
    flex-wrap : wrap;
    border:1px solid black;
    
`;
const Card = styledComponents.div`
    border: 3px solid #6799FF;
    height : 200px;
    width: calc(30%);
    border-radius: 20px;
    margin: 20px auto;
    display : flex;
    flex-direction : column;
    justify-content : space-around;
    text-align: left;
    padding-left : 20px;
    background-color:  ${(props) => props.checked? "#6799FF" : "white"}
`;
const Title = styledComponents.div`
    font-weight: bold;
    font-size: 1.2rem;
    position:relative;
    div > *{
        margin : 5px;
        cursor : pointer;
        border : ${(props) => props.checked ? "white" : "#6799FF"}
    }
    div > :nth-child(2) {
        margin-top : 8px;
    }
    `;
const Span = styledComponents.span`
    margin : 5px;
`;
const BtnAdd = styledComponents.div`
    width: 50px;
    height : 50px;
    background-color :#6799FF;
    position : fixed;
    top : 90%;
    right : 11%;
    border-radius : 50%;
`;

export default List;