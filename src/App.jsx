import React, { useMemo, useState } from "react";
import {
  BrainCircuit,
  LineChart,
  BarChart3,
  Bot,
  Layers,
  ShieldAlert,
  Rocket,
  Copy,
  Check,
  Trophy,
  PlayCircle,
  MonitorSmartphone,
  Cpu,
  Sparkles,
  TerminalSquare,
  ChevronDown,
  CheckCircle2,
  XCircle,
  CircleDot,
  AlertTriangle,
  Compass,
  Workflow,
  Database,
  Code2,
  ClipboardCheck,
  Gauge,
} from "lucide-react";

const missions = [
  {
    id: "m1",
    label: "Mission 1",
    title: "AI 技術分析雷達",
    status: "Starter",
    icon: LineChart,
    color: "blue",
    description: "計算 SMA、RSI、MACD、布林通道，判斷趨勢、動能與波動。",
    goal: "完成一個可輸入股票代號與期間，並輸出技術指標圖表與初步解讀的分析模組。",
    tools: ["Python", "pandas", "yfinance", "ta", "matplotlib", "Streamlit"],
    steps: [
      "下載股價資料，整理 Open、High、Low、Close、Volume。",
      "計算 SMA20、SMA60、RSI、MACD 與布林通道。",
      "繪製價格線、均線、RSI、MACD 與布林通道圖。",
      "請 AI 根據指標輸出趨勢、動能與波動說明。",
      "把結果整理成 Streamlit 頁面區塊。",
    ],
    prompt:
      "請扮演金融科技助教。根據我提供的股票技術指標結果，包括 SMA20、SMA60、RSI、MACD、布林通道，請用教學語氣解釋目前趨勢、動能、波動狀態與可能風險。請不要給買賣建議，只能做研究與教學分析。",
    colab:
      "在 Colab 中先完成資料下載、技術指標計算與圖表繪製。確認每一個指標欄位沒有大量缺漏值，再將核心函數整理成可重複呼叫的模組。",
    streamlit:
      "建立股票代號輸入框、期間選單、技術指標勾選區、圖表顯示區與 AI 解讀區。",
    checklist: [
      "可以成功輸入股票代號",
      "可以計算 SMA、RSI、MACD、布林通道",
      "可以產生至少三張圖",
      "可以用 Prompt 生成教學式解讀",
      "有加入非投資建議聲明",
    ],
    risk: "技術指標是落後或同步資訊，不能保證未來價格走勢。RSI、MACD、均線交叉都可能出現假訊號。",
  },
  {
    id: "m2",
    label: "Mission 2",
    title: "策略回測引擎",
    status: "Core",
    icon: BarChart3,
    color: "purple",
    description: "建立 SMA20/SMA60 策略，和 Buy and Hold 比較績效。",
    goal: "建立一個基礎策略回測模組，讓學生理解交易訊號、報酬計算、績效比較與 look-ahead bias。",
    tools: ["Python", "pandas", "numpy", "matplotlib", "Streamlit"],
    steps: [
      "建立 SMA20 與 SMA60。",
      "當 SMA20 大於 SMA60 時，設定持有部位。",
      "使用 position.shift(1) 避免使用未來資訊。",
      "計算策略日報酬與 Buy and Hold 日報酬。",
      "比較累積報酬、年化報酬、波動度、Sharpe Ratio 與最大回撤。",
    ],
    prompt:
      "請根據我的回測結果，包含策略累積報酬、Buy and Hold 累積報酬、年化報酬、年化波動度、Sharpe Ratio、最大回撤，幫我寫一段教學式績效分析。請特別說明策略優勢、限制、可能過度配適問題，以及為什麼回測不代表未來報酬。",
    colab:
      "在 Colab 中建立回測流程，特別檢查交易訊號是否有 shift(1)。將績效指標整理成表格，並輸出權益曲線。",
    streamlit:
      "建立策略參數輸入區，例如短天期均線、長天期均線、交易成本假設，並顯示績效表與累積報酬圖。",
    checklist: [
      "策略訊號有使用 shift(1)",
      "有計算策略與 Buy and Hold 報酬",
      "有畫出累積報酬比較圖",
      "有輸出績效指標表",
      "有說明回測限制",
    ],
    risk: "回測容易受到資料探勘、參數過度配適、交易成本低估與未來函數偏誤影響。",
  },
  {
    id: "m3",
    label: "Mission 3",
    title: "AI 個股研究報告",
    status: "AI Report",
    icon: Bot,
    color: "pink",
    description: "整合技術指標與回測結果，生成專業個股分析報告。",
    goal: "把技術分析結果、回測表現與風險資訊整合成一份具結構的 AI 股票研究報告。",
    tools: ["Python", "Gemini API", "Prompt Engineering", "Streamlit"],
    steps: [
      "整理技術指標摘要。",
      "整理回測績效表。",
      "整理風險指標，例如波動度、最大回撤。",
      "設計報告生成 Prompt。",
      "讓 Gemini API 產生教學式研究報告。",
    ],
    prompt:
      "請扮演金融科技課程中的 AI 研究助理。根據以下資料：技術指標摘要、策略回測績效、最大回撤、Sharpe Ratio、波動度，生成一份個股研究報告。報告需包含：一、資料摘要；二、技術面觀察；三、策略回測結果；四、風險與限制；五、教學重點。請避免任何直接買進、賣出或報酬保證用語。",
    colab:
      "在 Colab 中先把技術指標與回測結果整理成 dictionary 或 markdown 字串，模擬丟給 AI 產生報告。",
    streamlit:
      "建立一鍵產生 AI 報告按鈕，並將報告分成摘要、技術分析、回測分析、風險提醒四個區塊。",
    checklist: [
      "報告有固定結構",
      "報告有引用技術指標與績效數據",
      "報告沒有直接投資建議",
      "報告有風險提醒",
      "報告可複製或下載",
    ],
    risk: "AI 可能產生過度肯定或不精確的描述，因此所有 AI 文字都需要人工檢查。",
  },
  {
    id: "m4",
    label: "Mission 4",
    title: "智能投資組合",
    status: "Portfolio",
    icon: Layers,
    color: "cyan",
    description:
      "比較多檔股票，建立 AI Score，產生等權重、反波動與最小變異組合。",
    goal: "讓學生理解多資產比較、風險分散、權重配置與 AI Score 的設計邏輯。",
    tools: ["Python", "pandas", "numpy", "scipy", "Streamlit"],
    steps: [
      "輸入多檔股票代號。",
      "計算每檔股票的報酬、波動、最大回撤與技術面分數。",
      "建立簡化 AI Score。",
      "比較等權重、反波動權重與最小變異權重。",
      "輸出投資組合績效與風險圖。",
    ],
    prompt:
      "請根據多檔股票的報酬率、波動度、最大回撤、技術指標分數與 AI Score，說明不同投資組合權重方法的差異。請比較等權重、反波動權重與最小變異權重的優缺點，並提醒使用者這只是教學模型，不代表實際投資建議。",
    colab:
      "在 Colab 中先用 3 到 5 檔股票測試權重計算，確認權重總和為 1，並畫出不同投資組合的累積報酬。",
    streamlit:
      "建立股票清單輸入區、權重方法選單、AI Score 表格、投資組合比較圖。",
    checklist: [
      "可以輸入多檔股票",
      "可以計算單一股票風險報酬指標",
      "可以產生三種權重",
      "權重總和等於 1",
      "可以比較不同投資組合表現",
    ],
    risk: "分散投資不能完全消除系統性風險。最小變異組合也可能因估計誤差而產生不穩定權重。",
  },
  {
    id: "m5",
    label: "Mission 5",
    title: "風險控制儀表板",
    status: "Risk Lab",
    icon: ShieldAlert,
    color: "orange",
    description: "用蒙地卡羅模擬、VaR、CVaR、最大回撤與破產機率評估資金風險。",
    goal: "建立資金管理與風險模擬概念，讓學生理解極端損失、回撤與部位大小的重要性。",
    tools: ["Python", "numpy", "pandas", "matplotlib", "Streamlit"],
    steps: [
      "設定初始資金、單筆風險比例與交易次數。",
      "使用隨機報酬模擬多條資金路徑。",
      "計算 VaR、CVaR、最大回撤與破產機率。",
      "比較不同部位大小對資金曲線的影響。",
      "產生風險控制教學報告。",
    ],
    prompt:
      "請根據蒙地卡羅模擬結果，包含初始資金、模擬次數、平均最終資金、VaR、CVaR、最大回撤與破產機率，寫一段資金管理教學說明。請強調風險控制、部位大小與極端情境的重要性，不要提供投資建議。",
    colab:
      "在 Colab 中建立 Monte Carlo 模擬函數，輸出多條資金路徑與風險指標，並比較不同風險比例。",
    streamlit:
      "建立滑桿控制初始資金、交易次數、勝率、平均報酬、波動度與單筆風險比例。",
    checklist: [
      "可以模擬多條資金路徑",
      "可以計算 VaR 與 CVaR",
      "可以計算最大回撤",
      "可以估計破產機率",
      "可以比較不同風險比例",
    ],
    risk: "蒙地卡羅模擬高度依賴假設。若報酬分配、波動度或勝率假設錯誤，模擬結果可能嚴重偏離真實情況。",
  },
  {
    id: "m6",
    label: "Final Mission",
    title: "部署 AI 投資分析平台",
    status: "Deploy",
    icon: Rocket,
    color: "green",
    description: "用 Streamlit 與 Gemini API 把前面成果整合成網站。",
    goal: "把前五個任務整合成一個 Streamlit AI 智能投資分析平台，完成可展示的課程成果。",
    tools: ["Streamlit", "Gemini API", "Python", "GitHub", "Cloud Deploy"],
    steps: [
      "建立 Streamlit 多頁式架構。",
      "整合技術分析、回測、AI 報告、投資組合與風險模擬。",
      "設定 Gemini API Key 的安全輸入方式。",
      "整理 requirements.txt。",
      "部署到 Streamlit Community Cloud 或其他平台。",
    ],
    prompt:
      "請幫我設計一個 Streamlit AI 智能投資分析平台的首頁文案。平台包含技術分析、策略回測、AI 個股報告、投資組合建構與風險模擬。文案要有科技感、教學感，並清楚提醒本平台只供研究與課程實作，不構成投資建議。",
    colab:
      "先在 Colab 中確認所有核心函數都能獨立執行，再搬到 Streamlit 專案資料夾中。",
    streamlit:
      "建立首頁、技術分析頁、回測頁、AI 報告頁、投資組合頁、風險模擬頁與風險聲明頁。",
    checklist: [
      "所有功能可以從側邊欄進入",
      "Gemini API Key 不寫死在程式碼中",
      "requirements.txt 完整",
      "首頁有清楚教學說明",
      "底部有完整風險聲明",
    ],
    risk: "部署版本若開放給他人使用，需注意 API Key 安全、資料來源限制、免責聲明與模型輸出品質控管。",
  },
];

