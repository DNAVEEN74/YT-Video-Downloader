import './App.css'
import { RecoilRoot } from 'recoil'
import AppBar from './components/appbar'
import Body from './components/body'

export default function App() {

  return (
    <div>
      <RecoilRoot>
        <AppBar />
        <Body />
      </RecoilRoot>
      
    </div>
  )
}
