import './App.css';
import styledComponents from 'styled-components';
import List from './List';
import Add from './Add';
import Update from './Update';
import {Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <H1Style >중국어 단어장</H1Style>
      <Line></Line>
      <Route path="/" exact>
        <List/>
      </Route>
      <Route path="/add">
        <Add/>
      </Route>
      <Route path="/update/:index" component={Update} />
      
    </div>
  );
}
const H1Style = styledComponents.h1`
  font-family: 'Hi Melody', cursive;
`;

const Line = styledComponents.h1`
  border: 1px solid #ddd;
  background-color : #ddd;
`;


export default App;


