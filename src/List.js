import React, { Component, useState } from "react";
import styledComponents from "styled-components";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { useHistory } from "react-router-dom"
import { useSelector } from 'react-redux';
import Icon from '@mdi/react'
import { mdiAccount } from '@mdi/js'
import { mdiCheckOutline } from '@mdi/js';
import { mdiBorderColor } from '@mdi/js';
import { mdiClose } from '@mdi/js';
import { useDispatch } from "react-redux";
import { UpdateChecked } from "./redux/modules/word";

const List = (props) => {
    const history = useHistory();
    const data = useSelector((state) => state);
    const word_list = data.word.list;
    const dispatch = useDispatch();
    
    

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
                                    onClick={()=>{
                                        dispatch(UpdateChecked(i));
                                    }}
                                    />
                                    <Icon path={mdiBorderColor}  size={1} horizontal vertical rotate={180}
                                    color = {w.checked ? "white" : "#6799FF"}
                                    onClick={() => {
                                        history.push(`/update/${i}`);
                                    }}
                                    />
                                    <Icon path={mdiClose} size={1.2} horizontal vertical rotate={180} color = {w.checked ? "white" : "#6799FF"}
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

        </div>
    );
}

const ListBox = styledComponents.div`
    width: 80vw;
    border:1px solid black;
    height : 80vh;
    margin : auto;
    font-family: 'Nanum Gothic', sans-serif;
    display:flex;
    flex-wrap:wrap;
    div:nth-child(n+4){
        margin-top:-100px;
    }
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