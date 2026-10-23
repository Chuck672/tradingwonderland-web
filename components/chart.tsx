"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { createChart, ColorType, CandlestickSeries, CrosshairMode, IChartApi, ISeriesApi, LogicalRange } from "lightweight-charts";
import { Button } from "@/components/ui/button";
import { ArrowRightToLine } from "lucide-react";
import { useLanguage } from "./language-provider";
import { BubbleSeries, BubbleData } from "./bubble-series";

export function TradingChart() {
  const { t } = useLanguage();
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const [timeframe, setTimeframe] = useState("H1");
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [hasMoreHistory, setHasMoreHistory] = useState(true);
  const loadingHistoryRef = useRef(false);
  const lastFetchedTimeRef = useRef<number | null>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);
  const bubbleSeriesRef = useRef<any>(null);
  const dataRef = useRef<any[]>([]);

  // Keep dataRef in sync with data
  useEffect(() => {
    dataRef.current = data;
  }, [data]);

  const fetchHistoricalData = useCallback(async (beforeTime: number) => {
    if (loadingHistoryRef.current || !hasMoreHistory || lastFetchedTimeRef.current === beforeTime) return;
    
    loadingHistoryRef.current = true;
    setLoadingHistory(true);
    lastFetchedTimeRef.current = beforeTime;
    
    try {
      const res = await fetch(`/api/market-data?symbol=XAUUSDz&timeframe=${timeframe}&limit=1000&before=${beforeTime}`);
      const json = await res.json();
      
      if (json.length === 0) {
        setHasMoreHistory(false);
      } else {
        // Prepend the new historical data
        setData(prevData => {
          // Double check to prevent duplicate prepends if somehow called twice
          if (prevData.length > 0 && json[json.length - 1].time >= prevData[0].time) {
            return prevData;
          }
          return [...json, ...prevData];
        });
      }
    } catch (error) {
      console.error("Failed to fetch historical data:", error);
      lastFetchedTimeRef.current = null; // Reset on error so we can try again
    } finally {
      loadingHistoryRef.current = false;
      setLoadingHistory(false);
    }
  }, [timeframe, hasMoreHistory]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setHasMoreHistory(true);
      lastFetchedTimeRef.current = null;
      try {
        const res = await fetch(`/api/market-data?symbol=XAUUSDz&timeframe=${timeframe}&limit=1000`);
        const json = await res.json();
        setData(json);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [timeframe]);

  const fetchHistoricalDataRef = useRef(fetchHistoricalData);
  useEffect(() => {
    fetchHistoricalDataRef.current = fetchHistoricalData;
  }, [fetchHistoricalData]);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: "#000000" },
        textColor: "#d1d4dc",
      },
      width: chartContainerRef.current.clientWidth,
      height: chartContainerRef.current.clientHeight || 500,
      grid: {
        vertLines: { color: "#000000" },
        horzLines: { color: "#000000" },
      },
      timeScale: {
        borderColor: "#2B2B43",
        timeVisible: true,
        secondsVisible: false,
      },
      rightPriceScale: {
        borderColor: "#2B2B43",
      },
      crosshair: {
        mode: CrosshairMode.Normal,
      },
    });

    chartRef.current = chart;

    const candlestickSeries = chart.addSeries(CandlestickSeries, {
      upColor: "#00bfa5",
      downColor: "#ff4444",
      borderVisible: false,
      wickUpColor: "#00bfa5",
      wickDownColor: "#ff4444",
    });

    seriesRef.current = candlestickSeries;

    const bubbleSeries = chart.addCustomSeries(new BubbleSeries(), {
      minRadius: 8,
      maxRadius: 30,
    });
    bubbleSeriesRef.current = bubbleSeries;

    // Handle visible logical range change for infinite scrolling
    const onVisibleLogicalRangeChanged = (newVisibleLogicalRange: LogicalRange | null) => {
      if (newVisibleLogicalRange === null) return;
      
      // If we're close to the left edge (e.g., within 50 bars)
      if (newVisibleLogicalRange.from < 50) {
        const currentData = dataRef.current;
        if (currentData.length > 0) {
          const oldestTime = currentData[0].time;
          fetchHistoricalDataRef.current(oldestTime);
        }
      }
    };

    chart.timeScale().subscribeVisibleLogicalRangeChange(onVisibleLogicalRangeChanged);

    const handleResize = () => {
      if (chartContainerRef.current) {
        chart.applyOptions({ 
          width: chartContainerRef.current.clientWidth,
          height: chartContainerRef.current.clientHeight || 500
        });
      }
    };

    window.addEventListener("resize", handleResize);

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    resizeObserver.observe(chartContainerRef.current);

    return () => {
      chart.timeScale().unsubscribeVisibleLogicalRangeChange(onVisibleLogicalRangeChanged);
      window.removeEventListener("resize", handleResize);
      resizeObserver.disconnect();
      chart.remove();
    };
  }, []);

  useEffect(() => {
    if (seriesRef.current && bubbleSeriesRef.current && data.length > 0) {
      seriesRef.current.setData(data);
      
      const bubbleData: BubbleData[] = data.map(d => ({
        time: d.time,
        high: d.high,
        low: d.low,
        delta: d.delta_volume || 0,
      }));
      bubbleSeriesRef.current.setData(bubbleData);
      
      // Only fit content on initial load (when we have exactly 1000 items or less)
      // Otherwise we'd lose our scroll position when loading history
      if (data.length <= 1000) {
        chartRef.current?.timeScale().fitContent();
      }
    }
  }, [data]);

  const scrollToLatest = () => {
    if (chartRef.current) {
      chartRef.current.timeScale().scrollToRealTime();
    }
  };

  const timeframes = ["M1", "M5", "M15", "H1"];

  return (
    <div className="w-full h-[60vh] min-h-[400px] relative flex flex-col rounded-xl overflow-hidden shadow-2xl border border-white/10 bg-black">
      {/* Header with timeframe selector */}
      <div className="absolute top-4 left-4 z-10 flex gap-2">
        {timeframes.map((tf) => (
          <Button
            key={tf}
            variant={timeframe === tf ? "default" : "outline"}
            size="sm"
            onClick={() => setTimeframe(tf)}
            className={`text-xs ${
              timeframe === tf 
                ? "bg-[#00bfa5] text-black hover:bg-[#00a68f]" 
                : "bg-black/50 border-white/20 text-white hover:bg-white/10"
            }`}
          >
            {tf}
          </Button>
        ))}
      </div>

      {loading && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="text-[#00bfa5] animate-pulse">{t("chart.loading")}</div>
        </div>
      )}

      {/* Chart Container */}
      <div ref={chartContainerRef} className="flex-1 w-full h-full" />

      {/* Scroll to latest button */}
      <button
        onClick={scrollToLatest}
        className="absolute bottom-6 right-16 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white backdrop-blur-md transition-all border border-white/10"
        title={t("chart.scroll")}
      >
        <ArrowRightToLine size={20} />
      </button>
    </div>
  );
}

