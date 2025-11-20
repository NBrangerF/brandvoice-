export interface Meta {
  version: string;
  generatedAt: string;
  tool: string;
}

export interface DocumentMeta {
  id: string;
  title: string;
  summary: string;
  date: string;
  interviewee?: string; // Legacy: single interviewee
  interviewees?: string[]; // New: multiple interviewees
  totalSections: number;
  fullCorrectedContent?: string; // Optional full text content
}

// Helper function to get interviewees as a string
export function getInterviewees(doc: DocumentMeta): string {
  if (doc.interviewees && doc.interviewees.length > 0) {
    return doc.interviewees.join(', ');
  }
  return doc.interviewee || 'Unknown';
}

export interface SectionContext {
  documentId: string;
  documentTitle: string;
  documentSummary: string;
  documentDate: string;
  documentInterviewee: string;
  chapterIndex: number;
  totalChapters: number;
}

export interface Section {
  section_id?: string; // Optional for backward compatibility
  title: string;
  excerpt?: string; // Optional summary for preview
  content: string;
  keyPoints: string[];
  category: string;
  tags: string[];
  quotes: string[];
  insight: string;
  context: SectionContext;
}

export interface KnowledgeData {
  meta: Meta;
  document: DocumentMeta;
  sections: Section[];
}

