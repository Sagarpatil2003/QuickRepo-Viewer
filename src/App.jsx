import { useState,useEffect, createContext } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

export const AppContext = createContext()
function App() {
   let [data, setData] = useState([])
   let [username,setUsername] = ("")
   let [searchUser, setSearchUser] = useState("")
   let [loding , setLoding] = useState(false)
   let [error , setError] = useState("")

   useEffect(()=>{
      if(!searchUser)return

      const fetchProp = async()=>{
        setLoding(true)
        setError("")
        try{
            let res = await axios.get( `https://api.github.com/users/${searchUser}/repos`)
            setData(res.data)
            setLoding(false)
        }catch(error){
            setError("user Not found")
            setData([])
            setLoding(false)
        }
      }

      fetchProp()
   },[searchUser])

   console.log(data)
  return (
    <>
     <AppContext.Provider value={{data, username,setData,setSearchUser,loding,error}}>
        <div>
          <SearchBar/>
          {loding && <p>Loding...</p>}
        </div>
     </AppContext.Provider>
    </>
  )
}

export default App
