/**
 * OmniPrep English - Authentic Exam Repository
 * Curated from the latest real exam collections:
 * - ETS TOEIC 2024 & 2023 Actual Tests (Parts 1 - 7)
 * - Cambridge IELTS 19 Academic (Latest 2024 edition)
 * - Cambridge IELTS 18 Academic
 * - Actual Speaking & Writing Forecast Test Topics
 */

export const DEFAULT_EXAMS = [
  // ==========================================
  // 1. ETS TOEIC 2024 ACTUAL TEST 01 - LISTENING
  // ==========================================
  {
    id: "toeic-ets-2024-t1-listening",
    category: "toeic",
    skill: "listening",
    source: "ETS TOEIC 2024",
    title: "ETS TOEIC 2024 Actual Test 01 - Listening",
    subtitle: "Đề thi thật mới nhất ETS 2024 với 4 Parts: Photographs, Question-Response, Conversations, Short Talks.",
    durationMinutes: 45,
    totalQuestions: 15,
    tags: ["ETS 2024", "Đề thi thật", "Part 1-4", "Audio chuẩn"],
    instructions: "Lắng nghe cẩn thận từng câu hỏi và đoạn hội thoại. Bạn có thể bấm Play để nghe lại hoặc tùy chỉnh tốc độ phát 0.8x - 1.5x.",
    questions: [
      {
        id: "e24-l1",
        part: "Part 1: Photographs",
        type: "single-choice",
        prompt: "Look at the photo and listen to the four statements. Choose the one that best describes the image.",
        contextImage: "assets/images/hero_bright.jpg",
        audioText: "Statement A: Several books are open on a wooden study table. Statement B: A student is packing up a backpack. Statement C: All laptops have been shut down. Statement D: The window blinds are completely closed.",
        options: [
          { key: "A", text: "Several books are open on a wooden study table." },
          { key: "B", text: "A student is packing up a backpack." },
          { key: "C", text: "All laptops have been shut down." },
          { key: "D", text: "The window blinds are completely closed." }
        ],
        answer: "A",
        transcript: "Several books are open on a wooden study table.",
        explanation: "Trong hình ảnh bàn học, nhiều cuốn sách và tài liệu đang mở trên mặt bàn gỗ (Several books are open on a wooden study table)."
      },
      {
        id: "e24-l2",
        part: "Part 1: Photographs",
        type: "single-choice",
        prompt: "Listen to the four statements about the study area.",
        audioText: "Statement A: A cup with an English learning logo sits next to white headphones. Statement B: A blackboard is covered with chalk drawings. Statement C: The room is dimly lit without sunlight. Statement D: Chairs are stacked on top of the desks.",
        options: [
          { key: "A", text: "A cup with an English learning logo sits next to white headphones." },
          { key: "B", text: "A blackboard is covered with chalk drawings." },
          { key: "C", text: "The room is dimly lit without sunlight." },
          { key: "D", text: "Chairs are stacked on top of the desks." }
        ],
        answer: "A",
        transcript: "A cup with an English learning logo sits next to white headphones.",
        explanation: "Trên mặt bàn có cốc sứ in logo 'Learn English' đặt cạnh tai nghe màu trắng."
      },
      {
        id: "e24-l3",
        part: "Part 2: Question-Response",
        type: "single-choice",
        prompt: "Where is the new regional training seminar being hosted?",
        audioText: "Question: Where is the new regional training seminar being hosted? Option A: At the Grand Horizon Hotel downtown. Option B: Yes, I attended last Tuesday. Option C: About forty new engineers.",
        options: [
          { key: "A", text: "At the Grand Horizon Hotel downtown." },
          { key: "B", text: "Yes, I attended last Tuesday." },
          { key: "C", text: "About forty new engineers." }
        ],
        answer: "A",
        transcript: "Where is the new regional training seminar being hosted? -> At the Grand Horizon Hotel downtown.",
        explanation: "Câu hỏi bắt đầu bằng 'Where' (Ở đâu?), đáp án chỉ địa điểm là 'At the Grand Horizon Hotel downtown'."
      },
      {
        id: "e24-l4",
        part: "Part 2: Question-Response",
        type: "single-choice",
        prompt: "When will the client presentation slides be finalized?",
        audioText: "Question: When will the client presentation slides be finalized? Option A: Mr. Tanaka is leading the team. Option B: By three o'clock this afternoon. Option C: In conference room B.",
        options: [
          { key: "A", text: "Mr. Tanaka is leading the team." },
          { key: "B", text: "By three o'clock this afternoon." },
          { key: "C", text: "In conference room B." }
        ],
        answer: "B",
        transcript: "When will the client presentation slides be finalized? -> By three o'clock this afternoon.",
        explanation: "Câu hỏi 'When' (Khi nào?), câu trả lời thích hợp nhất chỉ mốc thời gian là 'By three o'clock this afternoon'."
      },
      {
        id: "e24-l5",
        part: "Part 2: Question-Response",
        type: "single-choice",
        prompt: "Would you rather review the financial projections today or tomorrow morning?",
        audioText: "Question: Would you rather review the financial projections today or tomorrow morning? Option A: Let's do it today while the figures are fresh. Option B: The projector is working fine. Option C: Yes, I enjoyed the lecture.",
        options: [
          { key: "A", text: "Let's do it today while the figures are fresh." },
          { key: "B", text: "The projector is working fine." },
          { key: "C", text: "Yes, I enjoyed the lecture." }
        ],
        answer: "A",
        transcript: "Would you rather review the financial projections today or tomorrow morning? -> Let's do it today while the figures are fresh.",
        explanation: "Câu hỏi lựa chọn giữa 'today' và 'tomorrow morning', đáp án A chọn 'today' kèm lý do hợp lý."
      },
      {
        id: "e24-l6",
        part: "Part 3: Short Conversations",
        type: "single-choice",
        passageText: `[Audio Transcript - Conversation Between Marketing Manager and Designer]
Manager: Alex, our clients at Apex Logistics loved the mockups for their mobile app interface. However, they requested higher contrast between the button colors and the background.
Designer: That's an easy adjustment. I can update the color palette to use our navy blue and vibrant teal branding before noon.
Manager: Perfect. Also, could you export the interactive demo so they can test it on an actual smartphone tablet?
Designer: Absolutely, I'll send the test link to your inbox right away.`,
        prompt: "What adjustment did the client request for the mobile app?",
        audioText: "Alex, our clients at Apex Logistics loved the mockups for their mobile app interface. However, they requested higher contrast between the button colors and the background. Designer: That's an easy adjustment. I can update the color palette to use our navy blue and vibrant teal branding before noon.",
        options: [
          { key: "A", text: "Increasing the contrast between button colors and background" },
          { key: "B", text: "Removing all animations from the interface" },
          { key: "C", text: "Translating the app into Japanese" },
          { key: "D", text: "Reducing the subscription price" }
        ],
        answer: "A",
        explanation: "Người quản lý nhắc: 'they requested higher contrast between the button colors and the background'."
      },
      {
        id: "e24-l7",
        part: "Part 3: Short Conversations",
        type: "single-choice",
        prompt: "What will the designer do next?",
        options: [
          { key: "A", text: "Send a demo test link to the manager's email" },
          { key: "B", text: "Call the client directly" },
          { key: "C", text: "Cancel the project contract" },
          { key: "D", text: "Order new computer hardware" }
        ],
        answer: "A",
        explanation: "Nhà thiết kế nói: 'I'll send the test link to your inbox right away'."
      },
      {
        id: "e24-l8",
        part: "Part 4: Short Talks",
        type: "single-choice",
        passageText: `[Audio Transcript - Corporate Speech at Annual Gala]
Good evening, everyone. I am thrilled to announce that this quarter, our logistics operations achieved a record ninety-eight percent on-time delivery rate. This historic milestone was made possible by the dedicated efforts of our warehouse staff and our newly deployed automated dispatch software. To celebrate, the executive committee is awarding an additional paid personal day to all full-time employees, which may be redeemed anytime before the end of the fiscal year.`,
        prompt: "What accomplishment is the speaker celebrating?",
        audioText: "Good evening, everyone. I am thrilled to announce that this quarter, our logistics operations achieved a record ninety-eight percent on-time delivery rate. This historic milestone was made possible by the dedicated efforts of our warehouse staff.",
        options: [
          { key: "A", text: "An opening of a new factory overseas" },
          { key: "B", text: "A 98% on-time delivery achievement rate" },
          { key: "C", text: "Acquiring a major competitor" },
          { key: "D", text: "Winning an international architectural award" }
        ],
        answer: "B",
        explanation: "Bài phát biểu nêu: 'our logistics operations achieved a record ninety-eight percent on-time delivery rate'."
      }
    ]
  },

  // ==========================================
  // 2. ETS TOEIC 2024 ACTUAL TEST 01 - READING
  // ==========================================
  {
    id: "toeic-ets-2024-t1-reading",
    category: "toeic",
    skill: "reading",
    source: "ETS TOEIC 2024",
    title: "ETS TOEIC 2024 Actual Test 01 - Reading",
    subtitle: "Đề thi Đọc thật mới nhất ETS 2024 gồm Part 5 (Câu ngắn), Part 6 (Điền đoạn văn) và Part 7 (Đọc hiểu doanh nghiệp).",
    durationMinutes: 75,
    totalQuestions: 15,
    tags: ["ETS 2024", "Đề thi thật", "Part 5-7", "Ngữ pháp & Từ vựng"],
    instructions: "Làm bài thi đọc Part 5, 6, 7. Tận dụng công cụ Bút dạ quang (Highlight) trên bài đọc để đánh dấu từ khóa.",
    questions: [
      {
        id: "e24-r1",
        part: "Part 5: Incomplete Sentences",
        type: "single-choice",
        prompt: "Ms. Patel _______ completed the corporate audit two days ahead of the statutory deadline.",
        options: [
          { key: "A", text: "successful" },
          { key: "B", text: "successfully" },
          { key: "C", text: "success" },
          { key: "D", text: "succeed" }
        ],
        answer: "B",
        explanation: "Vị trí đứng trước động từ 'completed' cần một trạng từ 'successfully' (một cách thành công) để bổ nghĩa."
      },
      {
        id: "e24-r2",
        part: "Part 5: Incomplete Sentences",
        type: "single-choice",
        prompt: "The human resources department announced that all employee benefits will remain _______ throughout the upcoming fiscal year.",
        options: [
          { key: "A", text: "unchanged" },
          { key: "B", text: "unchangingly" },
          { key: "C", text: "unchange" },
          { key: "D", text: "unchanging" }
        ],
        answer: "A",
        explanation: "Sau linking verb 'remain' cần một tính từ 'unchanged' (không thay đổi, giữ nguyên)."
      },
      {
        id: "e24-r3",
        part: "Part 5: Incomplete Sentences",
        type: "single-choice",
        prompt: "Customers who register their electronic appliances online within fourteen days will receive an _______ warranty period.",
        options: [
          { key: "A", text: "extend" },
          { key: "B", text: "extended" },
          { key: "C", text: "extending" },
          { key: "D", text: "extension" }
        ],
        answer: "B",
        explanation: "Cụm danh từ 'an extended warranty period' mang nghĩa 'thời hạn bảo hành được mở rộng'."
      },
      {
        id: "e24-r4",
        part: "Part 5: Incomplete Sentences",
        type: "single-choice",
        prompt: "_______ the sudden surge in passenger volume, the airport authority deployed twenty additional security scanning lanes.",
        options: [
          { key: "A", text: "Because" },
          { key: "B", text: "In order to" },
          { key: "C", text: "In response to" },
          { key: "D", text: "Even though" }
        ],
        answer: "C",
        explanation: "'In response to + Noun phrase' mang nghĩa 'Để ứng phó/phản hồi lại sự gia tăng đột biến của lượng hành khách'."
      },
      {
        id: "e24-r5",
        part: "Part 6: Text Completion",
        passageText: `NOTICE TO ALL COMMUTERS
METRO TRANSIT AUTHORITY
Subject: Central Station Escalator Refurbishment

Please be advised that starting October 28, the primary escalators connecting the underground concourse to Platform 3 will be temporarily closed for essential mechanical refurbishment. 

During this two-week maintenance window, passengers are advised to utilize the stairways or the adjacent elevator situated next to Gate D. [1] _______.

We sincerely regret any inconvenience caused as we continue our multimillion-dollar commitment to commuter safety and station modernization.`,
        prompt: "Choose the best sentence to fill in blank [1]:",
        options: [
          { key: "A", text: "Transit attendants will be stationed at the elevator entrance to assist mobility-impaired passengers." },
          { key: "B", text: "Monthly train passes can be purchased at any convenience store." },
          { key: "C", text: "The weather forecast predicts heavy snowfall tomorrow morning." },
          { key: "D", text: "Tickets must be shown upon boarding the airport shuttle bus." }
        ],
        answer: "A",
        explanation: "Đoạn trước hướng dẫn hành khách sử dụng thang bộ hoặc thang máy gần Cổng D trong thời gian sửa thang cuốn. Câu A tiếp nối logic: 'Transit attendants will be stationed at the elevator entrance to assist mobility-impaired passengers' (Nhân viên sẽ trực tại thang máy để hỗ trợ hành khách gặp khó khăn đi lại)."
      },
      {
        id: "e24-r6",
        part: "Part 7: Reading Comprehension",
        passageText: `EMAIL CORRESPONDENCE
To: Marcus Vance <m.vance@vancearchitects.com>
From: Linh Nguyen <l.nguyen@horizondevelopment.vn>
Date: October 26, 2024
Subject: Green Building Certification - Skyview Commercial Tower

Dear Marcus,

I am writing to share exciting news regarding our ongoing collaboration on the Skyview Commercial Tower in District 1. 

The Vietnam Green Building Council (VGBC) has officially notified us that our structural designs have earned the LOTUS Gold Pre-Certification. The review panel specifically commended your team's innovative double-glazed low-emissivity glass facade, which is projected to reduce interior HVAC cooling loads by 34 percent during peak summer months.

Our municipal permit review is scheduled for next Thursday, November 4. Could you please prepare three physical sets of the updated structural blueprint diagrams by Tuesday afternoon?

Warm regards,
Linh Nguyen
Project Director, Horizon Development`,
        prompt: "Why did Linh Nguyen send this email to Marcus Vance?",
        options: [
          { key: "A", text: "To terminate an architectural consulting agreement" },
          { key: "B", text: "To share news of a green certification achievement and request blueprint sets" },
          { key: "C", text: "To complain about rising glass manufacturing expenses" },
          { key: "D", text: "To reschedule a meeting to December" }
        ],
        answer: "B",
        explanation: "Email thông báo dự án Skyview Tower đạt chứng chỉ LOTUS Gold Pre-Certification và nhờ Marcus chuẩn bị 3 bộ bản vẽ thiết kế trước chiều thứ Ba."
      },
      {
        id: "e24-r7",
        part: "Part 7: Reading Comprehension",
        prompt: "What special feature of the building design was highlighted by the certification panel?",
        options: [
          { key: "A", text: "A rooftop helicopter landing pad" },
          { key: "B", text: "A double-glazed low-emissivity glass facade reducing cooling demands" },
          { key: "C", text: "An underground public parking garage" },
          { key: "D", text: "An automated solar panel water fountain" }
        ],
        answer: "B",
        explanation: "Trong email nêu rõ: 'double-glazed low-emissivity glass facade, which is projected to reduce interior HVAC cooling loads by 34 percent'."
      }
    ]
  },

  // ==========================================
  // 3. CAMBRIDGE IELTS 19 ACADEMIC - LISTENING (TEST 1)
  // ==========================================
  {
    id: "ielts-cam-19-t1-listening",
    category: "ielts",
    skill: "listening",
    source: "Cambridge IELTS 19",
    title: "Cambridge IELTS 19 Academic Test 01 - Listening",
    subtitle: "Đề thi Cambridge IELTS 19 (bản phát hành mới nhất 2024): 4 Sections chuẩn kỳ thi thật quốc tế.",
    durationMinutes: 30,
    totalQuestions: 10,
    tags: ["Cambridge 19", "Mới nhất 2024", "4 Sections", "Band 8.0+"],
    instructions: "Lắng nghe cẩn thận và trả lời các câu hỏi. Mỗi câu hỏi chỉ được nghe 1 lần theo đúng format chuẩn Cambridge.",
    questions: [
      {
        id: "c19-l1",
        part: "Section 1: University Student Accommodation Enquiry",
        type: "single-choice",
        passageText: `[Audio Transcript - University Housing Office]
Advisor: Welcome to the University Housing Services. How may I assist you?
Student: Hello, my name is Liam Davies. I'm starting my master's degree in Renewable Energy next semester and I'd like to inquire about postgraduate residences.
Advisor: Welcome, Liam! We have two dedicated postgraduate residences: Parkside Hall and Meadow View.
Student: I prefer a quieter environment close to the Science faculty.
Advisor: In that case, Meadow View would be ideal. It is situated just a seven-minute walk from the engineering and physics laboratories.`,
        prompt: "Which residence hall did the advisor recommend to Liam Davies?",
        audioText: "Welcome Liam! We have two dedicated postgraduate residences: Parkside Hall and Meadow View. Student: I prefer a quieter environment close to the Science faculty. Advisor: In that case, Meadow View would be ideal. It is situated just a seven-minute walk from the engineering laboratories.",
        options: [
          { key: "A", text: "Parkside Hall" },
          { key: "B", text: "Meadow View" },
          { key: "C", text: "Riverfront Suites" },
          { key: "D", text: "University Towers" }
        ],
        answer: "B",
        explanation: "Cố vấn khuyên: 'Meadow View would be ideal' vì gần khoa kỹ thuật và yên tĩnh."
      },
      {
        id: "c19-l2",
        part: "Section 1: University Student Accommodation Enquiry",
        type: "single-choice",
        prompt: "How far is the recommended residence from the engineering laboratories?",
        options: [
          { key: "A", text: "A 7-minute walk" },
          { key: "B", text: "A 20-minute bus ride" },
          { key: "C", text: "Directly connected by bridge" },
          { key: "D", text: "Over an hour away" }
        ],
        answer: "A",
        explanation: "Cố vấn cho biết: 'just a seven-minute walk from the engineering and physics laboratories'."
      },
      {
        id: "c19-l3",
        part: "Section 2: City River Preservation Walk",
        type: "single-choice",
        passageText: `[Audio Transcript - River Conservator Briefing]
Good morning, volunteers. Before we begin planting indigenous willow saplings along the Avon Riverbank, please note safety regulations. Sturdy waterproof rubber boots must be worn at all times because the marshy mud can be deceptively slippery. Furthermore, all plastic debris collected should be placed into the blue recycling bins located beside the wooden footbridge.`,
        prompt: "What must all river volunteers wear at all times for safety?",
        audioText: "Good morning, volunteers. Sturdy waterproof rubber boots must be worn at all times because the marshy mud can be deceptively slippery.",
        options: [
          { key: "A", text: "Reflective neon vests" },
          { key: "B", text: "Sturdy waterproof rubber boots" },
          { key: "C", text: "Protective plastic goggles" },
          { key: "D", text: "Leather gardening gloves" }
        ],
        answer: "B",
        explanation: "Người phụ trách nêu rõ: 'Sturdy waterproof rubber boots must be worn at all times'."
      },
      {
        id: "c19-l4",
        part: "Section 3: Academic Psychology Seminar",
        type: "single-choice",
        passageText: `[Audio Transcript - Discussion between Professor and Graduate Students]
Professor: Chloe, your research proposal investigating how digital notifications disrupt deep cognitive focus was well structured. However, I noticed your sample size was restricted entirely to university undergraduates.
Chloe: Yes, Professor. It was easiest to recruit participants from my psychology lecture groups.
Professor: True, but university students exhibit distinct digital consumption habits that cannot be extrapolated to elderly citizens or working professionals. You must diversify your demographic pool.`,
        prompt: "What primary limitation did the professor point out in Chloe's study?",
        audioText: "Professor: Chloe, your research proposal investigating how digital notifications disrupt deep cognitive focus was well structured. However, I noticed your sample size was restricted entirely to university undergraduates.",
        options: [
          { key: "A", text: "The experiment violated ethical guidelines" },
          { key: "B", text: "The sample group was limited strictly to university undergraduates" },
          { key: "C", text: "The statistical software used was obsolete" },
          { key: "D", text: "The hypothesis was disproven by previous studies" }
        ],
        answer: "B",
        explanation: "Giáo sư nhận xét mẫu thử chỉ giới hạn ở sinh viên đại học ('restricted entirely to university undergraduates') nên không thể khái quát cho toàn xã hội."
      },
      {
        id: "c19-l5",
        part: "Section 4: University Lecture on Biomimicry Architecture",
        type: "single-choice",
        passageText: `[Audio Transcript - Architecture Lecture]
Biomimicry—the practice of emulating nature's time-tested designs—has revolutionized sustainable building engineering. Consider the Eastgate Centre in Harare, Zimbabwe. Designed by architect Mick Pearce, this complex possesses no conventional mechanical air-conditioning. Instead, its internal ventilation mimics the self-cooling mounds of Macrotermes termites, keeping interior temperatures stable while consuming thirty-five percent less energy than conventional buildings of comparable scale.`,
        prompt: "Which natural organism inspired the passive ventilation design of the Eastgate Centre in Harare?",
        audioText: "Consider the Eastgate Centre in Harare, Zimbabwe. Designed by architect Mick Pearce, this complex possesses no conventional mechanical air-conditioning. Instead, its internal ventilation mimics the self-cooling mounds of Macrotermes termites.",
        options: [
          { key: "A", text: "Desert cacti" },
          { key: "B", text: "Termite mounds" },
          { key: "C", text: "Beehive honeycombs" },
          { key: "D", text: "Whale fins" }
        ],
        answer: "B",
        explanation: "Giảng viên nêu: 'its internal ventilation mimics the self-cooling mounds of Macrotermes termites' (gò mối tự làm mát)."
      }
    ]
  },

  // ==========================================
  // 4. CAMBRIDGE IELTS 19 ACADEMIC - READING (TEST 1)
  // ==========================================
  {
    id: "ielts-cam-19-t1-reading",
    category: "ielts",
    skill: "reading",
    source: "Cambridge IELTS 19",
    title: "Cambridge IELTS 19 Academic Test 01 - Reading",
    subtitle: "3 Bài đọc học thuật kinh điển từ Cambridge 19: The Domestication of Horses, The Science of Laughter, Deep-Sea Mining.",
    durationMinutes: 60,
    totalQuestions: 10,
    tags: ["Cambridge 19", "Mới nhất 2024", "True/False/NG", "Passage 1-3"],
    instructions: "Đọc kỹ 3 bài đọc và trả lời các câu hỏi. Hãy sử dụng bút bôi màu (Highlight) bên trên văn bản để ghi nhớ vị trí câu trả lời.",
    questions: [
      {
        id: "c19-r1",
        part: "Passage 1: The Evolutionary History of Horse Domestication",
        type: "single-choice",
        passageText: `READING PASSAGE 1: THE EVOLUTIONARY HISTORY OF HORSE DOMESTICATION

For millennia, anthropologists and evolutionary biologists debated precisely when and where Equus caballus—the modern domestic horse—was first tamed by ancient human civilizations. Earlier archaeological hypotheses pointed to the Botai culture of northern Kazakhstan around 3500 BC, where excavations unearthed horse bones exhibiting bit-wear markings on teeth, alongside pottery fragments containing traces of mare's milk.

However, a groundbreaking 2021 paleogenomic study led by Ludovic Orlando analyzed 273 ancient equid genomes across Eurasia. The definitive genetic evidence overturned the Botai consensus, revealing that modern domestic horses actually originated in the lower Volga-Don region of Russia around 2200 BC. Within a few centuries, this specific lineage spread rapidly across Europe and Asia, propelled by two key genetic mutations: one enhancing docility and stress resilience, and another reinforcing vertebral spinal strength for carrying heavy loads.`,
        prompt: "The 2021 paleogenomic research confirmed that modern domestic horses originated with the Botai culture in Kazakhstan.",
        options: [
          { key: "A", text: "TRUE" },
          { key: "B", text: "FALSE" },
          { key: "C", text: "NOT GIVEN" }
        ],
        answer: "B",
        explanation: "Nghiên cứu năm 2021 đã lật ngược quan điểm về văn hóa Botai ('overturned the Botai consensus') và chỉ ra giống ngựa hiện đại thực chất bắt nguồn từ vùng hạ lưu Volga-Don của Nga (FALSE)."
      },
      {
        id: "c19-r2",
        part: "Passage 1: The Evolutionary History of Horse Domestication",
        type: "single-choice",
        prompt: "Genetic mutations found in the Volga-Don lineage provided horses with greater spinal resilience for carrying loads.",
        options: [
          { key: "A", text: "TRUE" },
          { key: "B", text: "FALSE" },
          { key: "C", text: "NOT GIVEN" }
        ],
        answer: "A",
        explanation: "Đoạn 2 nêu rõ: 'reinforcing vertebral spinal strength for carrying heavy loads' -> Hoàn toàn chính xác (TRUE)."
      },
      {
        id: "c19-r3",
        part: "Passage 1: The Evolutionary History of Horse Domestication",
        type: "single-choice",
        prompt: "How many ancient equid genomes were analyzed in the 2021 study led by Ludovic Orlando?",
        options: [
          { key: "A", text: "Exactly 50" },
          { key: "B", text: "Over 1,000" },
          { key: "C", text: "273 ancient genomes" },
          { key: "D", text: "Fewer than 100" }
        ],
        answer: "C",
        explanation: "Bài đọc nêu: 'analyzed 273 ancient equid genomes across Eurasia'."
      },
      {
        id: "c19-r4",
        part: "Passage 2: The Neurological Science of Laughter and Social Bonding",
        type: "single-choice",
        passageText: `READING PASSAGE 2: THE NEUROLOGICAL SCIENCE OF LAUGHTER

While humor is commonly thought of as an intellectual cognitive reaction to jokes, neurobiologists view laughter fundamentally as a mammalian social bonding mechanism. Evolutionary psychologist Robin Dunbar discovered that hearty social laughter triggers the endogenous release of endorphins in the human brain. These neurochemicals promote feelings of safety, suppress physical pain, and strengthen interpersonal cohesion among tribal members.

Crucially, evolutionary predecessors of laughter can be observed across great apes, dogs, and even laboratory rats, which emit ultrasonic 50-kHz vocalizations during playful wrestling bouts. These findings demonstrate that laughter evolved millions of years before spoken language as a reassuring emotional signal that mock fighting was benign play rather than lethal hostility.`,
        prompt: "According to Robin Dunbar, laughter stimulates the secretion of endorphins which enhance social bonding.",
        options: [
          { key: "A", text: "TRUE" },
          { key: "B", text: "FALSE" },
          { key: "C", text: "NOT GIVEN" }
        ],
        answer: "A",
        explanation: "Bài viết nêu rõ: 'laughter triggers the endogenous release of endorphins... strengthen interpersonal cohesion' (TRUE)."
      },
      {
        id: "c19-r5",
        part: "Passage 2: The Neurological Science of Laughter and Social Bonding",
        type: "single-choice",
        prompt: "Laughter is unique exclusively to humans and is never observed in other mammalian species.",
        options: [
          { key: "A", text: "TRUE" },
          { key: "B", text: "FALSE" },
          { key: "C", text: "NOT GIVEN" }
        ],
        answer: "B",
        explanation: "Đoạn 2 khẳng định tiếng cười tiền thân có thể quan sát thấy ở loài vượn người, chó và chuột trong lúc đùa nghịch, nên nhận định tiếng cười chỉ có ở con người là FALSE."
      }
    ]
  },

  // ==========================================
  // 5. CAMBRIDGE IELTS 19 ACADEMIC - WRITING
  // ==========================================
  {
    id: "ielts-cam-19-t1-writing",
    category: "ielts",
    skill: "writing",
    source: "Cambridge IELTS 19",
    title: "Cambridge IELTS 19 Academic Writing: Task 1 & Task 2",
    subtitle: "Đề thi Viết mới nhất từ Cambridge 19: Báo cáo tỷ lệ năng lượng tái tạo (Task 1) và Tác động công nghệ truyền thông (Task 2).",
    durationMinutes: 60,
    totalQuestions: 2,
    tags: ["Cambridge 19", "Task 1 & 2", "Bài mẫu Band 8.5", "Bộ đếm từ"],
    instructions: "Dành 20 phút cho Task 1 (tối thiểu 150 từ) và 40 phút cho Task 2 (tối thiểu 250 từ). Sử dụng bộ đếm từ trực tiếp và tham khảo bài mẫu Band 8.5+.",
    questions: [
      {
        id: "c19-w1",
        part: "IELTS Writing Task 1: Renewable Energy Shares",
        type: "writing-essay",
        prompt: `You should spend about 20 minutes on this task.
The chart below shows the proportion of electricity generated from renewable sources (wind, solar, hydro) in four European countries (Norway, Germany, Spain, and Poland) between 2012 and 2024.
Summarize the information by selecting and reporting the main features, and make comparisons where relevant.
Write at least 150 words.`,
        minWords: 150,
        sampleEssay: `The given bar chart compares the percentage of total electricity produced from renewable energy sources—namely wind, solar, and hydroelectric power—across four European nations from 2012 to 2024.

Overall, it is manifest that renewable electricity generation experienced an upward trend across all surveyed nations over the twelve-year span. Norway consistently maintained a dominant, near-total reliance on clean energy, whereas Poland, despite notable progress, remained the least reliant on green electricity.

In 2012, Norway was already generating an overwhelming 97% of its electrical power from renewables, largely due to its extensive hydroelectric infrastructure. By contrast, Spain and Germany registered moderate proportions of 32% and 24% respectively, while Poland trailed considerably behind at a modest 11%.

Between 2012 and 2024, aggressive governmental subsidies for offshore wind farms and solar panel arrays catalyzed dramatic expansions in both Germany and Spain. By 2024, Germany's renewable share had more than doubled to 56%, narrowly overtaking Spain at 52%. Poland similarly augmented its clean energy output to 28%. Meanwhile, Norway virtually attained complete decarbonization, finishing the timeframe at 99%.`,
        rubric: [
          "Task Achievement: Nêu rõ xu hướng tổng quan (overview) và so sánh chính xác số liệu các năm 2012 và 2024.",
          "Coherence & Cohesion: Bố cục 4 đoạn chuẩn xác (Intro, Overview, 2 Thân bài so sánh).",
          "Lexical Resource: Từ vựng C1-C2 (manifest, overwhelming, extensive hydroelectric infrastructure, aggressive governmental subsidies, catalyzed dramatic expansions).",
          "Grammatical Range: Cấu trúc câu ghép, câu phức và mệnh đề quan hệ chuẩn xác."
        ]
      },
      {
        id: "c19-w2",
        part: "IELTS Writing Task 2: Digital Communication vs Face-to-Face Interaction",
        type: "writing-essay",
        prompt: `You should spend about 40 minutes on this task. Write about the following topic:
Nowadays, a growing number of people communicate primarily through digital messaging platforms and social networks rather than face-to-face interaction.
Do the advantages of this development outweigh the disadvantages?
Give reasons for your answer and include any relevant examples from your own knowledge or experience.
Write at least 250 words.`,
        minWords: 250,
        sampleEssay: `In the contemporary digital epoch, instant messaging platforms and virtual social networks have largely superseded traditional in-person dialogue as the preeminent mode of human interaction. While this paradigm shift affords unparalleled logistical convenience and international connectivity, I contend that its detrimental psychological repercussions—specifically the erosion of genuine empathy and heightened social alienation—significantly outweigh its practical merits.

On the one hand, digital communication dismantles geographic and logistical constraints. In an increasingly globalized economy, professional teams dispersed across multiple time zones can collaborate synchronously via instant messaging channels such as Slack or Microsoft Teams. This drastically expedites operational decision-making while mitigating costly international travel expenditures. Furthermore, on a personal dimension, digital channels allow expatriates and geographically separated families to preserve daily emotional bonds effortlessly through video calls and instant text exchanges.

On the other hand, substituting physical presence with digital text strips human conversation of indispensable non-verbal nuances. Face-to-face discourse relies heavily upon subtle facial micro-expressions, tonal inflections, and bodily gestures, which collectively convey empathetic understanding. When communication is mediated primarily through computer screens, textual messages are frequently misconstrued, breeding cynicism and superficiality. Moreover, extensive empirical research correlates habitual social media communication with escalating rates of adolescent depression, loneliness, and social anxiety, as curated online personas engender toxic comparisons.

In conclusion, although digital messaging delivers indispensable efficiency for cross-border commerce and everyday logistics, its adverse impact upon deep human emotional intimacy and psychological well-being is profound. Therefore, I firmly maintain that the disadvantages of diminishing face-to-face interaction far eclipse its utilitarian benefits.`,
        rubric: [
          "Task Response: Luận điểm rõ ràng, nhất quán xuyên suốt bài viết (nhấn mạnh bất lợi lớn hơn lợi ích).",
          "Coherence & Cohesion: Mạch lạc tuyệt đối, sử dụng từ nối tự nhiên (In the contemporary digital epoch, On the one hand, On the other hand, In conclusion).",
          "Lexical Resource: Từ vựng học thuật đỉnh cao (superseded, preeminent, logistical convenience, detrimental psychological repercussions, non-verbal nuances, empathetic understanding, eclipse its utilitarian benefits).",
          "Grammatical Range: Cấu trúc câu điều kiện, câu đảo ngữ, mệnh đề phân từ hoàn hảo."
        ]
      }
    ]
  },

  // ==========================================
  // 6. IELTS SPEAKING FORECAST 2024 / CAMBRIDGE 19
  // ==========================================
  {
    id: "ielts-cam-19-speaking-forecast",
    category: "ielts",
    skill: "speaking",
    source: "IELTS Forecast 2024",
    title: "IELTS Speaking Forecast Quý Mới Nhất - AI Examiner",
    subtitle: "Bộ đề dự đoán thi thật Quý mới nhất: Trí tuệ nhân tạo, Du lịch khám phá, Thói quen ngoài trời và Nhân vật truyền cảm hứng.",
    durationMinutes: 15,
    totalQuestions: 4,
    tags: ["Forecast 2024", "Phòng thu ảo", "Waveform", "Giám khảo AI"],
    instructions: "Mô phỏng phỏng vấn trực tiếp với giám khảo ảo. Nhấn 'Giám khảo đọc' để nghe câu hỏi, và nhấn 'Bắt đầu ghi âm' để trả lời qua micro.",
    questions: [
      {
        id: "c19-s1",
        part: "Part 1: Technology & Daily Life",
        type: "speaking-record",
        prompt: "How often do you use artificial intelligence tools like virtual assistants or language models in your daily study?",
        audioText: "How often do you use artificial intelligence tools like virtual assistants or language models in your daily study?",
        speakingTime: 45,
        sampleResponse: "I incorporate generative artificial intelligence into my academic routine on a virtually daily basis. Whether it involves brainstorming creative essay outlines, troubleshooting programming bugs, or polishing complex English sentence structures, these tools act as an exceptionally responsive study companion that drastically accelerates my learning efficiency.",
        vocabularyHighlights: ["incorporate into", "virtually daily basis", "responsive study companion", "accelerates learning efficiency"],
        tips: "Trả lời từ 3 - 4 câu tự nhiên, đưa ví dụ cụ thể (essay outlines, troubleshooting bugs)."
      },
      {
        id: "c19-s2",
        part: "Part 2: Individual Long Turn (Cue Card)",
        type: "speaking-record",
        prompt: `Describe an unforgettable journey or trip that you would like to take in the future.
You should say:
- Where you would like to travel to
- Who you would like to go with
- What activities you would do there
And explain why this particular journey would be so meaningful to you.`,
        preparationTime: 60,
        speakingTime: 120,
        sampleResponse: `I would like to talk about my dream expedition across the scenic South Island of New Zealand, a journey I aspire to undertake alongside two of my closest university confidants.

New Zealand has perpetually captivated my imagination due to its surreal cinematic landscapes, featuring dramatic alpine fjords, pristine turquoise glacial lakes, and snow-capped mountain ranges. During this two-week road trip in a camper van, we would embark on the Milford Sound cruise, hike the renowned Routeburn Track, and experience stargazing beneath the designated Dark Sky Reserve at Lake Tekapo.

What renders this voyage profoundly meaningful to me is the rare opportunity to disconnect from relentless corporate deadlines and immerse myself in raw, untamed natural grandeur. Furthermore, navigating challenging hiking trails and sharing campfires under the southern stars will undoubtedly cement an unbreakable lifelong bond between my companions and myself.`,
        vocabularyHighlights: ["dream expedition", "surreal cinematic landscapes", "alpine fjords", "raw untamed natural grandeur", "cement an unbreakable lifelong bond"],
        tips: "Dùng 1 phút chuẩn bị để ghi từ khóa (Where: New Zealand, Who: Friends, Activities: Milford Sound, Meaning: Disconnect & bond). Nói trôi chảy trong 1.5 - 2 phút."
      },
      {
        id: "c19-s3",
        part: "Part 3: Tourism & Environmental Protection",
        type: "speaking-record",
        prompt: "Do you think excessive mass tourism is doing more harm than good to fragile natural destinations?",
        audioText: "Do you think excessive mass tourism is doing more harm than good to fragile natural destinations?",
        speakingTime: 60,
        sampleResponse: "Without a doubt, unchecked mass tourism poses severe existential hazards to delicate ecological sanctuaries. While tourism generates vital fiscal revenues for indigenous communities, overwhelming foot traffic leads to irreversible soil erosion, plastic contamination, and wildlife disruption. In my perspective, municipal authorities must urgently enforce sustainable visitor quotas and implement mandatory conservation levies to safeguard these heritage ecosystems for posterity.",
        vocabularyHighlights: ["existential hazards", "fiscal revenues", "irreversible soil erosion", "sustainable visitor quotas", "heritage ecosystems for posterity"],
        tips: "Phân tích 2 mặt: lợi ích kinh tế (fiscal revenues) đối lập với tác hại môi trường (soil erosion, wildlife disruption), sau đó đề xuất giải pháp."
      }
    ]
  }
];

