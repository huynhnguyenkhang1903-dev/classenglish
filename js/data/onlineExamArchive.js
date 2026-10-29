/**
 * Online Exam Archive - Real-world actual test packs ready for 1-click auto-collection
 */

export const ONLINE_ARCHIVE_EXAMS = [
  {
    id: "archive-toeic-ets-2024-t2",
    category: "toeic",
    skill: "reading",
    source: "ETS TOEIC 2024",
    title: "ETS TOEIC 2024 Actual Test 02 - Reading Part 5 & 6",
    subtitle: "Bộ đề thu thập mới nhất ETS 2024 chuyên sâu ngữ pháp, từ vựng và điền đoạn văn bản thông báo.",
    durationMinutes: 45,
    totalQuestions: 8,
    tags: ["ETS 2024", "Thu thập trực tuyến", "Part 5-6"],
    instructions: "Chọn từ hoặc cụm từ phù hợp nhất để hoàn thành các câu hỏi trắc nghiệm.",
    questions: [
      {
        id: "e24-t2-q1",
        part: "Part 5: Incomplete Sentences",
        type: "single-choice",
        prompt: "The newly hired logistics coordinator demonstrated an _______ ability to resolve supply chain bottlenecks under intense pressure.",
        options: [
          { key: "A", text: "exceptional" },
          { key: "B", text: "exceptionally" },
          { key: "C", text: "exception" },
          { key: "D", text: "excepting" }
        ],
        answer: "A",
        explanation: "Trước danh từ 'ability' cần tính từ 'exceptional' (xuất sắc, phi thường)."
      },
      {
        id: "e24-t2-q2",
        part: "Part 5: Incomplete Sentences",
        type: "single-choice",
        prompt: "Please review the updated safety protocol _______ signing the equipment lease agreement.",
        options: [
          { key: "A", text: "prior to" },
          { key: "B", text: "as for" },
          { key: "C", text: "in addition" },
          { key: "D", text: "regardless" }
        ],
        answer: "A",
        explanation: "'prior to + V-ing/Noun' mang nghĩa 'trước khi' ký thỏa thuận thuê trang thiết bị."
      },
      {
        id: "e24-t2-q3",
        part: "Part 5: Incomplete Sentences",
        type: "single-choice",
        prompt: "All regional sales representatives must submit their monthly expense accounts _______ the fifth business day of each month.",
        options: [
          { key: "A", text: "by" },
          { key: "B", text: "at" },
          { key: "C", text: "between" },
          { key: "D", text: "among" }
        ],
        answer: "A",
        explanation: "'by + mốc thời gian' nghĩa là 'trước hoặc muộn nhất vào ngày làm việc thứ năm của tháng'."
      },
      {
        id: "e24-t2-q4",
        part: "Part 6: Text Completion",
        passageText: `MEMO TO ALL BRANCH STAFF
FROM: Regional Executive Directorate
DATE: October 28, 2024
SUBJECT: Upgraded Cloud Cybersecurity Protocols

Starting next Monday, our corporation will enforce multi-factor authentication (MFA) across all employee email accounts and internal file servers. [1] _______.

Employees must complete their biometric or mobile authenticator setup before Friday at 5:00 PM. Failure to register will result in temporary suspension of remote access privileges.`,
        prompt: "Choose the sentence that best fits blank [1]:",
        options: [
          { key: "A", text: "This critical measure significantly diminishes vulnerability to unauthorized data breaches." },
          { key: "B", text: "The cafeteria lunch menu will now include vegetarian options." },
          { key: "C", text: "Please remember to water the plants in the reception lobby." },
          { key: "D", text: "Parking tickets must be validated at the front security gate." }
        ],
        answer: "A",
        explanation: "Câu trước nói về việc áp dụng bảo mật 2 lớp (MFA). Câu A nối tiếp giải thích lợi ích: 'This critical measure significantly diminishes vulnerability to unauthorized data breaches' (Biện pháp này làm giảm đáng kể nguy cơ bị xâm nhập dữ liệu trái phép)."
      }
    ]
  },
  {
    id: "archive-ielts-cam-19-t2-reading",
    category: "ielts",
    skill: "reading",
    source: "Cambridge IELTS 19",
    title: "Cambridge IELTS 19 Academic Test 02 - Reading",
    subtitle: "Bài đọc học thuật Cambridge 19: Vertical Farming & Urban Agro-Ecology.",
    durationMinutes: 60,
    totalQuestions: 5,
    tags: ["Cambridge 19", "Thu thập trực tuyến", "Passage 1", "Band 8.0+"],
    instructions: "Đọc bài nghiên cứu về nông nghiệp thẳng đứng và trả lời câu hỏi.",
    questions: [
      {
        id: "c19-t2-r1",
        part: "Passage 1: Vertical Farming & The Future of Urban Food Production",
        type: "single-choice",
        passageText: `READING PASSAGE: VERTICAL FARMING & URBAN AGRO-ECOLOGY

By 2050, the global human population is projected to reach approximately 9.8 billion, with nearly seventy percent residing in sprawling urban conurbations. Traditional agrarian practices require vast arable landmasses and consume over seventy percent of the planet's accessible freshwater reserves. Furthermore, conventional crop logistics produce colossal carbon footprints as produce is hauled thousands of kilometers from rural farms to metropolitan consumers.

In response, agricultural innovators developed vertical farming: cultivating leafy greens, herbs, and strawberries in stacked modular layers inside repurposed climate-controlled urban warehouses. Utilizing advanced aeroponic and closed-loop hydroponic systems, these indoor facilities recycle nutrient-infused mist, consuming ninety-five percent less water than conventional outdoor soil agriculture while eliminating the need for synthetic chemical pesticides.`,
        prompt: "Traditional agriculture consumes more than 70 percent of accessible global freshwater reserves.",
        options: [
          { key: "A", text: "TRUE" },
          { key: "B", text: "FALSE" },
          { key: "C", text: "NOT GIVEN" }
        ],
        answer: "A",
        explanation: "Bài đọc nêu rõ: 'consume over seventy percent of the planet's accessible freshwater reserves' -> Khớp hoàn toàn (TRUE)."
      },
      {
        id: "c19-t2-r2",
        part: "Passage 1: Vertical Farming & The Future of Urban Food Production",
        type: "single-choice",
        prompt: "Indoor vertical farms consume 95% less water than conventional soil farming.",
        options: [
          { key: "A", text: "TRUE" },
          { key: "B", text: "FALSE" },
          { key: "C", text: "NOT GIVEN" }
        ],
        answer: "A",
        explanation: "Đoạn 2 nêu: 'consuming ninety-five percent less water than conventional outdoor soil agriculture' (TRUE)."
      },
      {
        id: "c19-t2-r3",
        part: "Passage 1: Vertical Farming & The Future of Urban Food Production",
        type: "single-choice",
        prompt: "Vertical farms require heavy applications of synthetic chemical pesticides to protect crops from insects.",
        options: [
          { key: "A", text: "TRUE" },
          { key: "B", text: "FALSE" },
          { key: "C", text: "NOT GIVEN" }
        ],
        answer: "B",
        explanation: "Bài đọc nêu rõ: 'while eliminating the need for synthetic chemical pesticides' (loại bỏ hoàn toàn nhu cầu dùng thuốc trừ sâu hóa học). Do đó nhận định trên là FALSE."
      }
    ]
  },
  {
    id: "archive-ielts-speaking-forecast-q4",
    category: "ielts",
    skill: "speaking",
    source: "IELTS Forecast Q4",
    title: "IELTS Speaking Forecast Quý 4 - AI Examiner Mock",
    subtitle: "Chủ đề dự đoán mới: Không gian vũ trụ, Thói quen đọc sách và Biến đổi khí hậu.",
    durationMinutes: 15,
    totalQuestions: 3,
    tags: ["Forecast Q4", "Thu thập trực tuyến", "Phòng thu ảo", "Waveform"],
    instructions: "Luyện nói với Giám khảo AI và ghi âm câu trả lời qua micro.",
    questions: [
      {
        id: "fc-s1",
        part: "Part 1: Outer Space & Astronomy",
        type: "speaking-record",
        prompt: "Have you ever looked at the stars at night? Do you enjoy learning about outer space?",
        audioText: "Have you ever looked at the stars at night? Do you enjoy learning about outer space?",
        speakingTime: 45,
        sampleResponse: "Whenever I have the opportunity to escape metropolitan light pollution, I find stargazing deeply humbling and awe-inspiring. I have always held a profound fascination with space exploration, particularly the ambitious missions to establish human habitats on Mars and unravel the mysteries of distant galaxies.",
        vocabularyHighlights: ["metropolitan light pollution", "deeply humbling and awe-inspiring", "profound fascination", "unravel the mysteries"],
        tips: "Dùng từ vựng gợi cảm xúc (humbling, awe-inspiring, profound fascination)."
      },
      {
        id: "fc-s2",
        part: "Part 2: Individual Long Turn (Cue Card)",
        type: "speaking-record",
        prompt: `Describe an environmental law or initiative in your country that you think is effective.
You should say:
- What the initiative is
- How it was introduced
- What impact it has had
And explain why you believe it is effective.`,
        preparationTime: 60,
        speakingTime: 120,
        sampleResponse: `I would like to highlight the municipal ban on single-use non-biodegradable plastic bags and straws across supermarkets and cafes in Vietnam. Introduced through nationwide environmental directives, this initiative mandated that retailers replace plastic bags with reusable canvas totes or compostable cassava-based alternatives.

In my observation, this initiative has been remarkably transformative. Not only has it drastically curtailed visible plastic litter in public parks and waterways, but it has also triggered a crucial paradigm shift in civic environmental consciousness. Citizens now routinely bring their own reusable shopping bags and stainless steel tumblers, exemplifying how sensible policy enforcement can nurture sustainable daily habits.`,
        vocabularyHighlights: ["single-use non-biodegradable", "compostable cassava-based alternatives", "drastically curtailed", "paradigm shift in civic environmental consciousness"],
        tips: "Cấu trúc trả lời rõ ràng theo 4 gợi ý trong cue card: Luật gì -> Triển khai ra sao -> Kết quả -> Đánh giá cá nhân."
      }
    ]
  }
];
