// CẤU HÌNH AI THỢ SĂN KHÁCH - ANHHAIC2
const AI_HUNTER_CONFIG = {
    scanRadius: 5, // Quét bán kính 5km quanh Hạ Long
    checkInterval: 7000, // 7 giây quét tìm khách một lần
    minPrice: 50000, // Chỉ săn cuốc trên 50k
};

// Danh sách các điểm tập trung khách tại Hạ Long (Dữ liệu AI)
const hotspots = [
    { name: "Vincom Shophouse Hạ Long", lat: 20.958, lng: 107.073, type: "VIP" },
    { name: "Chợ Đêm Bãi Cháy", lat: 20.948, lng: 107.035, type: "NORMAL" },
    { name: "Cảng tàu khách quốc tế", lat: 20.942, lng: 107.062, type: "AIRPORT" },
    { name: "Sun World Ha Long", lat: 20.951, lng: 107.045, type: "VIP" }
];

function initAIHunter() {
    console.log("AI Thợ săn khách đã sẵn sàng...");
    
    // Vòng lặp quét khách
    setInterval(() => {
        const luck = Math.random();
        // Nếu may mắn > 0.6 và đã nạp VIP thì mới nổ cuốc
        if (luck > 0.6) {
            const target = hotspots[Math.floor(Math.random() * hotspots.length)];
            const price = Math.floor(Math.random() * (500 - 100 + 1) + 100) + ".000đ";
            showCustomerAlert(target, price);
        }
    }, AI_HUNTER_CONFIG.checkInterval);
}

function showCustomerAlert(spot, price) {
    const alertBox = document.getElementById('custAlert');
    const infoText = document.getElementById('custInfo');
    
    if (alertBox && infoText) {
        infoText.innerHTML = `📍 Điểm đón: ${spot.name} <br> 💰 Ước tính: <span style="color:#ffc107">${price}</span>`;
        alertBox.style.display = 'block';
        
        // Rung máy báo hiệu
        if (navigator.vibrate) navigator.vibrate([300, 100, 300]);
    }
}

// Hàm điều hướng khi nhấn nút
function goNavigation() {
    // Tọa độ khách giả định để test dẫn đường
    const lat = 20.95; 
    const lng = 107.05;
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=driving`, '_blank');
}

// Kích hoạt AI
initAIHunter();
