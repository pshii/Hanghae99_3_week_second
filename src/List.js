import React from "react";
import styledComponents from "styled-components";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { useHistory } from "react-router-dom"
import { useSelector } from 'react-redux';
const List = (props) => {
    const history = useHistory();
    const data = useSelector((state) => state);
    const word_list = data.word.list;
    return (
        <div>
            <ListBox className='list-box' >

                    {word_list.map((w, i) => {
                        return (
                            <Card key={i}>
                                <Span style={{fontWeight:"bold", fontSize:"1.2rem"}}>{w.word}</Span>
                                <Span>[{w.pinyin}]</Span>
                                <Span>{w.meaning}</Span>
                                <Span style={{color:"blue"}}>{w.example}</Span>
                                <Span style={{color:"blue"}}>{w.interpretation}</Span>
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