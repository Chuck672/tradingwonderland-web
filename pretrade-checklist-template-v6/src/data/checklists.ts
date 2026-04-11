export type ChecklistMode = "quick" | "standard" | "strict";

export type ChecklistItem = {
  id: string;
  label: string;
  desc?: string;
  /** 否决项：任一为否，则不交易 */
  kill?: boolean;
};

export type ChecklistSection = {
  id: string;
  title: string;
  hint?: string;
  items: ChecklistItem[];
};

export type ChecklistTemplate = {
  mode: ChecklistMode;
  title: string;
  subtitle: string;
  sections: ChecklistSection[];
};

const q = (id: string) => `q_${id}`;
const s = (id: string) => `s_${id}`;
const x = (id: string) => `x_${id}`;

export const CHECKLISTS: Record<ChecklistMode, ChecklistTemplate> = {
  quick: {
    mode: "quick",
    title: "1 分钟快检",
    subtitle: "用于“下单前最后一眼”，只检查最容易导致大亏的关键风险点。",
    sections: [
      {
        id: "q_kill",
        title: "否决项（Kill Switch）",
        hint: "任何一项为否 → 本次不交易。",
        items: [
          { id: q("plan"), label: "我能用一句话写清楚：为什么此刻必须交易？", desc: "信号/逻辑清晰，不是无聊、报复、FOMO。", kill: true },
          { id: q("risk"), label: "本笔风险可控：止损明确、风险金额/仓位已计算", desc: "不允许“先上车再说”。", kill: true },
          { id: q("sl"), label: "止损位置有效（不是拍脑袋），且我愿意执行", desc: "不靠“扛单”博回撤。", kill: true },
          { id: q("news"), label: "没有我无法承受的事件风险（数据/财报/突发新闻）", desc: "事件临近/不确定性高 → 降级或放弃。", kill: true },
          { id: q("state"), label: "我当前状态适合交易（睡眠/情绪/专注）", desc: "状态差 → 严格版复核或直接休息。", kill: true },
        ],
      },
      {
        id: "q_setup",
        title: "信号与环境",
        items: [
          { id: q("context"), label: "大方向/结构不与我做的方向对冲", desc: "至少不在强势反向趋势里硬做。" },
          { id: q("liquidity"), label: "已确认关键流动性/关键价位（高低点、区间边界、VWAP/均线等）" },
          { id: q("time"), label: "当前时段适合这类策略", desc: "避免低流动性时段硬做。" },
        ],
      },
      {
        id: "q_exec",
        title: "执行",
        items: [
          { id: q("order"), label: "下单类型正确（市价/限价/条件单）且不会误触发" },
          { id: q("rr"), label: "计划盈亏比（RR）合理", desc: "不是“亏大赚小”的结构。", kill: true },
          { id: q("plan_b"), label: "我知道出场规则：止损/止盈/无效条件", desc: "至少有一个明确的“放弃条件”。" },
        ],
      },
    ],
  },

  standard: {
    mode: "standard",
    title: "标准版",
    subtitle: "覆盖信号、风险、环境、执行、情绪与纪律。建议作为默认流程。",
    sections: [
      {
        id: "s_goal",
        title: "计划与目标",
        items: [
          { id: s("intent"), label: "本笔属于哪类机会？（趋势/反转/突破/回踩/均值回归…）", desc: "类型匹配策略库。", kill: true },
          { id: s("edge"), label: "优势来自哪里？（结构/流动性/资金面/统计优势）", kill: true },
          { id: s("invalidate"), label: "无效条件已写清楚", desc: "触发无效条件立即退出，而不是“再等等”。", kill: true },
        ],
      },
      {
        id: "s_context",
        title: "市场环境",
        items: [
          { id: s("trend"), label: "更高周期趋势/结构已确认", desc: "至少知道自己是在顺势还是逆势。", kill: true },
          { id: s("vol"), label: "波动水平适配策略", desc: "波动过低/过高都要调整策略或仓位。" },
          { id: s("events"), label: "已检查重要事件日程", desc: "宏观数据/财报/政策/突发新闻。", kill: true },
          { id: s("liquidity"), label: "流动性与点差正常", desc: "点差异常或滑点大 → 放弃或减仓。", kill: true },
        ],
      },
      {
        id: "s_risk",
        title: "风险管理（必须可量化）",
        hint: "风险不明确 ≈ 在赌博。",
        items: [
          { id: s("risk_budget"), label: "本日/本周风险预算未超标", desc: "达到上限 → 休息。", kill: true },
          { id: s("position"), label: "仓位按止损距离计算，而不是凭感觉", kill: true },
          { id: s("sl"), label: "止损放在结构/逻辑位置，而非随意数字", kill: true },
          { id: s("correlation"), label: "相关性风险已考虑", desc: "多笔同向高相关 ≈ 叠加风险。", kill: true },
          { id: s("max_loss"), label: "我接受最坏情况（含滑点/跳空）仍可承受", kill: true },
        ],
      },
      {
        id: "s_execution",
        title: "执行计划",
        items: [
          { id: s("entry_trigger"), label: "入场触发条件明确", desc: "满足条件才进，不满足不追。", kill: true },
          { id: s("order_type"), label: "订单类型与保护单设置正确", desc: "止损/止盈（或条件出场）准备就绪。", kill: true },
          { id: s("rr"), label: "计划 RR 与止盈结构合理", desc: "至少不低于你系统要求。", kill: true },
          { id: s("scale_out"), label: "分批/移动止损规则明确（如使用）", desc: "避免随意改动。" },
          { id: s("time_stop"), label: "时间止损/无效时间窗口已设定", desc: "如果迟迟不动/不走预期，怎么处理？" },
        ],
      },
      {
        id: "s_psy",
        title: "心理与纪律",
        items: [
          { id: s("emotion"), label: "我现在不是在冲动状态（FOMO/报复/想翻本）", kill: true },
          { id: s("focus"), label: "专注环境良好（不分心/不赶时间）", kill: true },
          { id: s("rules"), label: "我没有破坏系统规则（例如：加仓、移动止损、频繁换标的）", kill: true },
          { id: s("exit_commit"), label: "我承诺执行止损，不与市场争论", kill: true },
        ],
      },
    ],
  },

  strict: {
    mode: "strict",
    title: "严格版",
    subtitle: "适用于状态波动、重大事件日、连续亏损后、或策略切换期。包含更强的“否决/降级”机制。",
    sections: [
      {
        id: "x_kill",
        title: "否决项（更严格）",
        hint: "任何一项为否 → 本次不交易或只做模拟/观察。",
        items: [
          { id: x("setup_a"), label: "机会质量≥B（你自己的 A/B/C/D 标准）", desc: "质量低只会消耗纪律。", kill: true },
          { id: x("no_overtrade"), label: "今日/本周没有过度交易迹象", desc: "频率失控是大亏的前兆。", kill: true },
          { id: x("sleep"), label: "睡眠 ≥ 6 小时且精神状态正常", kill: true },
          { id: x("loss_streak"), label: "若处于连亏/回撤期，已启用降级规则（减仓/减少频次）", kill: true },
          { id: x("tech_ok"), label: "交易系统/网络/下单通道正常", desc: "任何技术不确定性 → 不交易。", kill: true },
        ],
      },
      {
        id: "x_context",
        title: "环境与结构（详细）",
        items: [
          { id: x("htf_map"), label: "更高周期关键位已标注（支撑/阻力/供需区）", kill: true },
          { id: x("ltf_trigger"), label: "低周期触发与高周期方向一致或有明确反转依据", kill: true },
          { id: x("range_or_trend"), label: "已判断当下属于趋势/震荡", desc: "并选择适配策略。", kill: true },
          { id: x("event_window"), label: "事件窗口处理明确", desc: "事件前不入/只减仓/只做突破后确认等。", kill: true },
          { id: x("liquidity_pools"), label: "流动性池与潜在扫损路径已预判", desc: "避免把止损放在“大家都放的位置”。" },
        ],
      },
      {
        id: "x_risk",
        title: "风险预算（细则）",
        items: [
          { id: x("daily_limit"), label: "日亏损上限与触发动作明确", desc: "触发后停止交易。", kill: true },
          { id: x("weekly_limit"), label: "周亏损/回撤阈值与触发动作明确", kill: true },
          { id: x("risk_per_trade"), label: "单笔风险符合规则（例如 ≤ 1R 或 ≤ 1%）", kill: true },
          { id: x("correlation"), label: "组合相关性检查通过", desc: "避免隐含杠杆。", kill: true },
          { id: x("gap_slippage"), label: "考虑跳空/滑点后仍可承受", kill: true },
        ],
      },
      {
        id: "x_execution",
        title: "执行细节（防止“临场失控”）",
        items: [
          { id: x("entry_price"), label: "入场价格区间明确（允许偏差范围）", kill: true },
          { id: x("sl_tp_ready"), label: "止损/止盈（或条件出场）已预先挂好", kill: true },
          { id: x("no_move_sl"), label: "止损不向亏损方向移动（除非系统规则允许）", kill: true },
          { id: x("scale_rules"), label: "加仓/减仓规则明确且写下来", desc: "没有规则就不加仓。", kill: true },
          { id: x("time_stop"), label: "时间止损明确", desc: "多久不走预期就退出？", kill: true },
          { id: x("one_change_rule"), label: "只允许做一次计划外变更（或不允许）", desc: "防止不断改计划。", kill: true },
        ],
      },
      {
        id: "x_psy",
        title: "心理/生理状态与行为约束",
        items: [
          { id: x("emotion_label"), label: "我能命名当前情绪（具体到词）", desc: "无法命名通常意味着失控。", kill: true },
          { id: x("no_revenge"), label: "没有“想翻本/报复市场”的想法", kill: true },
          { id: x("break_rule"), label: "若连续 2 笔执行偏差，立即休息 30 分钟", desc: "防止滑坡。", kill: true },
          { id: x("post_trade"), label: "已承诺交易后记录：是否按计划执行 + 偏差原因", kill: true },
        ],
      },
      {
        id: "x_final",
        title: "最终确认（按下按钮前）",
        hint: "最后 10 秒，防止“一时冲动”。",
        items: [
          { id: x("read_plan"), label: "我已重新读一遍计划（入/出/无效/风险）", kill: true },
          { id: x("accept_loss"), label: "我接受这笔交易可能亏损，并且不会因此改变纪律", kill: true },
          { id: x("execute_only"), label: "我只执行，不预测", desc: "按规则走，不在过程中写新故事。", kill: true },
        ],
      },
    ],
  },
};
