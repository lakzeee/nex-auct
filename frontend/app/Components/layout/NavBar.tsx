"use client";

import { AiOutlineSearch, AiOutlineUser } from "react-icons/ai";
import { useParamsStore } from "@/app/Components/hooks/useParamsStore";
import { useState } from "react";

export default function NavBar() {
  const setParams = useParamsStore((state) => state.setParams);
  const reset = useParamsStore((state) => state.reset);
  const setSearchValue = useParamsStore((state) => state.setSearchValue);
  const searchValue = useParamsStore((state) => state.searchValue);
  const [value, setValue] = useState("");

  function onChange(event: any) {
    setSearchValue(event.target.value);
  }

  function search() {
    setParams({ searchTerm: searchValue });
  }

  return (
    <>
      <div className="navbar bg-base-100 drop-shadow-md">
        <div onClick={reset} className="flex-1">
          <a className="btn btn-ghost normal-case text-xl">NexAuct</a>
        </div>
        <div className="flex-none">
          {/*Search Bar*/}
          <div className="form-control relative flex flex-row py-2 items-center shadow-sm">
            <input
              onKeyDown={(e: any) => {
                if (e.key === "Enter") search();
              }}
              value={searchValue}
              onChange={onChange}
              type="text"
              placeholder="Search"
              className="input flex-grow input-bordered pl-5 md:w-auto focus:outline-none rounded-full"
            />
            <button onClick={search}>
              <AiOutlineSearch
                className="absolute bg-primary text-white rounded-full p-2 mx-2 right-0 -translate-y-1/2"
                size={34}
              />
            </button>
          </div>
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-8 rounded-full">
                <AiOutlineUser size={32} />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <a>LogIn</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
