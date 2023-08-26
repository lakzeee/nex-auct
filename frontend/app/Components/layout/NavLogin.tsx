import { signIn, signOut } from "next-auth/react";
import { BiAward, BiLogIn, BiLogOut, BiMoney, BiUserPin } from "react-icons/bi";

// @ts-ignore
export default function NavLogin({ user }) {
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
              <button>
                <BiUserPin />
                My Auctions
              </button>
            </li>
            <li>
              <button>
                <BiAward />
                Auctions Won
              </button>
            </li>
            <li>
              <button>
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
