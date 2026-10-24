"use client";

import { useLanguage } from "@/components/language-provider";
import { ArrowLeft, BookOpen, Clock } from "lucide-react";
import Link from "next/link";
import { motion } from "motion/react";

export default function Why95PercentFailPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <Link href="/resources/psychology" className="inline-flex items-center text-gray-400 hover:text-[#00ff88] transition-colors mb-8">
        <ArrowLeft className="w-4 h-4 mr-2" />
        {t("psych.back")}
      </Link>

      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="prose prose-invert prose-lg max-w-none"
      >
        <header className="mb-12 border-b border-white/10 pb-8">
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
            <span className="flex items-center"><Clock className="w-4 h-4 mr-1" /> 2023-10-15</span>
            <span className="flex items-center"><BookOpen className="w-4 h-4 mr-1" /> 10 min read</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            从认知偏差到盈利之路：<br />
            <span className="text-[#00ff88]">为什么95%以上的交易者都失败了？</span>
          </h1>
        </header>

        <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 mb-10 border-l-4 border-l-[#00ff88] backdrop-blur-sm">
          <h3 className="text-xl font-bold text-white mb-4 mt-0">目录</h3>
          <ul className="space-y-2 text-gray-300 m-0 list-none pl-0">
            <li>• 介绍</li>
            <li>• 学习交易容易吗？</li>
            <li>• 交易好玩吗？</li>
            <li>• 大脑和不确定性</li>
            <li>• 启示：哪里出了错？</li>
          </ul>
        </div>

        <h2 className="text-2xl font-bold text-white mt-12 mb-6 flex items-center">
          <span className="w-1 h-6 bg-[#00ff88] mr-3 rounded-full"></span>
          介绍
        </h2>
        <p className="text-gray-300 leading-relaxed mb-6">
          我在曾经的一篇国外报告上读到，所有购买的书籍中有95%从未完整阅读过。这与亏钱交易者的人数的比例大致相同。为了自己，请大家找到读完本篇文章的动力，因为我知道如果你的动力是交易赚钱，那么你将在最后一章得到答案。
        </p>
        <p className="text-gray-300 leading-relaxed mb-10">
          当然这篇文章也是为我自己而写，灵感来自于我自己过去和现在与交易的斗争，也希望可以帮组正在泥潭中挣扎、迷茫的交易者。
        </p>

        <h2 className="text-2xl font-bold text-white mt-12 mb-6 flex items-center">
          <span className="w-1 h-6 bg-[#00ff88] mr-3 rounded-full"></span>
          学习交易容易吗？
        </h2>
        <p className="text-gray-300 leading-relaxed mb-6">
          学习交易容易吗？我会给你2个答案：
        </p>
        
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-6 border-l-4 border-l-[#00ff88]">
          <p className="m-0 text-gray-300">
            <strong className="text-[#00ff88] block mb-2">答案1：</strong>
            是的，学习交易非常容易。你要么点击"买入"，要么点击"卖出"，要么什么都不做。太容易了。
          </p>
        </div>
        
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-8 border-l-4 border-l-[#00ff88]">
          <p className="m-0 text-gray-300">
            <strong className="text-[#00ff88] block mb-2">答案2：</strong>
            是的，学习交易很容易，但要成为持续盈利的交易者是一个巨大的挑战。
          </p>
        </div>
        
        <p className="text-gray-300 leading-relaxed mb-6">
          交易的目标是持续盈利。目标是从其他交易者那里拿走钱，并将其存入你的银行账户。当你购买市场标的时，必须有人将其卖给你。当你赚取1块钱时，必须有人损失相同的金额。可能是散户，也可能是经纪商，还有结构投资者。总之，是你的概率很低，很低。。。
        </p>
        
        <p className="text-gray-300 leading-relaxed mb-6">
          这就是为什么不是每个人都能在交易游戏中获胜的原因。它不是为此而设计的。交易背后的机制很容易掌握，但获利之路是虚幻的，而且这个职业本身就是一个非常难以掌握的职业，以外汇交易为例，外汇是世界上最大的交易市场，交易量巨大，有很多大的玩家（国外被成为smart money），这些smart money除了有领先的信息资讯，先进的交易工具和优秀的人才以外，还有就是庞大的资金量，而这个资金量如同大海，个人交易者如同在大海中航行，顺流则以，逆流而亡，你的资金相较之下，不足以改变价格走势，有时，即使你顺流而行，但smart money可以先亏再赚，来把你先踢出局，从而获得更多的头寸。
        </p>
        
        <p className="text-gray-300 leading-relaxed mb-6">
          写这篇文章有一个目的：我希望写给自己一个用户手册。在手册中，我不是在写最佳指标或最佳交易时间框架。我也不是在抛出陈词滥调，如何如何。。。你可以挣到钱。即使是相同的交易系统框架，给两个人运行，非常大的概率是一个人可以挣钱，一个人会亏钱，因为每个人的认知，能力，情绪控制，习惯等等都不一样，每一个小的环节都会导致不同的结局。
        </p>
        
        <p className="text-gray-300 leading-relaxed mb-10">
          我不会告诉你让利润奔跑，相反，我将向你解释为什么你会让损失继续下去。你会明白你脑子里到底在想些什么。我将向你展示问题出在哪里以及为什么会出错。
        </p>

        <h2 className="text-2xl font-bold text-white mt-12 mb-6 flex items-center">
          <span className="w-1 h-6 bg-[#00ff88] mr-3 rounded-full"></span>
          交易好玩吗？
        </h2>
        <p className="text-gray-300 leading-relaxed mb-6">
          曾经偶然刷短视频的时候，看到一个美女在镜头前说："我不羡慕有钱人，就羡慕那种会做交易的交易大神，可以边旅行边做交易，只要有电脑，哪里都可以工作，没有时间约束。。。。"，看完我笑了，感觉她说的对但又貌似不对。
        </p>
        
        <p className="text-gray-300 leading-relaxed mb-6">
          无论是哪个领域，我们永远都只愿意看到那些最后幸存下来的一波人，没有观察到底有多少人倒在了他们身后，交易从入门到成功经历了很多个阶段，大多数人中途放弃，有些人在几个阶段里无限循环，却始终无法走向盈利，只有寥寥无几走了出来。
        </p>
        
        <p className="text-gray-300 leading-relaxed mb-6">
          交易有时很枯燥，每天花大量的时间来盯盘，这种集中注意力可能会造成精神负担，而且你无法保证获得任何回报。通常需要极大的耐心，有时交易会变得非常无聊。想想一个演员正在拍摄一部轰动一时的电影。电影《泰坦尼克号》时长3小时。拍摄耗时160天。他们平均每天拍摄一分钟。闲坐或准备时间很长，只拍了1分钟的场景。我敢肯定演员们每天也要工作8个小时。交易有时和表演很像，需要大量的等待。
        </p>
        
        <p className="text-gray-300 leading-relaxed mb-6">
          当交易对我们来说进展顺利时，你似乎觉得这是世界上最简单的事情。你买东西。它上升了。有时就是这么简单。你卖掉它，你恰好在顶部卖掉。你觉得自己像个神一样。当盈利流入你的银行账户，你感觉自己的梦想正在实现。
        </p>
        
        <p className="text-gray-300 leading-relaxed mb-6">
          当你在那个阶段，你认为这种状态永远不会改变。你认为好日子会继续下去。你无法想象当一切不在按照你之前设想的剧本走，你的心态会发生怎样的变化，我朋友曾说这就是"梦想照进现实"，只是并非我们想要的现实。
        </p>
        
        <p className="text-gray-300 leading-relaxed mb-10">
          如果你在交易生涯中经历过"低迷"，然后从中走出来，你会对自己说："我破解了它！我终于破解它了！"然而再次经历失败，你是否又会对自己产生自我怀疑呢？
        </p>

        <h2 className="text-2xl font-bold text-white mt-12 mb-6 flex items-center">
          <span className="w-1 h-6 bg-[#00ff88] mr-3 rounded-full"></span>
          大脑和不确定性
        </h2>
        <p className="text-gray-300 leading-relaxed mb-6">
          在行为经济学中，研究人员研究了人们如何在不确定的情况下选择不同的情景。这种被称为前景理论，它揭示了人们如何根据与结果相关的风险做出不合理的决定（这句话有点绕，但是很重要）。而映射到交易中，但你在交易前有一个好消息或者坏消息的时候，你对待接来的交易态度截然相反。
        </p>
        
        <p className="text-gray-300 leading-relaxed mb-6">
          结合我自己和周围做交易的朋友最开始几年的交易经验，我得出的论点是：大多数在交易日早些时候遭受重大损失的交易者会倾向于不计后果地交易以挽回损失。相反，早早获利丰厚的交易者会在当天余下的时间里选择谨慎行事。
        </p>
        
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 mb-6 border-l-4 border-l-red-500">
          <p className="m-0 text-red-200 leading-relaxed">
            切身体会一下，我们在交易中，第一个小时内亏损了50,00美元。我现在奋力回到光明中，到一天结束时，我回到了当天的零状态。我会感到巨大的成就感。我很沮丧，但一切都回来了。我可能没有赚到一分钱，但我感到欣喜若狂，甚至可能是幸福的。
          </p>
        </div>
        
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 mb-8 border-l-4 border-l-red-500">
          <p className="m-0 text-red-200 leading-relaxed">
            再想象一下，我在交易的第一个小时就赚了50,00美元，但到当天结束时，我已经输光了。我可能心情好吗？不好，而且我会很生气，心情不好。感觉这一天会是失败的一天。
          </p>
        </div>
        
        <p className="text-gray-300 leading-relaxed mb-6">
          这些概念和认知偏见在某种程度上是重叠的，并且相互影响。虽不是那么明确，但在一片混乱中，很明显我们的情绪被搞砸了。
        </p>
        
        <p className="text-gray-300 leading-relaxed mb-6">
          选择的措辞可以突出同一决定的积极或消极方面，我们来看一则药物说明的两种不同说法：
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 border-l-4 border-l-red-500">
            <p className="m-0 text-red-400 font-bold mb-2">#1</p>
            <p className="m-0 text-gray-300">这种药物会杀死100人中的10人</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 border-l-4 border-l-[#00ff88]">
            <p className="m-0 text-[#00ff88] font-bold mb-2">#2</p>
            <p className="m-0 text-gray-300">该药物将拯救100人中的90人</p>
          </div>
        </div>
        
        <p className="text-gray-300 leading-relaxed mb-6">
          阿莫斯·内森(AmosNathan)是一位认知和数学心理学家，认知科学专业的学生，丹尼尔·卡尼曼(DanielKahneman)的合作者，以及发现系统性人类认知偏差和处理风险的人物。他早期的大部分工作都与测量的基础有关。他与卡尼曼的早期合作主要集中在预测心理学和概率判断上；后来他们合作发展了前景理论，旨在解释人类的非理性经济选择，被认为是行为经济学的开创性著作之一。（来源：维基百科，感兴趣的可以深入研究一下）
        </p>
        
        <p className="text-gray-300 leading-relaxed mb-6">
          框架效应是认知偏差的一个例子，在这种情况下，人们以不同的方式对特定的选择做出反应，这取决于它是如何呈现的。我们的交易亦如此：
        </p>
        
        <p className="text-gray-300 leading-relaxed mb-10">
          当出现积极框架时，人们倾向于规避风险，而当出现消极框架时，人们往往会寻求风险。收益和损失在场景中被定义为对结果的描述（例如，失去或挽救生命、治疗和未治疗的疾病患者、在事故中挽救和失去的生命等。前景理论表明，损失比同等收益更重要。确定性增益（确定性效应和伪确定性效应）优于概率增益。概率损失优于确定损失。
        </p>

        <h2 className="text-2xl font-bold text-white mt-12 mb-6 flex items-center">
          <span className="w-1 h-6 bg-[#00ff88] mr-3 rounded-full"></span>
          启示：哪里出了错？
        </h2>
        <p className="text-gray-300 leading-relaxed mb-6">
          考虑到进入交易领域的人中有很大一部分人未能实现从他们的时间和努力中赚到钱的梦想和抱负，因此得出这样的结论是合乎逻辑的，即我们作为交易者需要在交易时与我们的自然冲动和倾向作斗争。我们天生就无法进行良好的交易。
        </p>
        
        <p className="text-gray-300 leading-relaxed mb-6">
          与自我提升领域的大多数事情一样，首先是意识到我们的缺点，然后是致力于改进的专注实践。
        </p>
        
        <p className="text-gray-300 leading-relaxed mb-6">
          我们再来看一个例子：
        </p>
        
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-8 border-l-4 border-l-[#00ff88]">
          <p className="m-0 text-gray-300 leading-relaxed">
            预计治疗A会导致400人死亡。治疗B有33%的几率没有人会死，但有66%的几率每个人都会死。<br/><br/>
            如果你处理这些数字：<br/>
            治疗A将导致400人死亡–200人幸存，治疗B将导致396人死亡–198人幸存，然后将此选择呈现给参与者。<br/><br/>
            有积极的框架：即有多少人会活。<br/>
            也有负面框架：即有多少人会死。<br/><br/>
            处理A：72%的参与者选择了治疗A而不是治疗B，当它被呈现为积极的框架（"拯救200条生命"）时。选择治疗A的几率比治疗B高出22%，此时同样的选择会出现负面框架（"400人会死"）。
          </p>
        </div>
        
        <p className="text-gray-300 leading-relaxed mb-6">
          框架效应对人们的决策方式有着巨大的影响。人们倾向于规避风险："他们不会为了收益而赌博，但他们会为了避免某种损失而赌博"（例如，当出现负面框架时选择治疗B）。
        </p>
        
        <p className="text-gray-300 leading-relaxed mb-6">
          在交易的背景下，这是相关的，因为我们倾向于回避痛苦的选择而倾向于积极的选择。在交易中这可能是完全错误的做法。我们现在来看看这种现实如何影响交易者。
        </p>
        
        <p className="text-gray-300 leading-relaxed mb-6">
          在经济学和决策理论中，损失厌恶是指人们强烈倾向于避免损失而不是获得收益。许多研究最终证实，损失在心理上的影响力是收益的两倍。"这里的重要词是趋势。我们将希望交易有很高获胜机会的策略。这就是我们要寻找的。如果我们的情绪不受控制，那么我们就会倾向于遵循阻力最小的路径。
        </p>
        
        <div className="bg-[#00ff88]/10 border border-[#00ff88]/20 rounded-xl p-6 mb-8 border-l-4 border-l-[#00ff88]">
          <p className="m-0 text-[#00ff88]/90 italic leading-relaxed">
            我应该把最后一句话写成这样：我们倾向于走痛苦最少的道路。<br/><br/>
            如果我们的情绪不受控制，那么我们将尽一切努力避免任何情绪上的痛苦和不适。这就是人性，这就是我们在市场交易时对我们不利的因素。<br/><br/>
            我们的思想旨在远离痛苦。正是出于这个原因，任何努力都不会轻易取得成功，因为你必须忍受一些超出人群放弃程度的事情。
          </p>
        </div>
        
        <p className="text-gray-300 leading-relaxed mb-6">
          <strong className="text-red-400">大多数交易者有什么共同点？</strong>当他们应该充满希望时，他们却害怕了。当他们恐惧时，他们充满希望。不同的人在市场上有不同的问题。由于金融市场中存在无限的可能性和选择，因此我们永远不会对每一种可能性和选择进行评估，这是理所当然的。平顺且有利可图的交易之路是定义我们自己的生活参数。
        </p>
        
        <p className="text-gray-300 leading-relaxed mb-4">
          我们需要回答的一些问题是：
        </p>
        <ul className="list-disc pl-6 space-y-2 text-gray-300 mb-8">
          <li>为什么大多数交易者发现增加亏损头寸比增加盈利头寸更容易？</li>
          <li>为什么大多数交易者很难让获胜的头寸继续握在手里？</li>
          <li>为什么大多数交易者很难拿住一个盈利很大的头寸？</li>
          <li>为什么大多数交易者很难平掉一个亏损很大的头寸？</li>
        </ul>
        
        <p className="text-gray-300 leading-relaxed mb-6">
          成功的交易需要你能够处理情绪上的痛苦！我的论点是，成功的交易违背了我们的本能，但我们可以在情感上训练自己一遍又一遍地做正确的事。一旦你做得很好，你可能就不会再感到任何情绪上的痛苦了。交易有可能变得非常无聊，有点像抛硬币，希望得到特定的结果。这只是一遍又一遍地重复这个过程的问题。
        </p>
        
        <p className="text-gray-300 leading-relaxed mb-6">
          我不觉得那是痛苦，但我发现坐在过去的赢利交易中非常不舒服。亏损交易更容易。对于绝大多数人来说，亏损的交易在情感上没有那么痛苦。你可能不相信。它甚至可能不适用于所有人，但数字不会说谎。
        </p>
        
        <p className="text-gray-300 leading-relaxed mb-6">
          当交易者处于亏损交易中时，需要付出一些努力才能让希望破灭。它永远不会真正消失，因为在逆境中充满希望是我们的天性。我确定你可能认为我只是打错了字。我没有。当你处于亏损交易中时，你很可能会感到一些痛苦，但更有可能是一种更大的希望。
        </p>
        
        <p className="text-gray-300 leading-relaxed mb-6">
          对于许多交易者来说，处于盈利状态的情绪通常比处于亏损状态时更糟糕，因为他们无法忍受看到利润消失。我的一个朋友，和其他一样有问题的交易者，对我说："我讨厌看到利润消失。"正是出于这个原因，他们胜率很高，但总体下来，损失金额远大于利润。
        </p>
        
        <p className="text-gray-300 leading-relaxed mb-6">
          我试图说服，让他们明白我的观点。这类似于要求吸烟者戒烟，因为我告诉他这对他有害。他知道这一点。他看到香烟包装上的警告。他看到了可怕的画面。然而，与看到警告和图片相比，他仍然认为戒烟带来的痛苦更大。如果他用意志力停止，或者使用贴剂和尼古丁口香糖，那么他只是用另一种形式代替了一种给药方式。这可能会暂时帮助他。为了获得永久解决方案，他需要了解吸烟陷阱的性质（交易的本质）。
        </p>
        
        <p className="text-gray-300 leading-relaxed mb-6">
          如果你想成为一名盈利的交易者，持续盈利，那么你需要了解投机陷阱的本质。这将需要你做一些非同寻常的事情。国外有个小哥叫"卡尼曼"，他和他的团队创造了一个表达所有亏损交易者内心深处的声音：
        </p>
        
        <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-6 mb-8 border-l-4 border-l-purple-500">
          <p className="m-0 text-purple-200 italic leading-relaxed">
            "投资者不太愿意承认损失（如果他们出售价值下降的资产，他们将被迫这样做），但更愿意承认收益。"
          </p>
        </div>
        
        <p className="text-gray-300 leading-relaxed mb-6">
          这是处置效应触及问题的核心。卖出有利可图的交易要容易得多，因为它会在大脑中产生一种欣快感。卖出亏损的交易会在大脑中产生一种痛苦的感觉。
        </p>
        
        <p className="text-gray-300 leading-relaxed mb-6">
          因此，自然的结论是决定不卖出亏损的交易，因为这样就不会有痛苦。更重要的是，只要亏损不记在交易账户上，交易就有转机的希望。生活中也有许多相似的例子，我可以举几个：
        </p>
        
        <ul className="list-disc pl-6 space-y-3 text-gray-300 mb-8">
          <li><strong className="text-[#00ff88]">减肥：</strong>这是痛苦的，它需要坚定的承诺和接受短期痛苦以换取快乐的前景。</li>
          <li><strong className="text-[#00ff88]">为专业考试学习：</strong>这是一项艰苦的工作，它需要坚定的承诺和接受痛苦。</li>
          <li><strong className="text-[#00ff88]">抚养孩子：</strong>有时我们要告诉孩子该怎么做，他就会哭，我们很想屈服以让孩子停止哭泣，或者减轻我们的内疚或痛苦，但我们坚持是因为我们知道孩子需要引导和一个赖以生存的框架。</li>
        </ul>
        
        <p className="text-gray-300 leading-relaxed mb-6">
          我应该声明，我是一个重度吸烟者(严重时期，一天两包半)，我通过了解尼古丁成瘾的本质和它的惊人陷阱，彻底戒掉了这个烟瘾。这又是通过一本书实现的，Allan Carr写的一本很棒的书。我从头到尾读了两遍，然后信息就被吸收了。解决方案很简单。你必须了解陷阱的本质。一旦你了解了大脑如何欺骗你，让你认为"抽一口"就可以了，那么你就会知道自己面临的是什么。
        </p>
        
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 mb-8 border-l-4 border-l-red-500">
          <p className="m-0 text-red-200 italic leading-relaxed">
            不要平仓，这里有双底，行情会守住，再给它一点时间。这个行情没办法再跌了，看跌多了，再买点，这样均价就好多了。<br/><br/>
            这里有一个带有趋势线的斐波那契支撑/阻力位，市场将会反弹。<br/><br/>
            如果它在这里转向并再次向下移动，你将损失大量利润。如果你在这里平仓，你可以弥补上一笔交易的损失。
          </p>
        </div>
        
        <p className="text-gray-300 leading-relaxed mb-8">
          这听起来很熟悉吗？不管我是赢是输，头脑总是希望我做与构成良好交易的事情相反的事情。一开始会有一些痛苦，因为你正在改变自己的行为。关于吸烟和饮酒的书籍的力量在于它们能够让你了解陷阱的本质、药物的依赖性，并让你相信一切都会很快好起来。正是不断重复它真的很容易才有所不同。是的，他们承认未来会有一些挑战，但他们为你提供了应对这些挑战的工具。
        </p>
        
        <div className="bg-gradient-to-br from-[#111] to-[#1a1a1a] border border-[#00ff88]/30 rounded-2xl p-8 mb-8 text-center shadow-[0_0_30px_rgba(0,255,136,0.1)]">
          <p className="text-xl text-white leading-relaxed mb-6 font-medium">
            了解你的敌人和他的诡计，你就能打败他。一旦你有了理解，<br/>
            正确交易就不会比一顿美餐后对一根香烟说不更难了。
          </p>
          <p className="text-lg text-[#00ff88] font-bold tracking-wide">
            你坚定的信念是对抗怀疑者和诋毁者的最好盔甲，<br/>无论是来自内部还是外部。
          </p>
        </div>
        
        <div className="bg-white/5 border-t border-[#00ff88]/50 rounded-xl p-6 text-center">
          <p className="m-0 text-gray-400 font-medium">
            认知失调：当你持有两种相互矛盾的信念时，心理不适的体验。<br/>
            了解它，接受它，然后超越它。
          </p>
        </div>
      </motion.article>
    </div>
  );
}
