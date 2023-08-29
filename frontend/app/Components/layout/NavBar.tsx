"use client";

import { AiOutlineSearch, AiOutlineUser } from "react-icons/ai";
import { useParamsStore } from "@/app/Components/hooks/useParamsStore";
import { useEffect, useState } from "react";
import NavLogin from "@/app/Components/layout/NavLogin";
import { getCurrentUser } from "@/app/Actions/authActions";
import { usePathname, useRouter } from "next/navigation";
import { RiAuctionLine } from "react-icons/ri";

export default function NavBar() {
  const setParams = useParamsStore((state) => state.setParams);
  const reset = useParamsStore((state) => state.reset);
  const setSearchValue = useParamsStore((state) => state.setSearchValue);
  const searchValue = useParamsStore((state) => state.searchValue);
  const [value, setValue] = useState("");
  const [user, setUser] = useState(null); // State to hold user data
  const [avatarChar, setAvatarChar] = useState(null);

  const router = useRouter();
  const curPath = usePathname();

  useEffect(() => {
    async function fetchUserData() {
      const userData: any = await getCurrentUser();
      if (userData) {
        setUser(userData);
        setAvatarChar(userData.name.slice(0, 2));
      }
    }

    fetchUserData();
  }, []);

  function onChange(event: any) {
    setSearchValue(event.target.value);
  }

  function search() {
    if (curPath !== "/") router.push("/");
    setParams({ searchTerm: searchValue });
  }

  function doRest() {
    if (curPath !== "/") router.push("/");
    reset();
  }

  return (
    <>
      <div className="navbar bg-base-100 drop-shadow-md flex justify-between gap-2 fixed top-0 z-50">
        <div onClick={doRest}>
          <button className="btn btn-ghost normal-case text-lg sm:text-xl gap-2">
            <RiAuctionLine size={34} />
            NexAuct
          </button>
        </div>
        <div>
          {/*Search Bar*/}
          <div className="form-control relative flex flex-row py-2 items-center">
            <input
              onKeyDown={(e: any) => {
                if (e.key === "Enter") search();
              }}
              value={searchValue}
              onChange={onChange}
              type="text"
              placeholder="Search"
              className="input input-bordered focus:outline-none focus:border-primary rounded-full w-full max-w-xs transition-all duration-300"
            />
            <button onClick={search}>
              <AiOutlineSearch
                className="absolute bg-primary text-accent-content rounded-full p-2 mx-2 right-0 -translate-y-1/2"
                size={34}
              />
            </button>
          </div>
          {/*avatar*/}
          <div className="dropdown dropdown-left">
            <div
              tabIndex={0}
              className="btn btn-ghost btn-circle avatar placeholder"
            >
              <div
                className={`${
                  avatarChar ? "bg-accent" : "bg-neutral-content"
                } rounded-full w-9`}
              >
                {avatarChar ? (
                  <span className="text-accent-content">{avatarChar}</span>
                ) : (
                  <AiOutlineUser className="text-accent-content" size={24} />
                )}
              </div>
            </div>
            <NavLogin user={user} />
          </div>
        </div>
      </div>
    </>
  );
}
