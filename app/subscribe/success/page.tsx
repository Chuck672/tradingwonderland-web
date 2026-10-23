import Link from "next/link";
import { Button } from "@/components/ui/button";

const SESSION_ID = /^cs_[A-Za-z0-9_]+$/;

export default async function SubscribeSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const params = await searchParams;
  const sessionId = params.session_id && SESSION_ID.test(params.session_id) ? params.session_id : null;

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 pt-28 pb-12 text-center">
      <h1 className="text-4xl md:text-5xl font-bold text-[#00ff88] mb-4">支付已收到</h1>
      <p className="text-gray-300 text-lg max-w-xl mx-auto mb-4">
        感谢购买 PiTradingAgent Setup 8.0.0。安装 zip 与 PTA1 授权会发到结账邮箱，请同时查看垃圾邮件。
      </p>
      <p className="text-gray-500 text-sm max-w-xl mx-auto mb-8">
        这是 MT5 图表伴侣桌面程序。售后仅限安装与授权答疑。
      </p>
      {sessionId ? <p className="text-xs text-gray-600 mb-8 break-all">Reference: {sessionId}</p> : null}
      <div className="flex flex-wrap gap-4 justify-center">
        <Link href="/dashboard">
          <Button className="bg-[#00ff88] text-black hover:bg-[#00cc6a]">前往个人中心</Button>
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
