import styledComponents from "styled-components";

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
    background-color : ${((props)=> props.checked ? "#6799FF": "white")};
`;
const Title = styledComponents.div`
    font-weight: bold;
    font-size: 1.2rem;
    position:relative;
    div > *{
        margin : 5px;
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