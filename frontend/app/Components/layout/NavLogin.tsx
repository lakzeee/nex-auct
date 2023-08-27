import { signIn, signOut } from "next-auth/react";
import { BiAward, BiLogIn, BiLogOut, BiMoney, BiUserPin } from "react-icons/bi";
import { usePathname, useRouter } from "next/navigation";
import { useParamsStore } from "@/app/Components/hooks/useParamsStore";

// @ts-ignore
export default function NavLogin({ user }) {
  const router = useRouter();
  const curPath = usePathname();
  const setParams = useParamsStore((state) => state.setParams);

  function handleAfterClick() {
    const elem = document.activeElement;
    // @ts-ignore
    elem?.blur();
  }

  function setWinner() {
    setParams({ winner: user.username, seller: undefined });
    if (curPath !== "/") router.push("/");
    handleAfterClick();
  }

  function setSeller() {
    setParams({ winner: undefined, seller: user.username });
    if (curPath !== "/") router.push("/");
    handleAfterClick();
  }

  function gotoMyAuction() {
    router.push("/auctions/create");
    handleAfterClick();
  }

  return (
    <>
      <ul
        tabIndex={0}
        className="mt-0 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-40 z-50"
      >
        {!user && (
          <li>
            <button onClick={() => signIn("id-server", { callbackUrl: "/" })}>
              <BiLogIn />
              SignIn
            </button>
          </li>
        )}

        {user && (
          <>
            <li>
              <button onClick={setSeller}>
                <BiUserPin />
                My Auctions
              </button>
            </li>
            <li>
              <button onClick={setWinner}>
                <BiAward />
                Auctions Won
              </button>
            </li>
            <li>
              <button onClick={gotoMyAuction}>
                <BiMoney />
                Start a Auction
              </button>
            </li>
            <li>
              <button onClick={() => signOut()}>
                <BiLogOut />
                SignOut
              </button>
            </li>
          </>
        )}
      </ul>
    </>
  );
}
