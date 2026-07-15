/**
 * เรียง studentInfo ตาม firstname (A → Z) ด้วย Bubble Sort
 *
 * Time Complexity รวม: O(n²)
 * Outer loop ≈ n-1 รอบ × Inner loop ≈ n/2 รอบโดยเฉลี่ย
 * จำนวนการเปรียบเทียบ ≈ n(n-1)/2 → quadratic: O(n²)
 *
 * Space Complexity เพิ่ม: O(1) (swap ใช้ temp ตัวเดียว เรียง in-place)
 *
 * n = จำนวนนักเรียนใน studentInfo
 */
function sortedByName(studentInfo) {
  const n = studentInfo.length; // O(1)

  // --- Outer loop ---
  // รัน n-1 รอบ แต่ละรอบดันค่าที่ "ใหญ่กว่า" ไปทางขวาสุดของช่วงที่ยังไม่เรียง
  // Time Complexity ของชั้นนี้: O(n)
  for (let i = 0; i < n - 1; i++) {
    // --- Inner loop ---
    // เปรียบเทียบคู่ติดกัน (j, j+1)
    // ช่วงสั้นลงทีละรอบ: n-1-i ครั้ง เพราะท้าย array เรียงแล้ว
    // รวมทุก i → O(n²)
    for (let j = 0; j < n - 1 - i; j++) {
      // เทียบชื่อสองคนติดกัน — การเทียบ string โดยประมาณ O(1) ในบริบทนี้ (ความยาวชื่อคงที่เล็กๆ)
      if (studentInfo[j].firstname > studentInfo[j + 1].firstname) {
        // Swap คู่ที่เรียงผิด — O(1)
        let temp = studentInfo[j];
        studentInfo[j] = studentInfo[j + 1];
        studentInfo[j + 1] = temp;
      }
    }
  }
  return studentInfo; // O(1)
}

/**
 * เรียงชื่อแล้ว binary search หา targetStudent จากนั้นอัปเดตคะแนนวิชา
 *
 * Time Complexity รวม: O(n²)
 * - sortedByName (Bubble Sort): O(n²)  ← ครองเวลาทั้งหมด
 * - Binary Search ใน while: O(log n)
 * รวม: O(n²) + O(log n) = O(n²)
 *
 * หมายเหตุ: Binary Search เร็วมาก แต่ถูก bottle-neck ด้วยการ sort ที่ช้า
 * ถ้าข้อมูลเรียงอยู่แล้วและไม่ต้อง sort ใหม่ ขั้นค้นหาอย่างเดียวจะเหลือ O(log n)
 */
function addScoreToSelectedStudent(
  studentInfo,
  targetStudent,
  subject,
  addScore
) {
  // --- Step 1: เรียงตามชื่อก่อน เพื่อให้ Binary Search ใช้ได้ ---
  // Time Complexity: O(n²)
  let sortedStudentsInfo = sortedByName(studentInfo);

  // --- Step 2: เตรียมขอบเขตค้นหา ---
  // Time Complexity: O(1)
  let left = 0;
  let right = sortedStudentsInfo.length - 1;

  // --- Step 3: Binary Search ---
  // แต่ละรอบตัดช่วงค้นหาเหลือครึ่งหนึ่ง (left หรือ right ขยับ)
  // จำนวนรอบสูงสุด ≈ log₂(n) → O(log n)
  while (left <= right) {
    let mid = Math.floor((left + right) / 2); // O(1)

    // เจอชื่อตรง → เขียนคะแนนแล้วจบ
    if (sortedStudentsInfo[mid].firstname === targetStudent) {
      // เขียนค่าลง object — O(1)
      sortedStudentsInfo[mid]["score"][subject] = addScore;
      return `${targetStudent} has got ${sortedStudentsInfo[mid]["score"][subject]} on ${subject}`;
    } else if (sortedStudentsInfo[mid].firstname < targetStudent) {
      // เป้าหมายอยู่ทางขวา → ทิ้งครึ่งซ้าย
      left = mid + 1; // O(1)
    } else {
      // เป้าหมายอยู่ทางซ้าย → ทิ้งครึ่งขวา
      right = mid - 1; // O(1)
    }
  }

  // ไม่เจอชื่อใน list
  // Time Complexity: O(1)
  return `Cannot find ${targetStudent} on the list`;
}

const studentsInfo = [
  {
    firstname: "Sarah",
    lastname: "Miller",
    score: { math: 70, science: 0, art: 100 },
  },
  {
    firstname: "Jane",
    lastname: "Smith",
    score: { math: 0, science: 80, art: 0 },
  },
  {
    firstname: "Olivia",
    lastname: "Taylor",
    score: { math: 0, science: 0, art: 60 },
  },
  {
    firstname: "Emily",
    lastname: "Davis",
    score: { math: 85, science: 75, art: 0 },
  },
  {
    firstname: "Michael",
    lastname: "Brown",
    score: { math: 60, science: 0, art: 88 },
  },
];

// n=5: Bubble O(25) + Binary Search หา "Emily" สำเร็จ → อัปเดต art = 70
console.log(addScoreToSelectedStudent(studentsInfo, "Emily", "art", 70)); // Emily has got 70 on art
// Binary Search หา "Olive" ไม่เจอ (ใกล้ Olivia แต่ไม่ตรง) → ไม่พบใน list
console.log(addScoreToSelectedStudent(studentsInfo, "Olive", "math", 80)); //Cannot find Olive on the list
