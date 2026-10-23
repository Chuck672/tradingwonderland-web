import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function SubscribeCancelPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 pt-28 pb-12 text-center">
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">支付已取消</h1>
      <p className="text-gray-300 text-lg max-w-xl mx-auto mb-8">
        结账已取消，没有产生扣费。可以返回后重新选择 $149 或 $349。
      </p>
      <div className="flex flex-wrap gap-4 justify-center">
        <Link href="/subscribe">
          <Button className="bg-[#00ff88] text-black hover:bg-[#00cc6a]">返回购买页</Button>
        </Link>
        <Link href="/">
          <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
            返回首页
          </Button>
        </Link>
      </div>
    </div>
  );
}
