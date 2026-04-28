import Link from 'next/link';

export default function BbsDisabledPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-2xl font-bold text-white">社区功能已下线</h1>
      <p className="mt-4 text-slate-400 leading-relaxed">
        为了降低安全风险与维护成本，本站暂时移除了论坛/社区相关功能。
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/"
          className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white transition-colors"
        >
          返回首页
        </Link>
        <Link
          href="/resources"
          className="px-4 py-2 rounded-lg bg-[#00bfa5] hover:bg-[#00a893] text-slate-950 font-medium transition-colors"
        >
          查看资源
        </Link>
      </div>
    </div>
  );
}

