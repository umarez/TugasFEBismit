/** @jsxImportSource @emotion/react */
import tw from "twin.macro";
import DatePicker from "react-datepicker";
import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import toast, { Toaster } from "react-hot-toast";
import { FaTrashAlt } from "react-icons/fa";
import { MapData } from "./components/mapData";

const notify = () => toast.success("Activity Added");
const notifyDelete = () => toast("Activity Deleted ✔");

const App = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [value, setValue] = useState("");
  const [length, setLength] = useState(localStorage.length);
  const [data, setData] = useState([]);
  const [change, setChange] = useState(true);
  const [active, setActive] = useState(false);
  const [searchVal, setSearchVal] = useState("");

  const monthArray = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
  ];

  useEffect(() => {
    for (let i = 0; i < length; i++) {
      data.push(localStorage.key(i));
    }
    setActive(!active);
  }, []);

  const handleDate = () => {
    let monthIndex = startDate.getMonth();
    let getDay = startDate.getDate();
    let month = monthArray[monthIndex];
    let year = startDate.getFullYear();
    let dueDate = `${getDay} ${month} ${year}`;

    setValue("");

    data.push(value);
    setChange(!change);
    localStorage.setItem(`${value}`, `${dueDate}`);
    setLength(localStorage.length);

    notify();
  };

  const deleteHandler = (index) => {
    localStorage.removeItem(data[index]);
    data.splice(index, 1);
    setChange(!change);
    notifyDelete();
  };

  const filtered = () => {
    let dataFiltered = data.filter((data) => {
      return data.indexOf(searchVal) != -1;
    });
    return dataFiltered.map((e, i) => {
      return <MapData e={e} i={i} deleteHandler={deleteHandler} />;
    });
  };

  const renderActivity = () => {
    if (data.length != 0 && searchVal == "") {
      data.sort();
      return data.map((e, i) => {
        return <MapData e={e} i={i} deleteHandler={deleteHandler} />;
      });
    } else {
      return filtered();
    }
  };

  return (
    <div tw="flex flex-col ">
      <div tw="flex flex-row items-end">
        <div tw="flex flex-col w-40 h-full mr-5">
          <span>Task Name</span>
          <input
            type="text"
            tw="border-2 border-black "
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>

        <div tw="flex flex-col w-auto h-full">
          <span>Due Date</span>
          <DatePicker
            tw="border-2 border-black text-gray-600"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="dd/MM/yyyy"
            minDate={new Date()}
            showDisabledMonthNavigation
          />
        </div>
        <div tw="ml-5">
          <button
            onClick={() => {
              handleDate();
            }}
            tw="bg-gray-700 hover:bg-gray-400 py-1 px-5 rounded-sm"
          >
            Add
          </button>
          <Toaster />
        </div>
        <div tw="flex flex-col w-40 h-full mr-5">
          <span>Search</span>
          <input
            type="text"
            tw="border-2 border-black "
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
          />
        </div>
      </div>
      <div tw="flex flex-col">{active && renderActivity()}</div>
    </div>
  );
};
export default App;
