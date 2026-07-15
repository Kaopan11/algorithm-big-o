/**
 * ตรวจว่ามีค่าซ้ำใน array หรือไม่
 *
 * Time Complexity รวม: O(n²)
 * เพราะมี loop ซ้อน 2 ชั้น — ทุกคู่ (i, j) ที่ j > i จะถูกเปรียบเทียบ
 * จำนวนการเปรียบเทียบ ≈ n(n-1)/2 → เป็น quadratic: O(n²)
 *
 * Best case: O(1) ถ้าเจอซ้ำตั้งแต่รอบแรก (เช่น [1, 1, ...]) เพราะ return true ทันที
 * Worst / Average case: O(n²) เมื่อไม่มีซ้ำ หรือซ้ำอยู่ท้ายๆ
 *
 * n = ความยาวของ arr
 */
function hasDuplicates(arr) {
  // --- Outer loop: วน element ตัวที่ i ---
  // รันประมาณ n ครั้ง (i = 0 ถึง n-1)
  // Time Complexity ของชั้นนี้: O(n)
  for (let i = 0; i < arr.length; i++) {
    // --- Inner loop: เทียบ arr[i] กับทุกตัวที่อยู่ทางขวา ---
    // j เริ่มที่ i+1 เพื่อไม่เทียบกับตัวเอง และไม่เทียบคู่เดิมซ้ำ
    // ในแต่ละรอบ i วนประมาณ (n - i - 1) ครั้ง
    // รวมทุก i: (n-1)+(n-2)+...+1 = n(n-1)/2 → O(n²)
    for (let j = i + 1; j < arr.length; j++) {
      // --- เปรียบเทียบค่า 2 ตัว ---
      // การอ่าน array และการเทียบ === เป็น O(1) ต่อครั้ง
      if (arr[i] === arr[j]) {
        return true; // เจอซ้ำ → หยุดทันที (early exit) O(1)
      }
    }
  }

  // วนครบทุกคู่แล้วยังไม่เจอซ้ำ
  // Time Complexity: O(1)
  return false;
}

// ตัวอย่าง 1: มี 2 อยู่สองตำแหน่ง → loop เจอคู่ซ้ำ → true
const array1 = [1, 2, 3, 4, 5, 6, 2];
console.log(hasDuplicates(array1)); // true

// ตัวอย่าง 2: ไม่มีค่าซ้ำ → ต้องเทียบครบทุกคู่ → false (worst case O(n²))
const array2 = [1, 2, 3, 4, 5, 6, 7];
console.log(hasDuplicates(array2)); // false
