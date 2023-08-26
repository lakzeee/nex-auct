"use client";
import { useParamsStore } from "@/app/Components/hooks/useParamsStore";
import Heading from "@/app/Components/layout/Heading";
import { signIn } from "next-auth/react";

type Props = {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
  showLogin?: boolean;
  callbackUrl?: string;
};
export default function EmptyFilter({
  title = "No Matches Found",
  subtitle = "Try changing or resetting the filter",
  showReset,
  showLogin,
  callbackUrl,
}: Props) {
  const reset = useParamsStore((state) => state.reset);
  return (
    <div className="h-[40vh] flex flex-col gap-2 justify-center items-center">
      <Heading title={title} subTitle={subtitle} center />
      <div className="mt-4">
        {showReset && (
          <button className="btn btn-outline" onClick={reset}>
            Remove Filters
          </button>
        )}
        {showLogin && (
          <button
            className="btn btn-outline"
            onClick={() => signIn("id-server", { callbackUrl })}
          >
            Log In
          </button>
        )}
      </div>
    </div>
  );
}
