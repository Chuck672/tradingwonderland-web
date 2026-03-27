import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function SubscribeCancelPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 py-12 text-center">
      <div className="text-6xl mb-6">❌</div>
      <h1 className="text-4xl md:text-5xl font-bold text-red-500 mb-4">支付已取消</h1>
      <p className="text-gray-300 text-lg max-w-xl mx-auto mb-8">
        您的支付流程已被取消，没有产生任何扣费。如果您在支付过程中遇到问题，请随时联系我们。
      </p>
      <div className="flex gap-4">
        <Link href="/subscribe">
          <Button className="bg-[#00bfa5] text-black hover:bg-[#00bfa5]/80">
            重新选择方案
          </Button>
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