const quizQuestions = [
  {
    question: "為什麼回測要使用 shift(1)？",
    options: [
      "讓策略使用今天收盤後才知道的訊號，在今天就交易",
      "避免使用未來資訊，讓今天的部位只能根據前一天已知訊號決定",
      "讓報酬率變得比較高",
      "讓圖表看起來更平滑",
    ],
    answer: 1,
    explanation:
      "shift(1) 的重點是避免 look-ahead bias。今天的交易部位不應該使用今天收盤後才知道的訊號。",
  },
  {
    question: "Sharpe Ratio 代表什麼？",
    options: [
      "每承擔一單位風險所得到的超額報酬",
      "策略的最大單日獲利",
      "策略勝率",
      "股票成交量變化",
    ],
    answer: 0,
    explanation:
      "Sharpe Ratio 衡量風險調整後報酬，常用來比較不同策略在承擔風險後的報酬效率。",
  },
  {
    question: "最大回撤代表什麼？",
    options: [
      "策略最高的單日報酬",
      "資金曲線從高點跌到低點的最大跌幅",
      "股票最高價與最低價的差距",
      "每年平均報酬",
    ],
    answer: 1,
    explanation:
      "最大回撤反映投資過程中可能遭遇的最大資金壓力，是風險管理的重要指標。",
  },
  {
    question: "為什麼勝率高不一定賺錢？",
    options: [
      "因為只要勝率高，一定會賺錢",
      "因為如果小賺很多次、一次大賠，總損益仍可能為負",
      "因為勝率和交易結果完全無關",
      "因為勝率只能用在債券市場",
    ],
    answer: 1,
    explanation:
      "策略績效不只看勝率，也要看平均獲利、平均虧損、賺賠比與尾部風險。",
  },
  {
    question: "Gemini API 在網站中負責什麼？",
    options: [
      "下載股票價格",
      "執行 Python 回測",
      "生成 AI 分析報告與教學式解讀",
      "取代所有風險管理",
    ],
    answer: 2,
    explanation:
      "在本教材架構中，Python 負責計算，Gemini API 負責把數據轉成結構化文字報告。",
  },
];