export const initialData: KnowledgeData = {
  "meta": {
    "version": "1.1.0",
    "generatedAt": "2025-11-20T07:13:38.182Z",
    "tool": "BrandVoice Architect"
  },
  "document": {
    "id": "20251105_1763622818182",
    "title": "王天行：布兰迪斯大学录取访谈与申请季复盘",
    "summary": "王天行谈布兰迪斯录取与申请季的自我重塑。",
    "date": "2025-11-05",
    "interviewee": "王天行",
    "totalSections": 7
  },
  "sections": [
    {
      "title": "录取结果与个人背景",
      "content": "**个人背景**\n\n我是王天行（英文名：悠悠），在云谷学校就读已近6年，我的未来规划老师是苏珊老师。\n\n**录取情况**\n\n我收到的Offer主要集中在环境科学相关专业，具体包括：\n\n*   **马萨诸塞大学（UMass）**\n*   **马萨诸塞大学波士顿分校（UMass Boston）**\n*   **杜兰大学（Tulane University）**\n*   **俄亥俄州立大学（OSU）**\n*   **密歇根州立大学（MSU）**\n\n**最终选择**\n\n我最终选择了**布兰迪斯大学（Brandeis University）**入读，这也是我在ED（早申）阶段申请的学校。",
      "keyPoints": [
        "在校时间：近6年",
        "专业方向：环境科学",
        "最终去向：布兰迪斯大学（ED录取）"
      ],
      "category": "【资讯/事实】",
      "tags": [
        "布兰迪斯大学",
        "环境科学",
        "录取Offer",
        "早申ED"
      ],
      "quotes": [],
      "insight": "明确了学生的录取结果与专业方向，确立了其在环境科学领域的学术兴趣及最终的升学去向。",
      "context": {
        "documentId": "20251105_1763622818182",
        "documentTitle": "王天行：布兰迪斯大学录取访谈与申请季复盘",
        "documentSummary": "王天行谈布兰迪斯录取与申请季的自我重塑。",
        "documentDate": "2025-11-05",
        "documentInterviewee": "王天行",
        "chapterIndex": 1,
        "totalChapters": 7
      }
    },
    {
      "title": "毕业前的准备与规划",
      "content": "**学业收尾**\n\n目前的重心主要放在毕业前的清单准备上，包括完成各种PPA项目、**素养答辩（Capstone Defense）**，以及准备5月份的AP考试。\n\n**生活规划**\n\n生活方面，正在筹备假期去日本的毕业旅行。这涉及攻略制定和签证办理等事宜。这是我第一次深度参与并独立查阅资料去准备旅行，虽然消耗了不少时间，但也是一次很好的锻炼。",
      "keyPoints": [
        "学术任务：素养答辩与AP考试",
        "生活技能：独立规划日本旅行与签证办理"
      ],
      "category": "【资讯/事实】",
      "tags": [
        "AP考试",
        "毕业答辩",
        "旅行规划",
        "签证办理"
      ],
      "quotes": [],
      "insight": "展示了学生在过渡期的状态，从单纯的学术任务向独立生活技能（如旅行规划）的延伸。",
      "context": {
        "documentId": "20251105_1763622818182",
        "documentTitle": "王天行：布兰迪斯大学录取访谈与申请季复盘",
        "documentSummary": "王天行谈布兰迪斯录取与申请季的自我重塑。",
        "documentDate": "2025-11-05",
        "documentInterviewee": "王天行",
        "chapterIndex": 2,
        "totalChapters": 7
      }
    },
    {
      "title": "申请季关键词：赶",
      "content": "如果要用一个字形容我的申请季，那就是**“赶”**。\n\n**英语短板的制约**\n\n我的申请季很大程度上是围绕着英语这一短板进行的。高一时我未意识到问题的严重性，等到高二意识到时已经有些晚了。我的英语成绩（托福100+）是在申请季进行了一段时间后才最终定下来的。\n\n**时间线的压缩**\n\n由于语言成绩出分较晚，导致后续的一系列动作都非常仓促：\n\n*   确定大学名单较晚；\n*   文书写作、活动列表（Activity List）的完善都集中在最后阶段；\n*   申请系统的填写也十分紧迫。\n\n所有的决定和任务都堆积在申请季前期的那段时间里统一处理，导致我一直在赶着写文章、填系统，整个9月之后的时间被极度压缩。",
      "keyPoints": [
        "核心感受：时间紧迫，一直在“赶”",
        "主要原因：英语成绩出分晚，导致后续流程积压",
        "后果：文书与申请系统填写在短时间内高强度进行"
      ],
      "category": "【故事/案例】",
      "tags": [
        "托福备考",
        "时间管理",
        "文书写作",
        "申请季"
      ],
      "quotes": [
        "我的申请季最多的部分其实就是英语，因为我感觉我的申请都是围绕着英语走，它是我最大的一个短板。"
      ],
      "insight": "揭示了标化成绩（语言）准备不足对整个申请节奏的连锁负面影响，强调了早期规划的重要性。",
      "context": {
        "documentId": "20251105_1763622818182",
        "documentTitle": "王天行：布兰迪斯大学录取访谈与申请季复盘",
        "documentSummary": "王天行谈布兰迪斯录取与申请季的自我重塑。",
        "documentDate": "2025-11-05",
        "documentInterviewee": "王天行",
        "chapterIndex": 3,
        "totalChapters": 7
      }
    },
    {
      "title": "自我重塑与性情磨练",
      "content": "**重新认识自己**\n\n申请季不仅是升学，更是一个让我重新认识自己的过程。我从未像这样反复地讲述自己的故事，挖掘高中三年的经历。即使是同一个故事，我也尝试从不同角度去理解和解释。这让我更清楚地知道自己是一个什么样的人。\n\n**性情的磨练**\n\n这个过程极大地磨练了我的性子：\n\n*   **从“自我”到“耐心”**：以前我可能觉得“我写出来你看，爱要不要”，但在申请季，我学会了接受反馈，耐心地进行细致的文字工作。\n*   **细节打磨**：记得有一次，老师要求我提交的东西连语法和标点都不能有错，否则就是Final Feedback。虽然当时觉得严苛，但这让我学会了反复检查（Check），变得更加细致和有耐心。\n\n这种对自我的深度挖掘（Personal Statement）和对细节的把控，是我未来很长一段时间都可以沿用的财富。",
      "keyPoints": [
        "深度挖掘：从多角度理解个人经历",
        "心态转变：从任性到耐心，接受严苛的反馈",
        "能力提升：细致的文字打磨能力"
      ],
      "category": "【观点/理念】",
      "tags": [
        "自我认知",
        "成长思维",
        "耐心打磨",
        "深度挖掘"
      ],
      "quotes": [
        "它是我第一次如此深的去挖掘我自己... 去从不同的角度去理解去解释它。",
        "我知道更清楚，知道我自己是一个什么样的一个人。"
      ],
      "insight": "申请季的价值超越了录取本身，它是一次强制性的自我反思与职业素养（如耐心、细致）的养成过程。",
      "context": {
        "documentId": "20251105_1763622818182",
        "documentTitle": "王天行：布兰迪斯大学录取访谈与申请季复盘",
        "documentSummary": "王天行谈布兰迪斯录取与申请季的自我重塑。",
        "documentDate": "2025-11-05",
        "documentInterviewee": "王天行",
        "chapterIndex": 4,
        "totalChapters": 7
      }
    },
    {
      "title": "遗憾复盘：平衡与全面发展",
      "content": "**最大的遗憾**\n\n虽然被波士顿学院（BC）拒绝曾让我伤心，但这并非最大的遗憾。回顾申请季，我最大的遗憾在于**高一时期“做人的不平衡”**。\n\n**过于自我的代价**\n\n我曾太过于自我，只关注自己喜欢的事情，而完全忽略了我不喜欢但必须做的事情。世界不仅仅由喜好构成，人需要在该深入的地方深入，但在该有的基础面上不能缺失。\n\n这种认知觉醒得太晚，导致高二时，我不得不在忙于热爱的同时，花费大量精力去补救那些令我痛苦的短板。所有压力集中爆发，让申请季变得仓促。如果能早点意识到这一点，一切会更有序。",
      "keyPoints": [
        "核心遗憾：高一时期发展不平衡",
        "教训：不能只做喜欢的事，要兼顾基础短板",
        "后果：高二压力集中爆发，造成申请仓促"
      ],
      "category": "【观点/理念】",
      "tags": [
        "全面发展",
        "长期主义",
        "试错反思",
        "自我中心"
      ],
      "quotes": [
        "我觉得世界就只剩下说我喜欢做的事情，而我太过于不关注于我不喜欢的事情。",
        "人你不讲究你360度全能，但是他就说你要在该深入的地方要深入，然后你在该有的地方你得有。"
      ],
      "insight": "深刻反思了“偏科”或“任性”在长期竞争中的代价，提出了在保持特长的同时必须兼顾基础全面的战略观点。",
      "context": {
        "documentId": "20251105_1763622818182",
        "documentTitle": "王天行：布兰迪斯大学录取访谈与申请季复盘",
        "documentSummary": "王天行谈布兰迪斯录取与申请季的自我重塑。",
        "documentDate": "2025-11-05",
        "documentInterviewee": "王天行",
        "chapterIndex": 5,
        "totalChapters": 7
      }
    },
    {
      "title": "核心优势：热爱与主线",
      "content": "**最有帮助的事情**\n\n申请季中最正确的事，就是我在高一就“不管不顾”地投入到了自己真正热爱的事情中——**理科与环境科学**。\n\n**连贯的个人主线**\n\n我高中三年的活动非常连贯且具有个人特色：\n*   从社团开始做垃圾回收和塑料相关项目；\n*   进一步深入研究，参与COP26（联合国气候变化大会）相关活动；\n*   长期坚持在实验室做研究。\n\n这些经历让我的活动列表（Activity List）和文书写起来非常顺畅，甚至让我自己都感到感动和自豪。我就像做了一件大事，这是我高中三年最成功的地方。",
      "keyPoints": [
        "成功经验：早期投入热爱的领域",
        "主线内容：环境科学、垃圾回收、实验室研究",
        "成果：形成了极具个人特色和连贯性的申请材料"
      ],
      "category": "【故事/案例】",
      "tags": [
        "环境科学",
        "垃圾回收",
        "学术研究",
        "活动列表"
      ],
      "quotes": [
        "我高中三年就是做这么一件大事，是一件大事，就感觉非常的自豪。",
        "它非常的把我自己个人的一些特质和特色给融入在了其中。"
      ],
      "insight": "验证了“长期主义”在申请中的价值：深耕一个领域（环境科学）构建出的真实、连贯的个人叙事（Narrative Arc）是打动招生官的关键。",
      "context": {
        "documentId": "20251105_1763622818182",
        "documentTitle": "王天行：布兰迪斯大学录取访谈与申请季复盘",
        "documentSummary": "王天行谈布兰迪斯录取与申请季的自我重塑。",
        "documentDate": "2025-11-05",
        "documentInterviewee": "王天行",
        "chapterIndex": 6,
        "totalChapters": 7
      }
    },
    {
      "title": "应对崩溃与坚持到底",
      "content": "**崩溃瞬间**\n\n申请季中有几个想放弃的瞬间：\n1.  **托福瓶颈期**：分数卡在96-98分，考了四五次上不去，心态几近崩溃。最后决定“拼到最后一刻”，心态反而放松了，结果考出了成绩。\n2.  **UIUC申请突发状况**：在提交UIUC申请的前一天，突然发现需要在一个单独的网站重新填写高中成绩单。当时非常崩溃，但最终熬夜从9:30填到12:00，坚持完成了提交。\n\n**应对哲学**\n\n面对这些艰难时刻，我的信念是：**在你自己没有放弃之前，这件事情就没有真正结束。** 哪怕感到烦躁、不爽，也要忍着性子尽力去做。很多时候觉得做不完了，实际上咬咬牙还是能完成的。",
      "keyPoints": [
        "困难时刻：托福分数瓶颈、申请系统突发繁琐任务",
        "解决方法：调整心态，熬夜坚持",
        "核心信念：只要不放弃，事情就没有结束"
      ],
      "category": "【观点/理念】",
      "tags": [
        "抗压能力",
        "心态调整",
        "坚持不懈",
        "逆商"
      ],
      "quotes": [
        "其实在你自己没有放弃之前，这件事情它就没有真正的结束。",
        "你忍着自己的烦，忍着自己的不爽，你就尽力做，你看看你能做到。"
      ],
      "insight": "提炼了面对高压和突发状况时的心理韧性法则：执行力优于情绪，坚持本身就是解决困境的方法。",
      "context": {
        "documentId": "20251105_1763622818182",
        "documentTitle": "王天行：布兰迪斯大学录取访谈与申请季复盘",
        "documentSummary": "王天行谈布兰迪斯录取与申请季的自我重塑。",
        "documentDate": "2025-11-05",
        "documentInterviewee": "王天行",
        "chapterIndex": 7,
        "totalChapters": 7
      }
    }
  ]
};
