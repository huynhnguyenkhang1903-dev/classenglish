# 🎓 OmniPrep English - Nền Tảng Học & Thi Thử TOEIC & IELTS 4 Kỹ Năng

> Trang web học tiếng Anh hiện đại, mô phỏng chuẩn phòng thi TOEIC & IELTS với các mục thi thử riêng biệt cho **Nghe (Listening)**, **Đọc (Reading)**, **Nói (Speaking)** và **Viết (Writing)**, cùng tính năng **Import Đề Thi Thông Minh**.

---

## 🚀 Cách Khởi Chạy Nhanh

Hệ thống đã được thiết kế sẵn server Node.js nội bộ (không cần cài đặt thư viện ngoài, không bị chặn bởi PowerShell Execution Policy):

1. **Khởi chạy ứng dụng:**
   Mở terminal tại thư mục dự án và chạy:
   ```bash
   node server.js
   ```

2. **Truy cập nền tảng:**
   Mở bất kỳ trình duyệt nào (Chrome, Edge, Firefox, Brave, Cốc Cốc) và truy cập địa chỉ:
   ```
   http://localhost:3000
   ```
   *(Hoặc có thể mở trực tiếp file `index.html` trong trình duyệt).*

---

## 🌟 Các Tính Năng Nổi Bật

### 1. 📘 Thi Thử TOEIC Chuyên Sâu (Phân tách 4 kỹ năng)
- **🎧 TOEIC Listening:**
  - Đầy đủ format chuẩn ETS: Part 1 (Ảnh), Part 2 (Hỏi - Đáp), Part 3 (Hội thoại ngắn), Part 4 (Bài nói ngắn).
  - Trình phát âm thanh điều chỉnh tốc độ (`0.8x`, `1.0x`, `1.2x`, `1.5x`), chuyển đổi phụ đề transcript và giải thích chi tiết.
- **📖 TOEIC Reading:**
  - Part 5 (Điền câu ngữ pháp/từ vựng), Part 6 (Điền đoạn văn email/thông báo), Part 7 (Đọc hiểu văn bản đơn & kép).
  - Giao diện chia đôi màn hình: Bài đọc bên trái với công cụ **Bút dạ quang highlight (Vàng, Xanh lá, Xanh dương)**, câu hỏi bên phải.
- **🗣️ TOEIC Speaking:**
  - Luyện đọc đoạn văn phát âm chuẩn (Read Aloud), miêu tả ảnh (Describe Picture), phản xạ câu hỏi.
- **✍️ TOEIC Writing:**
  - Viết câu theo ảnh, phản hồi email và viết luận quan điểm (Opinion Essay).

---

### 2. 🎓 Thi Thử IELTS Academic Chuẩn Quốc Tế
- **🎧 IELTS Listening (4 Sections):**
  - Section 1 (Điền form thông tin), Section 2 (Độc thoại hướng dẫn), Section 3 (Thảo luận nghiên cứu), Section 4 (Bài giảng học thuật).
- **📖 IELTS Reading (3 Passages):**
  - 3 Bài đọc học thuật khoa học & xã hội. Hỗ trợ các dạng bài: **True / False / Not Given**, trắc nghiệm, điền từ.
- **🗣️ IELTS Speaking Room (Giám Khảo Ảo & Phòng Thu Ảo):**
  - **Phỏng vấn Part 1, 2, 3** với avatar giám khảo ảo AI và phát âm audio giọng bản xứ.
  - **Ghi âm trực tiếp qua Micro:** Hiển thị sóng âm thời gian thực trên HTML5 Canvas.
  - **Nhận diện giọng nói (Speech-to-Text):** Tự động chuyển giọng nói tiếng Anh thành văn bản để so sánh với câu trả lời mẫu Band 8.0+.
- **✍️ IELTS Writing Room:**
  - **Task 1** (Báo cáo biểu đồ, tối thiểu 150 từ) & **Task 2** (Nghị luận xã hội, tối thiểu 250 từ).
  - Bộ đếm từ thời gian thực, bảng kiểm tiêu chí chấm điểm IELTS (Task Achievement, Coherence & Cohesion, Lexical Resource, Grammatical Range) và bài viết mẫu Band 8.5+.

---

### 3. 📥 Trung Tâm Nhập Đề Thi (Import Exam Hub)
Cho phép giáo viên và học viên thêm đề thi tiếng Anh của mình dễ dàng qua 3 cách:

#### Cách 1: Nhập nhanh qua văn bản (Smart Text Parser)
Dán trực tiếp văn bản đề thi từ Word/PDF vào khung:
```text
[Title: Đề thi thử TOEIC Reading 2024]
[Category: TOEIC]
[Skill: Reading]
[Time: 45]

[Passage]
Notice: All employees must submit their reports by Friday...

Question 1: What is the deadline for report submission?
A. Friday
B. Saturday
C. Next Monday
D. End of the month
Answer: A
Explanation: Đoạn văn nêu rõ nộp báo cáo trước thứ Sáu.
```
Hệ thống tự động phân tích và tạo bài thi ngay lập tức. Có sẵn nút **"💡 Dán văn bản mẫu"** để trải nghiệm ngay chỉ với 1 cú click!

#### Cách 2: Tải file JSON đề thi
- Hỗ trợ tải lên file `.json`.
- Cung cấp nút **"Tải file mẫu JSON đề thi"** để bạn chỉnh sửa đề theo form mẫu.
- Cho phép **"Xuất toàn bộ đề ra file JSON"** để sao lưu hoặc chia sẻ cho học viên khác.

---

### 4. 🗂️ Sổ Tay Flashcards & Từ Vựng Trọng Tâm
- Bộ từ vựng trọng tâm TOEIC Essential & IELTS Academic (nghĩa tiếng Việt, phiên âm IPA, từ loại, câu ví dụ và chủ đề).
- Thẻ ghi nhớ 3D lật mặt mượt mà.
- Nút **"🔊 Phát âm"** giọng bản xứ chuẩn bằng công nghệ Web Speech Synthesis.
- Tính năng lọc theo kỳ thi và xáo trộn ngẫu nhiên.

---

### 5. 📊 Thống Kê & Phân Tích Điểm Số
- Tự động tính điểm theo thang điểm chuẩn:
  - **TOEIC:** Thang điểm quy đổi 10 - 990 điểm (nghe/đọc 5 - 495) + xếp loại khung CEFR (A1 - C1).
  - **IELTS:** Thang điểm quy đổi Band 1.0 - 9.0 chuẩn quốc tế.
- Xem lại chi tiết từng câu: lọc theo *Tất cả*, *Câu đúng*, *Câu sai*.
- Bảng lịch sử lưu trữ kết quả thi tự động trong `localStorage`.

---

## 🎨 Giao Diện & Trải Nghiệm Người Dùng
- **Dark Mode & Light Mode:** Nút chuyển đổi giao diện sáng/tối với 1 cú click (lưu trạng thái tự động).
- Thiết kế hiện đại chuẩn Glassmorphism, màu sắc Neon Cyan/Purple, hiệu ứng animation mượt mà.
- Tối ưu hiển thị responsive trên cả Máy tính bàn, Laptop và Máy tính bảng.