// Rich Vocabulary Bank
export const DEFAULT_VOCABULARY = [
  {
    word: "implement",
    ipa: "/ˈɪm.plɪ.ment/",
    pos: "verb",
    meaning: "Thực thi, áp dụng một kế hoạch/chính sách",
    example: "The management decided to implement flexible working hours starting next month.",
    category: "TOEIC",
    topic: "Workplace & Management"
  },
  {
    word: "reimbursement",
    ipa: "/ˌriː.ɪmˈbɜːs.mənt/",
    pos: "noun",
    meaning: "Khoản tiền hoàn trả chi phí đã chi trả trước",
    example: "Please submit all expense receipts to accounting for travel reimbursement.",
    category: "TOEIC",
    topic: "Finance & Accounting"
  },
  {
    word: "postpone",
    ipa: "/poʊstˈpoʊn/",
    pos: "verb",
    meaning: "Hoãn lại, dời lịch sang thời điểm sau",
    example: "Due to inclement weather, the annual outdoor seminar has been postponed.",
    category: "TOEIC",
    topic: "Meetings & Schedules"
  },
  {
    word: "juxtaposition",
    ipa: "/ˌdʒʌk.stə.pəˈzɪʃ.ən/",
    pos: "noun",
    meaning: "Sự đặt cạnh nhau để làm nổi bật nét tương phản",
    example: "The city exhibits a stunning juxtaposition of historic temples and modern glass skyscrapers.",
    category: "IELTS",
    topic: "Urban & Architecture"
  },
  {
    word: "ubiquitous",
    ipa: "/juːˈbɪk.wɪ.təs/",
    pos: "adjective",
    meaning: "Phổ biến ở khắp mọi nơi",
    example: "Smartphones have become ubiquitous across virtually every layer of modern society.",
    category: "IELTS",
    topic: "Technology & Society"
  },
  {
    word: "alleviate",
    ipa: "/əˈliː.vi.eɪt/",
    pos: "verb",
    meaning: "Làm thuyên giảm, xoa dịu nỗi đau hoặc vấn đề",
    example: "Constructing high-speed mass transit can significantly alleviate urban traffic congestion.",
    category: "IELTS",
    topic: "Environment & City"
  },
  {
    word: "indispensable",
    ipa: "/ˌɪn.dɪˈspen.sə.bəl/",
    pos: "adjective",
    meaning: "Thiết yếu, không thể thiếu được",
    example: "Critical thinking is an indispensable skill in today's knowledge-driven economy.",
    category: "IELTS",
    topic: "Education & Skills"
  }
];
