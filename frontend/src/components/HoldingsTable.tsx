import { useState } from "react";
import { useStore } from "../store/useStore";
import { formatCurrencyExact } from "../utils/calculations";
import type { Asset } from "../types";
import { Tooltip } from "./Tooltip";

export const HoldingsTable = () => {
  const {
    holdings,
    selectedAssets,
    toggleAssetSelection,
    selectAllAssets,
    deselectAllAssets,
  } = useStore();
  const [showAll, setShowAll] = useState(false);

  // Default rows shown
  const visibleHoldings = showAll ? holdings : holdings.slice(0, 4);
  const allSelected =
    holdings.length > 0 && selectedAssets.length === holdings.length;

  const handleSelectAll = () => {
    if (allSelected) {
      deselectAllAssets();
    } else {
      selectAllAssets(holdings.map((h: Asset) => h.id));
    }
  };

  const formatGain = (gain: number) => {
    if (gain === 0) return { text: "-", color: "text-text-primary" };
    const isLoss = gain < 0;
    // Exact formatting: -$1,200 or +$2,400 (no spaces in table per image)
    const formatted = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(Math.abs(gain));

    return {
      text: isLoss ? `-$${formatted}` : `+$${formatted}`,
      color: isLoss ? "text-loss" : "text-profit",
    };
  };

  const formatBalance = (balance: number, symbol: string) => {
    if (balance === 0) return null;
    const formatted = new Intl.NumberFormat("en-US", {
      maximumFractionDigits: 4,
    }).format(balance);
    return `${formatted} ${symbol}`;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-5 border-b border-gray-200">
        <h2 className="text-lg font-bold text-text-primary">Holdings</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-text-secondary bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-5 py-4 w-12 text-center">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={handleSelectAll}
                  className="w-4 h-4 rounded border-gray-300 text-primary-start focus:ring-primary-start cursor-pointer"
                />
              </th>
              <th className="px-4 py-4 font-semibold">Asset</th>
              <th className="px-4 py-4 font-semibold text-center">
                Holdings
                <div className="text-[10px] text-gray-400 font-normal">
                  Current Market Rate
                </div>
              </th>
              <th className="px-4 py-4 font-semibold text-center">
                Total Current Value
              </th>
              <th className="px-4 py-4 font-semibold text-center">
                Short-term
              </th>
              <th className="px-4 py-4 font-semibold text-center">Long-Term</th>
              <th className="px-4 py-4 font-semibold text-right pr-6">
                Amount to Sell
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {visibleHoldings.map((asset: Asset) => {
              const isSelected = selectedAssets.includes(asset.id);
              const stcgFormat = formatGain(asset.stcg.gain);
              const ltcgFormat = formatGain(asset.ltcg.gain);

              return (
                <tr
                  key={asset.id}
                  className={`hover:bg-gray-50 transition-colors ${isSelected ? "bg-blue-50/30" : ""}`}
                >
                  <td className="px-5 py-4 text-center">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleAssetSelection(asset.id)}
                      className="w-4 h-4 rounded border-gray-300 text-primary-start focus:ring-primary-start cursor-pointer"
                    />
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center space-x-3">
                      {asset.logo ? (
                        <img
                          src={asset.logo}
                          alt={asset.symbol}
                          className="w-8 h-8 rounded-full bg-gray-50 object-cover"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-400 text-xs">
                          {asset.symbol.slice(0, 2)}
                        </div>
                      )}
                      <div>
                        <div className="font-semibold text-text-primary">
                          {asset.name}
                        </div>
                        <div className="text-xs text-text-secondary">
                          {asset.symbol}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <Tooltip content={`Shares: ${Number(asset.shares.toFixed(4))}`} position="top">
                      <div className="font-medium text-text-primary">
                        {Number(asset.shares.toFixed(5))} {asset.symbol}
                      </div>
                    </Tooltip>
                    <Tooltip content={`Price: $${Number(asset.currentPrice.toFixed(4))}`} position="bottom">
                      <div className="text-xs text-text-secondary mt-0.5">
                        {formatCurrencyExact(asset.currentPrice)}/{asset.symbol}
                      </div>
                    </Tooltip>
                  </td>
                  <td className="px-4 py-4 text-center font-medium text-text-primary">
                    <Tooltip content={`Total Value: $${Number((asset.currentPrice * asset.shares).toFixed(4))}`} position="top">
                      <div>{formatCurrencyExact(asset.currentPrice * asset.shares)}</div>
                    </Tooltip>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <Tooltip content={`Gain: $${Number(asset.stcg.gain.toFixed(4))}`} position="top">
                      <div className={`font-medium ${stcgFormat.color}`}>
                        {stcgFormat.text}
                      </div>
                    </Tooltip>
                    <Tooltip content={`Balance: ${Number(asset.stcg.balance.toFixed(4))} ${asset.symbol}`} position="bottom">
                      <div className="text-xs text-text-secondary mt-0.5">
                        {formatBalance(asset.stcg.balance, asset.symbol)}
                      </div>
                    </Tooltip>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <Tooltip content={`Gain: $${Number(asset.ltcg.gain.toFixed(4))}`} position="top">
                      <div className={`font-medium ${ltcgFormat.color}`}>
                        {ltcgFormat.text}
                      </div>
                    </Tooltip>
                    <Tooltip content={`Balance: ${Number(asset.ltcg.balance.toFixed(4))} ${asset.symbol}`} position="bottom">
                      <div className="text-xs text-text-secondary mt-0.5">
                        {formatBalance(asset.ltcg.balance, asset.symbol)}
                      </div>
                    </Tooltip>
                  </td>
                  <td className="px-4 py-4 text-right pr-6 font-medium text-text-primary">
                    {isSelected
                      ? `${Number(asset.shares.toFixed(5))} ${asset.symbol}`
                      : "-"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {holdings.length > 4 && (
        <div className="p-4 border-t border-gray-100">
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-primary-start text-sm font-semibold hover:underline"
          >
            {showAll ? "View less" : "View all"}
          </button>
        </div>
      )}
    </div>
  );
};
