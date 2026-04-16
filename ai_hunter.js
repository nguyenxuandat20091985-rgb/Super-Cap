// AI THỢ SĂN KHÁCH V4.0 - SÀN GIAO DỊCH CUỐC XE
const AI_MARKET = {
    minWait: 45000, // 45 giây nổ 1 khách
    maxWait: 180000, // Tối đa 3 phút
    phonePrefix: ['091', '098', '090', '034', '035', '086', '077'],
    destinations: [
        "Cầu Bãi Cháy", "Chợ Hạ Long 2", "Bệnh viện Tỉnh", 
        "Cảng Cái Lân", "Khu đô thị Mon Bay", "Cột 8", "Tuần Châu"
    ]
};

function generateRandomPhone() {
    let prefix = AI_MARKET.phonePrefix[Math.floor(Math.random() * AI_MARKET.phonePrefix.length)];
    let suffix = Math.floor(1000000 + Math.random() * 9000000).toString().substring(0, 7);
    return prefix + suffix;
}

function startMarketLoop() {
    let nextGuest = Math.floor(Math.random() * (AI_MARKET.maxWait - AI_MARKET.minWait + 1)) + AI_MARKET.minWait;
    
    setTimeout(() => {
        const phone = generateRandomPhone();
        const dest = AI_MARKET.destinations[Math.floor(Math.random() * AI_MARKET.destinations.length)];
        
        showMarketAlert(phone, dest);
        startMarketLoop(); 
    }, nextGuest);
}

function showMarketAlert(phone, dest) {
    const box = document.getElementById('custAlert');
    const info = document.getElementById('custInfo');
    
    if (box && info) {
        // Giao diện hiển thị SĐT và Điểm đến để tài xế gọi điện làm giá
        info.innerHTML = `
            <b style="color:#2ecc71; font-size: 1.1em;">📞 KHÁCH ĐANG ĐỢI...</b><br>
            <b>SĐT:</b> <a href="tel:${phone}" style="color:#ffc107; font-size: 1.2em;">${phone}</a><br>
            <b>Điểm đến:</b> ${dest}<br>
            <small>(Tài xế tự gọi điện thương lượng giá)</small>
        `;
        box.style.display = 'block';
        
        // Âm thanh thông báo để tài xế chú ý
        if (navigator.vibrate) navigator.vibrate([500, 100, 500]);
    }
}

startMarketLoop();
