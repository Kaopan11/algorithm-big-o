/**
 * หาคะแนนเฉลี่ยของนักเรียนในห้องที่กำหนด
 *
 * Time Complexity รวม: O(n)
 * เพราะ filter วนทั้ง array 1 รอบ + reduce วนกลุ่มที่กรองได้อีก 1 รอบ
 * ใน worst case ทั้งสองขั้นทำงานกับ n ตัว → O(n) + O(n) = O(n)
 * (คงพจน์นำของพหุนาม: linear time ขึ้นกับขนาด input)
 *
 * n = จำนวนนักเรียนทั้งหมดใน studentInfo
 */
function findAverageScoreByClass(studentInfo, classNo) {
  // --- Step 1: กรองนักเรียนตาม classNo ---
  // Array.filter() วนทุก element ใน studentInfo หนึ่งครั้ง
  // เปรียบเทียบ classNumber === classNo แต่ละตัว → ใช้เวลาคงที่ O(1) ต่อตัว
  // Time Complexity: O(n)
  const filteredStudents = studentInfo.filter(
    (student) => student.classNumber === classNo
  );

  // --- Step 2: เช็กว่ามีนักเรียนในห้องนี้หรือไม่ ---
  // อ่าน .length และการเปรียบเทียบเป็น constant time
  // Time Complexity: O(1)
  if (filteredStudents.length === 0) {
    return 0;
  }

  // --- Step 3: รวมคะแนนทุกคนในกลุ่มที่กรองได้ ---
  // Array.reduce() วนทุก element ใน filteredStudents
  // ให้ k = จำนวนนักเรียนที่ตรง classNo (k ≤ n)
  // การบวกคะแนนแต่ละรอบเป็น O(1)
  // Time Complexity: O(k) → worst case เมื่อ k = n คือ O(n)
  const totalScore = filteredStudents.reduce((acc, cur) => acc + cur.score, 0);

  // --- Step 4: หารเพื่อได้ค่าเฉลี่ย ---
  // การหารและการอ่านความยาวเป็น constant time
  // Time Complexity: O(1)
  const averageScore = totalScore / filteredStudents.length;

  return averageScore; // O(1)
}

// ข้อมูลตัวอย่าง — ไม่นับใน Big O ของฟังก์ชัน (เป็น input ที่ส่งเข้าไป)
// n = 5 ในเคสนี้
const studentsInfo = [
  {
    firstname: "Alice",
    lastname: "Johnson",
    classNumber: 10,
    score: 88,
  },
  {
    firstname: "Brian",
    lastname: "Smith",
    classNumber: 11,
    score: 92,
  },
  {
    firstname: "Catherine",
    lastname: "Davis",
    classNumber: 10,
    score: 85,
  },
  {
    firstname: "David",
    lastname: "Brown",
    classNumber: 12,
    score: 79,
  },
  {
    firstname: "Eva",
    lastname: "Williams",
    classNumber: 11,
    score: 91,
  },
];

// เรียกฟังก์ชัน: กรอง class 11 → Brian(92) + Eva(91) → (92+91)/2 = 91.5
console.log(findAverageScoreByClass(studentsInfo, 11)); // 91.5

// === คำตอบ Time Complexity: O(n) ===
