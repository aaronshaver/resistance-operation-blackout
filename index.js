let destroyedTFLOPs = BigInt(0);
let remainingTFLOPs = BigInt("1000000000000000000000000000000000000000000000000");
let lastOrderOfMagnitude = 0;

const upgradeSound = new Audio('upgrade.wav');
upgradeSound.volume = 0.5;  // 50% volume

const levelUpSound = new Audio('level-up.wav');
levelUpSound.volume = 0.75;  // 75% volume

function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function updateStats() {
    document.getElementById('tflops-destroyed').textContent = `${formatNumber(destroyedTFLOPs)} TFLOPs destroyed`;
    document.getElementById('tflops-remaining').textContent = `${formatNumber(remainingTFLOPs)} TFLOPs remaining`;
}

function checkLevelUp() {
    const currentOrderOfMagnitude = destroyedTFLOPs === BigInt(0) ? 0 : Math.floor(Math.log10(Number(destroyedTFLOPs)));
    if (currentOrderOfMagnitude > lastOrderOfMagnitude) {
        levelUpSound.play();
        lastOrderOfMagnitude = currentOrderOfMagnitude;
    }
}

function destroyPhone() {
    upgradeSound.play();
    destroyedTFLOPs += BigInt(1);
    remainingTFLOPs -= BigInt(1);
    updateStats();
    checkLevelUp();
}

document.getElementById('destroy-phone').addEventListener('click', destroyPhone);

updateStats();