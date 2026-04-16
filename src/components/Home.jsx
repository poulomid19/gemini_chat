import { useState } from 'react'
import { SendHorizonal, Menu } from 'lucide-react'
import axios from 'axios'
const Home = () => {
    const [text,setText] = useState("")
    const [msg, setMsg] = useState([])
    const [sidebar, setSidebar] = useState(false)
    let userId = localStorage.getItem("userId")
    if(!userId){
         userId = crypto.randomUUID()
         localStorage.setItem("userId",userId)
    }
    const clickHandler = async(e)=>{
        e.preventDefault()
        const userMsg ={role: "User", text}
        setMsg((prev)=>[...prev, userMsg])
        setText("")

     try {
        const res = await axios.post("http://localhost:3000/api/message",{
            convoId: userId,
            role:"User",
            content: text
        })

        const botMsg = {role: "Assistant", text:res.data.botmsg}
        //console.log(botMsg)
        setMsg((prev)=>[...prev, botMsg]);
     } catch (error) {
        console.log(error)
     }
    }
  return (
    <>

      <section className="text-gray-600 body-font"> 
        <div className='w-fit bg-gray-100'>
      <Menu onClick={()=>setSidebar(!sidebar)} className='z-50 relative'/>
        {sidebar && 
           <div className="fixed top-0 left-0 h-full w-64 bg-gray-100 p-4 shadow-lg overflow-y-auto z-40">
             {msg.length===0? <p className='m-5'>No chat yet!</p>: (
              msg.map((m,i)=>(
                <div key={i} className="m-5">
        <strong>{m.role}:</strong> {m.text}
      </div>
              ))
             )}
           </div>}
        </div> 





  <div className="container px-5 py-24 mx-auto">
    <div className="flex flex-col items-center text-center w-full mb-12 relative">
        {msg.length===0?(
            <div>
             <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Hi,</h1>
             <p className="lg:w-2/3 mx-auto leading-relaxed text-base">How can I help you today</p>
             </div>
        ):(
           msg.map((i, index) => (
  <div key={index} className="text-left mb-4 w-full max-w-lg mx-auto">
    <h5 className="font-bold">{i.role}</h5>
    <p>{i.text}</p>
  </div>
))
        )
        }
    </div>
    <form onSubmit={clickHandler}>
   <div className="w-full flex justify-center mt-10">
  <div className="relative w-2/3">
    <input
      type="text"
      placeholder="Ask anything"
      value={text}
      onChange={(e) => setText(e.target.value)}
      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 
                focus:border-gray-500 focus:bg-transparent focus:ring-2 text-base 
                outline-none text-gray-700 py-2 px-3 pr-10"
    />

    {text !== "" && (
      <button type='submit'
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600">
        <SendHorizonal />
      </button>
    )}
  </div>
</div>
 </form>
  </div>
</section>
 {/* </div> */}
    </>
  )
}

export default Home