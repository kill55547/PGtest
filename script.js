// สัญลักษณ์และอัตราจ่ายเงิน
const symbols = [
    { emoji: '🍒', payout: 10 },
    { emoji: '🍋', payout: 20 },
    { emoji: '🍊', payout: 50 },
    { emoji: '🍉', payout: 100 },
    { emoji: '⭐', payout: 200 },
    { emoji: '🍓', payout: 500 }
];

let balance = 1000; // เริ่มต้นเงิน
const spinCost = 100; // ค่าใช้จ่ายในการหมุน

// ฟังก์ชันหมุนสล็อต
document.getElementById('spinButton').addEventListener('click', function () {
    if (balance < spinCost) {
        alert("ยอดเงินไม่เพียงพอ!");
        return;
    }

    balance -= spinCost;
    document.getElementById('balance').textContent = `💰 เงิน: ฿${balance}`;

    const slots = document.querySelectorAll('.slot');
    const spinResult = [];

    // หมุนสล็อต
    slots.forEach(slot => {
        const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
        slot.textContent = randomSymbol.emoji;
        spinResult.push(randomSymbol);
    });

    // ตรวจสอบผลลัพธ์
    let totalWin = 0;
    if (spinResult[0].emoji === spinResult[1].emoji && spinResult[1].emoji === spinResult[2].emoji) {
        totalWin = spinResult[0].payout * 3; // ชนะ 3 ช่องตรงกัน
    } else if (spinResult[0].emoji === spinResult[1].emoji || spinResult[1].emoji === spinResult[2].emoji) {
        totalWin = spinResult[1].payout * 2; // ชนะ 2 ช่องติดกัน
    }

    // แสดงผลการชนะหรือแพ้
    const resultMessage = document.getElementById('resultMessage');
    if (totalWin > 0) {
        balance += totalWin;
        resultMessage.textContent = `🎉 ชนะ! รับรางวัล ฿${totalWin}`;
        resultMessage.style.color = 'green';
    } else {
        resultMessage.textContent = `😢 ไม่ชนะ ลองใหม่อีกครั้ง!`;
        resultMessage.style.color = 'red';
    }

    document.getElementById('balance').textContent = `💰 เงิน: ฿${balance}`;
});
