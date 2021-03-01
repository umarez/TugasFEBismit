/** @jsxImportSource @emotion/react */
import tw from "twin.macro";
import DatePicker from "react-datepicker";
import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import toast, { Toaster } from "react-hot-toast";
import { MapData } from "./components/mapData";
import Switch from "react-switch";

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
  const [sortDate, setSortDate] = useState(false);
  // const [dataWDate, setDataWDate] = useState([]);

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
      let activity = localStorage.key(i);
      let dueDate = localStorage.getItem(activity).split(" ");
      data.push({ activity: activity, due: dueDate[3] });

      // dataWDate.push({ activity: activity, due: dueDate[3] });
    }
    setActive(!active);
  }, []);

  const handleDate = () => {
    let monthIndex = startDate.getMonth();
    let getDay = startDate.getDate();
    let month = monthArray[monthIndex];
    let year = startDate.getFullYear();
    let date = startDate.toLocaleDateString("pt-BR");
    let dueDate = `${getDay} ${month} ${year} ${date}`;

    data.push({ activity: value, due: dueDate.split(" ")[3] });
    setValue("");

    // data.push(value);
    setChange(!change);
    localStorage.setItem(`${value}`, `${dueDate}`);
    setLength(localStorage.length);

    notify();
  };

  const deleteHandler = (index) => {
    localStorage.removeItem(data[index].activity);
    data.splice(index, 1);
    setChange(!change);
    notifyDelete();
    // console.log(dataWDate)
  };

  const filtered = () => {
    let dataFiltered = data.filter((data) => {
      let dataLower = data.activity.toLowerCase();
      return dataLower.indexOf(searchVal.toLocaleLowerCase()) != -1;
    });
    return dataFiltered.map((e, i) => {
      return <MapData e={e.activity} i={i} deleteHandler={deleteHandler} />;
    });
  };

  const renderActivity = () => {
    if (!sortDate) {
      console.log(`masuk`);
      data.sort((a, b) => (a.activity.toLowerCase() > b.activity.toLocaleLowerCase() ? 1 : -1));
      console.log(data)
    } else {
      data.sort((a, b) => {
        return new Date(a.due).valueOf() - new Date(b.due).valueOf();
      });
    }
    if (data.length != 0 && searchVal == "") {
      return data.map((e, i) => {
        return <MapData e={e.activity} i={i} deleteHandler={deleteHandler} />;
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
        <Switch
          height={30}
          width={80}
          onChange={() => {
            setSortDate(!sortDate);
          }}
          checked={sortDate}
          checkedIcon={
            <div tw="flex justify-center items-center h-full">Date</div>
          }
          uncheckedIcon={
            <div tw="flex justify-center items-center h-full">Name</div>
          }
        />
      </div>
      <div tw="flex flex-col">{active && renderActivity()}</div>
    </div>
  );
};
export default App;
