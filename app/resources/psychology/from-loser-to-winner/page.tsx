"use client";

import { useLanguage } from "@/components/language-provider";
import { ArrowLeft, BookOpen, Clock } from "lucide-react";
import Link from "next/link";
import { motion } from "motion/react";

export default function FromLoserToWinnerPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <Link href="/resources/psychology" className="inline-flex items-center text-gray-400 hover:text-[#00ff88] transition-colors mb-8">
        <ArrowLeft className="w-4 h-4 mr-2" />
        返回列表
      </Link>

      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="prose prose-invert prose-lg max-w-none"
      >
        <header className="mb-12 border-b border-white/10 pb-8">
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
            <span className="flex items-center"><Clock className="w-4 h-4 mr-1" /> 2023-11-02</span>
            <span className="flex items-center"><BookOpen className="w-4 h-4 mr-1" /> 12 min read</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            交易心态：<br />
            <span className="text-[#00ff88]">从输家到赢家的核心蜕变</span>
          </h1>
        </header>

        <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 mb-10 border-l-4 border-l-[#00ff88] backdrop-blur-sm">
          <p className="m-0 text-gray-300 leading-relaxed">
            <strong className="text-white block mb-2 text-xl">（开场）</strong>
            YouTube上有海量关于交易心理的内容，但我看了许多在交易领域的成功交易牛人——他们真正懂得如何培养盈利交易者的心态。今天这堂一小时大师课，我提炼和整理了他们对于交易心态的理解：<strong className="text-[#00ff88]">希望这些内容，对于交易中的你会有帮助！</strong>
          </p>
        </div>

        <h2 className="text-2xl font-bold text-white mt-12 mb-6 flex items-center">
          <span className="w-1 h-6 bg-[#00ff88] mr-3 rounded-full"></span>
          第一章：致命起点——交易前就埋下的心态陷阱
        </h2>
        <p className="text-gray-300 leading-relaxed mb-6">
          交易者的问题，早在按下第一笔订单前就已注定。他们带着特定心态进入市场，当这种心态与交易本质冲突时，灾难便开始了：爆仓、报复性交易、该止盈时却死扛... <strong className="text-[#00ff88]">但所有问题的根源，是对输赢的扭曲认知。</strong>
        </p>
        
        <p className="text-gray-300 leading-relaxed mb-6">
          不久前，我遇到一位刚花5万美元接受"顶级交易培训"的人。培训师反复追问学员目标："你想成为首位亿万富翁交易者吗？"这类目标本身没错——加杠杆后，市场潜力确实无限。<br/>
          <strong className="text-red-400">可问题在于：全世界99%的人（我原以为只有美国人，现在发现是全人类）都病态地执着于"赢"。</strong>
        </p>
        
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6 mb-8 border-l-4 border-l-blue-500">
          <p className="m-0 text-blue-200 italic leading-relaxed">
            "我必须赢！赢了就能赚钱！让事情按我的意愿发生就能赚钱！"<br/>
            "我绝不能输！绝不当失败者！"
          </p>
        </div>
        
        <p className="text-gray-300 leading-relaxed mb-6">
          这让我想起高中橄榄球队更衣室的标语：<strong className="text-blue-400">"赢家永不言败，败者永不言胜"</strong>。当交易者把这种非黑即白的输赢观带入市场，灾难就开始了。
        </p>
        
        <p className="text-gray-300 leading-relaxed mb-10">
          人类大脑进化了数万年，只为掌控结果而活。但当你投入重金、设计精密系统后却发现：<strong className="text-red-400">市场根本不受你控制</strong>。那一刻，你体内那个原始"穴居人"会彻底崩溃——这正是绝大多数人失败的核心。<br/>
          <strong className="text-[#00ff88]">我要强调：我从未见过真正的顶尖交易者不是"超级输家"（best loser）。</strong>
        </p>

        <h2 className="text-2xl font-bold text-white mt-12 mb-6 flex items-center">
          <span className="w-1 h-6 bg-[#00ff88] mr-3 rounded-full"></span>
          第二章：颠覆认知——《狼与狗之间》的启示
        </h2>
        <p className="text-gray-300 leading-relaxed mb-6">
          推荐一本必读神作：《<strong className="text-[#00ff88]">狼与狗之间的一小时</strong>》（<em>The Hour Between Dog and Wolf</em>）。作者约翰·科茨（John Coates）曾是华尔街衍生品交易员，后转型为神经科学家。书名源自法语谚语，指黄昏时分野兽与家犬界限模糊的时刻——恰如交易者在理性与兽性间的挣扎。
        </p>
        
        <p className="text-gray-300 leading-relaxed mb-4">
          科茨通过实证研究发现：
        </p>
        <ul className="list-disc pl-6 space-y-4 text-gray-300 mb-8">
          <li><strong className="text-yellow-400">"全垒打型"交易者</strong>（年赚5000万美元的明星）往往5年内销声匿迹。他们在大行情日肾上腺素飙升，甚至需冲进洗手间缓解生理压力；</li>
          <li><strong className="text-[#00ff88]">"稳定盈利型"交易者</strong>（年赚1000万美元）却能持续10年、20年。他们不追求戏剧性胜利，而是为机构提供<strong className="text-cyan-400">可持续的现金流</strong>。</li>
        </ul>
        
        <p className="text-gray-300 leading-relaxed mb-6">
          <strong className="text-red-400">残酷真相</strong>：机构追逐"全垒打选手"，但真正存活下来的是<strong className="text-[#00ff88]">风险管理大师</strong>。散户常犯的致命错误：
        </p>
        
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 mb-10 border-l-4 border-l-red-500">
          <p className="m-0 text-red-200 leading-relaxed">
            账户从5000美元冲到10万时，误以为自己已成高手，开始加码风险。直到黑天鹅降临，一夜回到解放前。
          </p>
        </div>

        <h2 className="text-2xl font-bold text-white mt-12 mb-6 flex items-center">
          <span className="w-1 h-6 bg-[#00ff88] mr-3 rounded-full"></span>
          第三章：终极解药——拥抱不适，重塑自我
        </h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-[#00ff88]">真正的交易盈利 = 忍受不适 × 时间</strong>。你必须学会承受：
        </p>
        <ul className="list-disc pl-6 space-y-2 text-gray-300 mb-6">
          <li>等待最佳时机的焦灼；</li>
          <li>持有盈利头寸时行情停滞的煎熬；</li>
          <li>止损后价格立刻反转的刺痛...</li>
        </ul>
        
        <p className="text-gray-300 leading-relaxed mb-6">
          <strong className="text-purple-400">神经科学证实</strong>：人类大脑天生厌恶损失与错失机会。顶尖交易者的超能力，是<strong className="text-[#00ff88]">把不适感转化为燃料</strong>。
        </p>
        
        <p className="text-gray-300 leading-relaxed mb-6">
          一位前客户的故事：
        </p>
        
        <div className="bg-[#00ff88]/10 border border-[#00ff88]/20 rounded-xl p-6 mb-8 border-l-4 border-l-[#00ff88]">
          <p className="m-0 text-[#00ff88]/90 italic leading-relaxed">
            "我放弃所有'速成交易课'，专注实践你教的'大脑与不确定性'方法。当我停止扮演'必赢的Alpha'，学会像猎人般耐心蛰伏——等待、观察、只在高概率出现时出击——我的账户18个月回报率达77%。"
          </p>
        </div>
        
        <p className="text-gray-300 leading-relaxed mb-6">
          <strong className="text-[#00ff88]">划重点</strong>：77%的年化收益，正是专业交易者的基准线（48%-90%）。这不是靠预测市场，而是<strong className="text-cyan-400">接纳随机性</strong>：
        </p>
        
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-10 border-l-4 border-l-blue-400">
          <p className="m-0 text-blue-200 leading-relaxed">
            "有效交易信号，只是在混沌中短暂出现的秩序。它可能成功，也可能失败——你只能押注概率，无法掌控结果。"
          </p>
        </div>

        <h2 className="text-2xl font-bold text-white mt-12 mb-6 flex items-center">
          <span className="w-1 h-6 bg-[#00ff88] mr-3 rounded-full"></span>
          第四章：破除迷思——专业交易者的真实情绪
        </h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          散户常误以为顶尖交易者"心如止水"。<strong className="text-red-400">这是最大的谎言！</strong>
        </p>
        <ul className="list-disc pl-6 space-y-2 text-gray-300 mb-6">
          <li>专业交易者同样经历FOMO（错失恐惧）、焦虑、自我怀疑；</li>
          <li><strong className="text-[#00ff88]">唯一区别</strong>：他们不被情绪驱使行动。</li>
        </ul>
        
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6 mb-8 border-l-4 border-l-blue-500">
          <p className="m-0 text-blue-200 italic leading-relaxed">
            "当市场动荡时，我的情绪和新手一样剧烈。但专业素养让我按下'暂停键'——先深呼吸，再问：'这个行动符合系统规则吗？'"
          </p>
        </div>
        
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-[#00ff88]">风险管理两大维度</strong>：
        </p>
        <ol className="list-decimal pl-6 space-y-3 text-gray-300 mb-8">
          <li><strong className="text-yellow-400">防御端</strong>：单笔风险≤账户2%（散户常忽略此铁律）；</li>
          <li><strong className="text-[#00ff88]">进攻端</strong>：在趋势日（如标普500单日暴跌5%）<strong className="text-cyan-400">主动加仓</strong>，但保留核心头寸。</li>
        </ol>
        
        <p className="text-gray-300 leading-relaxed mb-6">
          <strong className="text-[#00ff88]">仓位规模的真相</strong>：
        </p>
        
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-8 border-l-4 border-l-[#00ff88]">
          <p className="m-0 text-gray-300 leading-relaxed">
            "想象一根50英尺长的木梁：<br/>
            - 放在地上，人人能走过去；<br/>
            - 架在50层楼顶，无人敢迈步。<br/>
            <strong className="text-[#00ff88]">交易仓位同理——你必须'赢取'加仓资格</strong>。<br/>
            从1万美元账户起步：<br/>
            - 赚到1.5万后，允许交易2手合约；<br/>
            - 再赚5000刀，升级到3手...<br/>
            <strong className="text-[#00ff88]">用3-6个月渐进加码，而非一周内赌上全部身家</strong>。"
          </p>
        </div>
        
        <p className="text-gray-300 leading-relaxed mb-10">
          <em className="text-gray-500">（案例）</em> 我的客户中有微型合约散户，也有单笔交易800手标普期货的富豪。<strong className="text-[#00ff88]">账户规模不重要，重要的是跨越'心理临界点'的能力</strong>——99%想"一周赚百万"的人，已消失在市场。
        </p>

        <h2 className="text-2xl font-bold text-white mt-12 mb-6 flex items-center">
          <span className="w-1 h-6 bg-[#00ff88] mr-3 rounded-full"></span>
          第五章：正念革命——驯服大脑的原始本能
        </h2>
        <p className="text-gray-300 leading-relaxed mb-6">
          <strong className="text-purple-400">情绪不是敌人，而是被误用的生存机制</strong>。<br/>
          当交易屏幕亮起，一位客户的心率/血压/出汗量瞬间飙升——他已被市场"巴甫洛夫化"（如同听到铃声就流口水的狗）。<strong className="text-red-400">亏损恐惧已成条件反射</strong>。
        </p>
        
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-[#00ff88]">解决方案：正念（Mindfulness）</strong><br/>
          这不是玄学，而是经神经科学验证的<strong className="text-purple-400">大脑重训练技术</strong>：
        </p>
        <ol className="list-decimal pl-6 space-y-3 text-gray-300 mb-8">
          <li><strong className="text-blue-400">觉察想法</strong>：承认"这笔交易会亏钱"的念头只是大脑的警报，未必是真相；</li>
          <li><strong className="text-[#00ff88]">接纳无常</strong>：让焦虑像云朵飘过，不压制也不追随；</li>
          <li><strong className="text-yellow-400">锚定规则</strong>：当交易信号符合系统，就执行——无论内心多恐惧。</li>
        </ol>
        
        <div className="bg-[#00ff88]/10 border border-[#00ff88]/20 rounded-xl p-6 mb-8 border-l-4 border-l-[#00ff88]">
          <p className="m-0 text-[#00ff88]/90 italic leading-relaxed">
            "我每日冥想30分钟。这不是'放松技巧'，而是<strong className="text-[#00ff88]">在情绪劫持发生前夺回控制权</strong>。顶尖网球选手每天击球5000次，交易者却幻想不练习就能盈利？"
          </p>
        </div>
        
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-[#00ff88]">实操工具</strong>：
        </p>
        <ul className="list-disc pl-6 space-y-4 text-gray-300 mb-10">
          <li>
            <strong className="text-blue-400">交易日志三问</strong>（非记录盈亏！）：<br/>
            ① 今天哪点执行得最好？<br/>
            ② 哪个心理弱点暴露了？<br/>
            ③ 明日如何改进？
          </li>
          <li>
            <strong className="text-[#00ff88]">模拟训练</strong>：用历史数据回放，像外科医生练习缝合般打磨技术。质疑"没真钱就没用"的人，已输在起跑线。
          </li>
        </ul>

        <h2 className="text-2xl font-bold text-white mt-12 mb-6 flex items-center">
          <span className="w-1 h-6 bg-[#00ff88] mr-3 rounded-full"></span>
          第六章：终极真相——账户是你的照妖镜
        </h2>
        <p className="text-gray-300 leading-relaxed mb-6">
          <strong className="text-[#00ff88]">交易账户从不说谎</strong>。它精准映射你与不确定性的关系：
        </p>
        
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 mb-8 border-l-4 border-l-red-500">
          <p className="m-0 text-red-200 leading-relaxed">
            "有人净值达100万美元后突然崩盘——这不是技术问题，是潜意识信念在作祟：'我不配拥有这么多钱'。"
          </p>
        </div>
        
        <p className="text-gray-300 leading-relaxed mb-6">
          广告业早看透真相：<strong className="text-purple-400">95%的人类决策由潜意识驱动</strong>。交易者常误以为"赚钱=证明自我价值"，却把人生掌控权交给随机市场。
        </p>
        
        <p className="text-gray-300 leading-relaxed mb-6">
          <strong className="text-[#00ff88]">那位年入千万的导师告诉我</strong>：
        </p>
        
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-8 border-l-4 border-l-[#00ff88]">
          <p className="m-0 text-gray-300 leading-relaxed">
            "建仓后只有4个3分钟窗口评估交易：<br/>
            - 第2个窗口通常要止损退出，<br/>
            - <strong className="text-red-400">因为市场不欠你反转剧情</strong>。"
          </p>
        </div>
        
        <p className="text-gray-300 leading-relaxed mb-6">
          当同行抱怨"你错过暴涨行情"，他平静回应：
        </p>
        
        <div className="bg-white/5 border border-[#00ff88]/30 rounded-xl p-6 mb-8 text-center backdrop-blur-sm">
          <p className="m-0 text-xl text-blue-200 font-medium leading-relaxed">
            "它不符合我的规则，仅此而已。"
          </p>
        </div>
        
        <p className="text-gray-300 leading-relaxed mb-10">
          没有借口，没有幻想——他的飞机、豪宅、康州庄园，都是<strong className="text-[#00ff88]">规则纪律的副产品</strong>。
        </p>

        <h2 className="text-2xl font-bold text-white mt-12 mb-6 flex items-center">
          <span className="w-1 h-6 bg-[#00ff88] mr-3 rounded-full"></span>
          结语：输赢之上
        </h2>
        <div className="bg-gradient-to-br from-[#111] to-[#1a1a1a] border border-[#00ff88]/30 rounded-2xl p-8 mb-8 text-center shadow-[0_0_30px_rgba(0,255,136,0.1)]">
          <p className="text-xl text-white leading-relaxed mb-6 font-medium">
            "当你不再需要向世界证明'我是赢家'，<br/>
            当你学会在止损单成交时说'干得漂亮'，<br/>
            市场才真正向你敞开大门。"
          </p>
          <p className="text-lg text-[#00ff88] font-bold tracking-wide">
            ——最善输者，终成王者
          </p>
        </div>
      </motion.article>
    </div>
  );
}
