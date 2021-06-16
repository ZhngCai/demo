import { FC } from 'react'
import { GlobalContextProvider } from "./context";
import './app.scss'

const App: FC = props => {

  return <GlobalContextProvider>{props.children} </GlobalContextProvider>;
};

export default App