function SectionTitle({ eyebrow, title, description }) {
  return (
    <div className="section-title">
      <div className="eyebrow">
        <Sparkles size={16} />
        {eyebrow}
      </div>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}

function CodeBlock({ text }) {
  const [copied, setCopied] = useState(false);

  const copyPrompt = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="code-block">
      <div className="code-header">
        <div>
          <TerminalSquare size={16} />
          Prompt Template
        </div>
        <button onClick={copyPrompt}>
          {copied ? <Check size={16} /> : <Copy size={16} />}
          {copied ? "已複製" : "複製"}
        </button>
      </div>
      <pre>{text}</pre>
    </div>
  );
}

function Navbar() {
  return (
    <header className="navbar">
      <a href="#top" className="brand">
        <div className="brand-icon">
          <BrainCircuit size={22} />
        </div>
        <div>
          <strong>AI 智能投資</strong>
          <span>Mission Lab</span>
        </div>
      </a>

      <nav>
        <a href="#concept">核心概念</a>
        <a href="#mission">任務地圖</a>
        <a href="#detail">任務詳細</a>
        <a href="#quiz">小測驗</a>
        <a href="#final">最終成果</a>
      </nav>

      <a className="start-link" href="#mission">
        <Rocket size={16} />
        Start
      </a>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="hero">
      <div className="hero-bg" />
      <div className="hero-content">
        <div className="hero-text">
          <div className="hero-badge">
            <BrainCircuit size={16} />
            AI Investment Quest: Prompt × Python × Streamlit × Gemini API
          </div>

          <h1>
            AI 智能投資
            <span>任務實驗室</span>
          </h1>

          <p>
            從 Prompt 到 Python，從技術指標到 AI
            投資報告，打造你的第一套智能投資分析系統。
          </p>

          <div className="hero-actions">
            <a href="#mission" className="primary-btn">
              <PlayCircle size={20} />
              開始任務
            </a>
            <a href="#final" className="secondary-btn">
              <MonitorSmartphone size={20} />
              前往分析工具
            </a>
          </div>

          <div className="hero-stats">
            <div>
              <strong>01</strong>
              <span>Prompt</span>
            </div>
            <div>
              <strong>02</strong>
              <span>Python</span>
            </div>
            <div>
              <strong>03</strong>
              <span>AI Report</span>
            </div>
          </div>
        </div>

        <div className="hero-panel">
          <div className="panel-inner">
            <div className="panel-top">
              <div>
                <span>Quest Progress</span>
                <h3>AI Investor Lab</h3>
              </div>
              <div className="compass-icon">
                <Compass size={30} />
              </div>
            </div>

            <div className="progress-list">
              {missions.slice(0, 4).map((mission, index) => {
                const Icon = mission.icon;
                return (
                  <div className="progress-item" key={mission.id}>
                    <div className={`mission-icon ${mission.color}`}>
                      <Icon size={22} />
                    </div>
                    <div>
                      <div className="progress-title">
                        <strong>{mission.title}</strong>
                        <span>{25 + index * 15}%</span>
                      </div>
                      <div className="progress-bar">
                        <div style={{ width: `${25 + index * 15}%` }} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="panel-note">
              這不是實際交易工具，而是讓學生像破關一樣完成 AI
              智能投資系統的互動式教材入口。
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ConceptCards() {
  const concepts = [
    {
      title: "Python 是計算引擎",
      icon: Cpu,
      badge: "Compute",
      text: "負責資料整理、技術指標計算、策略回測、投資組合權重與風險模擬。",
    },
    {
      title: "Gemini API 是報告引擎",
      icon: BrainCircuit,
      badge: "Explain",
      text: "負責把數據、圖表與績效結果轉換成有結構的 AI 分析報告與教學解讀。",
    },
    {
      title: "Streamlit 是展示平台",
      icon: MonitorSmartphone,
      badge: "Deploy",
      text: "負責把 Python 模組包裝成可以互動操作的網頁介面，讓學生展示成果。",
    },
  ];

  return (
    <section id="concept" className="section">
      <SectionTitle
        eyebrow="Core Concept"
        title="三個引擎，組成一套 AI 智能投資教材"
        description="本課程不是要學生背公式，而是讓學生理解：Prompt 負責溝通需求，Python 負責精準計算，AI 負責生成解讀，Streamlit 負責展示成果。"
      />

      <div className="concept-grid">
        {concepts.map((item) => {
          const Icon = item.icon;
          return (
            <div className="concept-card" key={item.title}>
              <div className="concept-top">
                <div className="concept-icon">
                  <Icon size={30} />
                </div>
                <span>{item.badge}</span>
              </div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function MissionMap({ activeMission, setActiveMission }) {
  return (
    <section id="mission" className="section">
      <SectionTitle
        eyebrow="Mission Map"
        title="像破關一樣完成 AI 智能投資分析系統"
        description="每個任務都是一個可展示、可實作、可延伸的學習單元。學生最後會得到一套完整的 Streamlit AI 投資分析平台原型。"
      />

      <div className="mission-map">
        {missions.map((mission, index) => {
          const Icon = mission.icon;
          return (
            <button
              className={`mission-card ${
                activeMission === mission.id ? "active" : ""
              }`}
              key={mission.id}
              onClick={() => setActiveMission(mission.id)}
            >
              <div className={`mission-icon ${mission.color}`}>
                <Icon size={26} />
              </div>

              <div className="mission-info">
                <div>
                  <span className="mission-label">{mission.label}</span>
                  <span className="mission-status">{mission.status}</span>
                </div>
                <h3>{mission.title}</h3>
                <p>{mission.description}</p>
              </div>

              <div className="mission-action">
                <div className="mini-progress">
                  <div
                    style={{ width: `${Math.min(100, 18 + index * 14)}%` }}
                  />
                </div>
                <span>
                  開始任務
                  <Rocket size={16} />
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}

function MissionDetails({ activeMission, setActiveMission }) {
  const selected = missions.find((item) => item.id === activeMission);
  const [openBlock, setOpenBlock] = useState("goal");

  const blocks = [
    {
      id: "goal",
      title: "任務目標",
      icon: Trophy,
      content: <p>{selected.goal}</p>,
    },
    {
      id: "tools",
      title: "使用工具",
      icon: Code2,
      content: (
        <div className="tool-list">
          {selected.tools.map((tool) => (
            <span key={tool}>{tool}</span>
          ))}
        </div>
      ),
    },
    {
      id: "steps",
      title: "操作流程",
      icon: Workflow,
      content: (
        <ol className="step-list">
          {selected.steps.map((step, index) => (
            <li key={step}>
              <span>{index + 1}</span>
              {step}
            </li>
          ))}
        </ol>
      ),
    },
    {
      id: "prompt",
      title: "Prompt 範例",
      icon: TerminalSquare,
      content: <CodeBlock text={selected.prompt} />,
    },
    {
      id: "colab",
      title: "Colab 實作說明",
      icon: Database,
      content: <p>{selected.colab}</p>,
    },
    {
      id: "streamlit",
      title: "Streamlit 對應功能",
      icon: MonitorSmartphone,
      content: <p>{selected.streamlit}</p>,
    },
    {
      id: "checklist",
      title: "完成檢核表",
      icon: ClipboardCheck,
      content: (
        <ul className="check-list">
          {selected.checklist.map((item) => (
            <li key={item}>
              <CheckCircle2 size={18} />
              {item}
            </li>
          ))}
        </ul>
      ),
    },
    {
      id: "risk",
      title: "風險提醒",
      icon: AlertTriangle,
      content: <div className="risk-box">{selected.risk}</div>,
    },
  ];

  return (
    <section id="detail" className="section">
      <SectionTitle
        eyebrow="Mission Detail"
        title="任務詳細頁"
        description="點選任務後，可以看到每個任務的目標、流程、Prompt、Colab 實作方式、Streamlit 對應功能與完成檢核。"
      />

      <div className="detail-layout">
        <aside className="mission-menu">
          <h4>任務選單</h4>
          {missions.map((mission) => {
            const Icon = mission.icon;
            return (
              <button
                key={mission.id}
                onClick={() => setActiveMission(mission.id)}
                className={selected.id === mission.id ? "active" : ""}
              >
                <Icon size={18} />
                {mission.title}
              </button>
            );
          })}
        </aside>

        <div className="detail-card">
          <div className="detail-head">
            <div>
              <div>
                <span className="mission-label">{selected.label}</span>
                <span className="mission-status">{selected.status}</span>
              </div>
              <h3>{selected.title}</h3>
              <p>{selected.description}</p>
            </div>

            <div className={`detail-icon ${selected.color}`}>
              {React.createElement(selected.icon, { size: 34 })}
            </div>
          </div>

          <div className="accordion">
            {blocks.map((block) => {
              const Icon = block.icon;
              return (
                <div className="accordion-item" key={block.id}>
                  <button
                    onClick={() =>
                      setOpenBlock(openBlock === block.id ? "" : block.id)
                    }
                  >
                    <span>
                      <Icon size={20} />
                      {block.title}
                    </span>
                    <ChevronDown
                      size={20}
                      className={openBlock === block.id ? "rotate" : ""}
                    />
                  </button>

                  {openBlock === block.id && (
                    <div className="accordion-content">{block.content}</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function Quiz() {
  const [selectedAnswers, setSelectedAnswers] = useState({});

  const score = useMemo(() => {
    return quizQuestions.reduce((total, q, index) => {
      return selectedAnswers[index] === q.answer ? total + 1 : total;
    }, 0);
  }, [selectedAnswers]);

  return (
    <section id="quiz" className="section">
      <SectionTitle
        eyebrow="Quick Quiz"
        title="互動小測驗"
        description="用五題小測驗確認學生是否理解回測、績效、風險與 AI 報告引擎的核心概念。"
      />

      <div className="score-card">
        <div>
          <span>Learning Score</span>
          <strong>
            {score} / {quizQuestions.length}
          </strong>
        </div>
        <div className="score-bar">
          <div style={{ width: `${(score / quizQuestions.length) * 100}%` }} />
        </div>
      </div>

      <div className="quiz-list">
        {quizQuestions.map((q, qIndex) => {
          const chosen = selectedAnswers[qIndex];
          const hasAnswered = chosen !== undefined;
          const isCorrect = chosen === q.answer;

          return (
            <div className="quiz-card" key={q.question}>
              <h3>
                <CircleDot size={20} />
                {qIndex + 1}. {q.question}
              </h3>

              <div className="option-grid">
                {q.options.map((option, optionIndex) => {
                  const isSelected = chosen === optionIndex;
                  const isAnswer = q.answer === optionIndex;

                  let className = "option-btn";

                  if (hasAnswered && isSelected && isAnswer) {
                    className += " correct";
                  } else if (hasAnswered && isSelected && !isAnswer) {
                    className += " wrong";
                  } else if (hasAnswered && isAnswer) {
                    className += " answer";
                  }

                  return (
                    <button
                      key={option}
                      className={className}
                      onClick={() =>
                        setSelectedAnswers((prev) => ({
                          ...prev,
                          [qIndex]: optionIndex,
                        }))
                      }
                    >
                      {hasAnswered && isSelected ? (
                        isAnswer ? (
                          <CheckCircle2 size={18} />
                        ) : (
                          <XCircle size={18} />
                        )
                      ) : (
                        <span>{String.fromCharCode(65 + optionIndex)}</span>
                      )}
                      {option}
                    </button>
                  );
                })}
              </div>

              {hasAnswered && (
                <div className={`quiz-feedback ${isCorrect ? "good" : "bad"}`}>
                  <strong>{isCorrect ? "答對了：" : "再想一下："}</strong>
                  {q.explanation}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

function FinalProject() {
  const outcomes = [
    "一份技術分析模組",
    "一份策略回測模組",
    "一份 AI 股票分析報告",
    "一份投資組合建構模組",
    "一份資金管理風險模擬模組",
    "一個 Streamlit AI 智能投資網站",
  ];

  return (
    <section id="final" className="section final-section">
      <div className="final-card">
        <div className="final-text">
          <div className="final-badge">
            <Trophy size={16} />
            Final Project
          </div>
          <h2>你的最終成果</h2>
          <p>
            完成全部任務後，使用者會從零散的 Prompt 與 Python
            練習，逐步整合成一套可展示、可講解、可延伸的 AI 智能投資教學平台。
          </p>
        </div>

        <div className="outcome-grid">
          {outcomes.map((item, index) => (
            <div className="outcome-card" key={item}>
              <span>{index + 1}</span>
              <strong>{item}</strong>
            </div>
          ))}
        </div>

        <div className="teaching-note">
          <Gauge size={20} />
          <p>
            教學時可讓學生先從 Mission 1 與 Mission 2
            完成最小可行成果，再逐步加入 AI 報告、投資組合與風險模擬。最後用
            Streamlit 整合為一個完整 Demo。
          </p>
        </div>
      </div>
    </section>
  );
}

function RiskStatement() {
  return (
    <footer className="footer">
      <div className="footer-card">
        <AlertTriangle size={26} />
        <div>
          <h3>風險聲明</h3>
          <p>
            本網站所產生之圖表、數據與 AI
            分析內容，僅供研究、資訊展示與金融科技實作參考，不構成任何投資建議、買賣建議或報酬保證。
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const [activeMission, setActiveMission] = useState("m1");

  return (
    <main>
      <Navbar />
      <Hero />
      <ConceptCards />
      <MissionMap
        activeMission={activeMission}
        setActiveMission={setActiveMission}
      />
      <MissionDetails
        activeMission={activeMission}
        setActiveMission={setActiveMission}
      />
      <Quiz />
      <FinalProject />
      <RiskStatement />
    </main>
  );
}
