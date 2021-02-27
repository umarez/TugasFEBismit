/** @jsxImportSource @emotion/react */
import tw from "twin.macro";
import DatePicker from "react-datepicker";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import toast, { Toaster } from 'react-hot-toast';

const notify = () => toast.success("Activity Added")

const App = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [value, setValue] = useState("");
  

  const monthArray = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November"]
  const dayArray = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"]

  const handleDate = () =>{
    let monthIndex = startDate.getMonth()
    let getDay = startDate.getDay()
    let month = monthArray[monthIndex]
    let day = dayArray[getDay]
    let year = startDate.getFullYear()

    console.log(`Activity: ${value}`)
    console.log(`Due Date: ${getDay} ${month} ${year} `)

    setValue("")

    notify()
    
  }


  return (
    <div tw="flex flex-row items-end">
      <div tw="flex flex-col w-40 h-full mr-5">
        <span>Task Name</span>
        <input type="text" tw="border-2 border-black " value={value} onChange={e=>setValue(e.target.value)}/>
      </div>

      <div tw="flex flex-col w-auto h-full">
        <span>Pick Date</span>
        <DatePicker
          tw="border-2 border-black text-gray-600"
          selected={startDate}
          onChange={(date) => setStartDate(date)}
        />
      </div>
      <div tw="ml-5">
        <button onClick={()=>{handleDate()}} tw="bg-gray-700 hover:bg-gray-400 py-1 px-5 rounded-sm">Add</button>
        <Toaster />
      </div>
    </div>
  );
};
export default App;
