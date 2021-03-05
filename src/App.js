/** @jsxImportSource @emotion/react */
// eslint-disable-next-line
import tw from "twin.macro";
import DatePicker from "react-datepicker";
import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import toast, { Toaster } from "react-hot-toast";
import { MapData } from "./components/mapData";
import Switch from "react-switch";
import { MdDateRange } from "react-icons/md";
import { IoMdListBox } from "react-icons/io";
import { FcSearch } from "react-icons/fc";

const notify = () => toast.success("Activity Added");
const notifyDelete = () => toast("Activity Deleted ✔");
const notifyFail1 = () => toast.error("Please Input Activity");
const notifyFail2 = () => toast.error("Please Input Another Activity");

const App = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [value, setValue] = useState("");
  const [length, setLength] = useState(localStorage.length);
  // eslint-disable-next-line
  const [data, setData] = useState([]);
  const [change, setChange] = useState(true);
  const [active, setActive] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const [sortDate, setSortDate] = useState(false);

  const monthArray = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const obj = {
    "January" : "1",
    "February" : "2",
    "March" : "3",
    "April" : "4",
    "May" : "5",
    "June" : "6",
    "July" : "7",
    "August" : "8",
    "September" : "9",
    "October" : "10",
    "November" : "11",
    "December" : "12"

  }

  useEffect(() => {
    for (let i = 0; i < length; i++) {
      let activity = localStorage.key(i);
      let dueDate = localStorage.getItem(activity)
      dueDate = dueDate.split(" ")
      data.push({ activity: activity, due: `${obj[dueDate[0]]}/${dueDate[1]}/${dueDate[2]}` });
    }
    setActive(!active);
    // eslint-disable-next-line
  }, []);

  const handleDate = () => {
    if (value.trim().length !== 0 && localStorage.getItem(value) === null) {
      let monthIndex = startDate.getMonth();
      let getDay = startDate.getDate();
      let month = monthArray[monthIndex];
      let year = startDate.getFullYear();
      let dueDate = `${month} ${getDay} ${year}`;
      let due = `${monthIndex+1}/${getDay}/${year}`
      
      data.push({ activity: value, due: due });
      setValue("");

      setChange(!change);
      localStorage.setItem(`${value}`, `${dueDate}`);
      setLength(localStorage.length);

      notify();
    } else if (localStorage.getItem(value) !== null) {
      notifyFail2();
    } else {
      notifyFail1();
    }
  };

  const deleteHandler = (index) => {
    localStorage.removeItem(data[index].activity);
    data.splice(index, 1);
    setChange(!change);
    setTimeout(() => {
      notifyDelete();
    }, 500);
  };

  const filtered = () => {
    let dataFiltered = data.filter((data) => {
      let dataLower = data.activity.toLowerCase();
      return dataLower.indexOf(searchVal.toLocaleLowerCase()) !== -1;
    });
    return dataFiltered.map((e, i) => {
      return <MapData e={e.activity} i={i} deleteHandler={deleteHandler} />;
    });
  };

  const renderActivity = () => {
    
    if (!sortDate) {
      data.sort((a, b) =>
        a.activity.toLowerCase() > b.activity.toLocaleLowerCase() ? 1 : -1
      );
    } else {
      data.sort((a, b) => {
        return new Date(a.due).getTime() - new Date(b.due).getTime() ;
      });
      
    }
    if (data.length !== 0 && searchVal === "") {
      return data.map((e, i) => {
        return <MapData e={e.activity} i={i} deleteHandler={deleteHandler} />;
      });
    } else {
      return filtered();
    }
    
  };

  return (
    <>
      <div tw="flex flex-col justify-center items-center w-screen md:w-full ">
        <div tw="flex bg-indigo-800 w-screen justify-center items-center shadow-md h-24">
          <h1 tw="text-3xl md:text-5xl text-white font-akaya">
            To Do Organizer
          </h1>
        </div>
        <div tw="flex flex-col w-full flex-wrap md:w-10/12 lg:w-1/2 mt-5 ">
          <div tw="flex flex-row flex-wrap pl-2 md:pl-0 md:flex-no-wrap items-end">
            <div tw="flex flex-col w-full h-full mr-5 font-kanit">
              <div tw="flex items-center">
                <span tw="mr-2">
                  <span>
                    <h1 tw="text-xl">Task Name</h1>
                  </span>
                </span>
                <IoMdListBox />
              </div>
              <input
                type="text"
                tw="border border-black focus:outline-none"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
            </div>

            <div tw="flex flex-col w-auto h-full font-kanit">
              <div tw="flex items-center">
                <span tw="mr-2">
                  <h1 tw="text-xl">Due Date</h1>
                </span>
                <MdDateRange />
              </div>

              <DatePicker
                tw="border border-black text-gray-600"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat="MM/dd/yyyy"
                minDate={new Date()}
                showDisabledMonthNavigation
              />
            </div>
            <div tw="ml-5">
              <button
                onClick={() => {
                  handleDate();
                }}
                tw="bg-blueDark hover:bg-blue-700 py-1 px-5 rounded-sm font-kanit hover:text-gray-300 text-white"
              >
                Add
              </button>
              <Toaster />
            </div>
          </div>
          <div tw="flex justify-center mt-5">
            <span tw="bg-gray-900 w-11/12 md:w-full h-2"></span>
          </div>
          <div tw="flex items-end w-full justify-between pl-4 pr-4 md:pr-0 md:pl-0 font-kanit">
            <div tw="flex flex-col w-40 h-full mr-5 mt-5 pb-1">
              <div tw="flex items-center">
                <h1 tw="text-xl">Search</h1>
                <FcSearch />
              </div>
              <input
                type="text"
                tw="border border-black "
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                size="100"
                placeholder="Search for activity..."
              />
            </div>
            <div
              css={{ "@media (max-width: 325px)": { flexDirection: "column" } }}
              tw="flex items-center font-poppins"
            >
              <h1 tw="pr-4 text-lg lg:text-xl">Sort By</h1>
              <Switch
                height={40}
                width={85}
                handleDiameter={28}
                borderRadius={6}
                onChange={() => {
                  setSortDate(!sortDate);
                }}
                checked={sortDate}
                checkedIcon={
                  <div tw="flex pl-2 items-center h-full text-white text-sm">
                    Date
                  </div>
                }
                uncheckedIcon={
                  <div tw="flex justify-center items-center h-full text-white text-sm">
                    Name
                  </div>
                }
              />
            </div>
          </div>
          <div tw="flex flex-col items-center mt-10 p-5 sm:p-0" >
            {data.length !== 0 ? (
              renderActivity()
            ) : (
              <h1 tw="mt-10 text-3xl md:text-4xl font-poppins text-gray-700">
                No Activity
              </h1>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default App;
