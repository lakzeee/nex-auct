"use client";

import { Auction } from "@/types";

type Props = {
  auction: Auction;
};
export default function DetailedSpecs({ auction }: Props) {
  return (
    <div className="h-60 overflow-x-auto">
      <table className="table table-pin-rows">
        <thead>
          <tr>
            <th>Seller</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{auction.seller}</td>
          </tr>
        </tbody>
        <thead>
          <tr>
            <th>Make</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{auction.make}</td>
          </tr>
        </tbody>
        <thead>
          <tr>
            <th>Year Manufactured</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{auction.year}</td>
          </tr>
        </tbody>
        <thead>
          <tr>
            <th>Mileage</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{auction.mileage}</td>
          </tr>
        </tbody>
        <thead>
          <tr>
            <th>Reserved Price</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{auction.reservePrice}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
