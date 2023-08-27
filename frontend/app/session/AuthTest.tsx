"use client";
import { useState } from "react";
import { updateAuctionTest } from "@/app/Actions/auctionActions";

export default function AuthTest() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>();

  function doUpdate() {
    setResult(undefined);
    setLoading(true);
    updateAuctionTest()
      .then((res) => setResult(res))
      .finally(() => setLoading(false));
  }

  return (
    <div className="flex gap-4">
      <button className="btn btn-secondary" onClick={doUpdate}>
        {loading && <span className="loading loading-spinner" />}
        Test Auth
      </button>
      <pre>{JSON.stringify(result, null, 2)}</pre>
    </div>
  );
}
