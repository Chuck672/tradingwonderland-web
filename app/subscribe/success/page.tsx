import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function SubscribeSuccessPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 py-12 text-center">
      <div className="text-6xl mb-6">🎉</div>
      <h1 className="text-4xl md:text-5xl font-bold text-[#00bfa5] mb-4">支付成功！</h1>
      <p className="text-gray-300 text-lg max-w-xl mx-auto mb-8">
        感谢您的购买！您的账号权限已经升级。请前往个人中心查看您的最新会员等级。
      </p>
      <div className="flex gap-4">
        <Link href="/dashboard">
          <Button className="bg-[#00bfa5] text-black hover:bg-[#00bfa5]/80">
            前往个人中心
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
