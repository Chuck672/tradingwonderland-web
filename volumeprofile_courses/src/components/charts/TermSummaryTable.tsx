interface TermSummaryTableProps {
  language: 'zh' | 'en';
}

const rows = [
  {
    term: 'POC',
    full: 'Point of Control',
    def: {
      zh: '成交量最大的价格水平',
      en: 'Price level with the highest traded volume',
    },
    meaning: {
      zh: '公允价格，磁铁效应',
      en: 'Fair price and magnet effect',
    },
  },
  {
    term: 'VA',
    full: 'Value Area',
    def: {
      zh: '包含约70%成交量的价格区间',
      en: 'Price range containing about 70% of total volume',
    },
    meaning: {
      zh: '市场认可的合理范围',
      en: 'Market-accepted fair range',
    },
  },
  {
    term: 'VAH',
    full: 'Value Area High',
    def: {
      zh: '价值区间上边界',
      en: 'Upper boundary of the Value Area',
    },
    meaning: {
      zh: '上方阻力或突破参考',
      en: 'Upper resistance and breakout reference',
    },
  },
  {
    term: 'VAL',
    full: 'Value Area Low',
    def: {
      zh: '价值区间下边界',
      en: 'Lower boundary of the Value Area',
    },
    meaning: {
      zh: '下方支撑或跌破参考',
      en: 'Lower support and breakdown reference',
    },
  },
  {
    term: 'HVN',
    full: 'High Volume Node',
    def: {
      zh: '成交量密集的价格节点',
      en: 'High-volume concentration node',
    },
    meaning: {
      zh: '支撑阻力与价格减速区',
      en: 'Support/resistance and price deceleration zone',
    },
  },
  {
    term: 'LVN',
    full: 'Low Volume Node',
    def: {
      zh: '成交量稀疏的价格节点',
      en: 'Low-volume sparse node',
    },
    meaning: {
      zh: '价格加速穿越区，不适合追单入场',
      en: 'Fast-travel zone, usually poor for chasing entries',
    },
  },
  {
    term: 'Naked POC',
    full: '-',
    def: {
      zh: '历史上未被回测的 POC',
      en: 'Historical POC not revisited by price',
    },
    meaning: {
      zh: '未完成的任务，具有价格磁吸属性',
      en: 'Unfinished business with magnet-like pull',
    },
  },
];

export function TermSummaryTable({ language }: TermSummaryTableProps) {
  const headers =
    language === 'zh'
      ? ['术语', '英文全称', '定义', '交易含义']
      : ['Term', 'Full Name', 'Definition', 'Trading Meaning'];

  return (
    <div className="w-full h-full p-4">
      <div className="h-full border border-neutral-700/70 rounded-lg overflow-hidden bg-[#080b12]">
        <table className="w-full h-full table-fixed text-sm">
          <thead>
            <tr className="bg-[#0f1628] text-[#00ff88]">
              {headers.map((h) => (
                <th key={h} className="px-3 py-2 text-left font-semibold border-b border-neutral-700/70">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.term} className="border-b border-neutral-800/80 last:border-b-0">
                <td className="px-3 py-2 text-neutral-100 font-semibold align-top">{row.term}</td>
                <td className="px-3 py-2 text-neutral-300 align-top">{row.full}</td>
                <td className="px-3 py-2 text-neutral-300 align-top">{row.def[language]}</td>
                <td className="px-3 py-2 text-neutral-200 align-top">{row.meaning[language]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
