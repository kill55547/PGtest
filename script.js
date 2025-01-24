let balance = 1000; //อธิบาย 1 = 100% 0.3 = 30% 0.8 = 80% เข้าใจบ่
let winProbability = 0.1; // โอกาสชนะเริ่มต้น
let freeSpinProbability = 0.1; // โอกาสเข้าโหมดฟรีสปิน

// แสดงยอดเงินเริ่มต้น
document.getElementById('balance').textContent = `💰 เงิน: ฿${balance}`;

// ปุ่มหมุนสล็อต
document.getElementById('spinButton').addEventListener('click', function () {
    if (balance < 100) {
        alert("ยอดเงินไม่เพียงพอ!");
        return;
    }

    balance -= 100;
    document.getElementById('balance').textContent = `💰 เงิน: ฿${balance}`;

    const symbols = ['🍒', '🍋', '🍊', '🍉', '⭐', '🍓'];
    const slots = document.querySelectorAll('.slot');
    slots.forEach(slot => {
        const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
        slot.textContent = randomSymbol;
    });

    // ตรวจสอบการชนะ
    if (Math.random() < winProbability) {
        const winAmount = 250;
        balance += winAmount;
        document.getElementById('resultMessage').textContent = `🎉 ชนะ! รับรางวัล ฿${winAmount}`;
        document.getElementById('resultMessage').style.color = 'green';
    } else if (Math.random() < freeSpinProbability) {
        document.getElementById('resultMessage').textContent = `🎉 เข้าฟรีสปิน!`;
        document.getElementById('resultMessage').style.color = 'blue';
        startFreeSpin();
    } else {
        document.getElementById('resultMessage').textContent = `😢 ไม่ชนะ ลองใหม่อีกครั้ง!`;
        document.getElementById('resultMessage').style.color = 'red';
    }

    document.getElementById('balance').textContent = `💰 เงิน: ฿${balance}`;
});

// ฟังก์ชันฟรีสปิน
function startFreeSpin() {
    const winAmount = 1000;
    balance += winAmount;
    let freeSpins = 10;
    const interval = setInterval(() => {
        if (freeSpins === 0) {
            clearInterval(interval);
            document.getElementById('resultMessage').textContent = `🎉 จบโหมดฟรีสปิน!`;
            return;
        }
        freeSpins--;
        document.getElementById('resultMessage').textContent = `🎉 ฟรีสปินเหลือ: ${freeSpins}`;
        // หมุนสล็อตในโหมดฟรีสปิน
        const symbols = ['🍒', '🍋', '🍊', '🍉', '⭐', '🍓'];
        const slots = document.querySelectorAll('.slot');
        slots.forEach(slot => {
            const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
            slot.textContent = randomSymbol;
        });

        if (Math.random() < winProbability) {
            const winAmount = 200;
            balance += winAmount;
        }

        document.getElementById('balance').textContent = `💰 เงิน: ฿${balance}`;
    }, 1000);
}
