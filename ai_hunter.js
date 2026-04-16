// AI THỢ SĂN KHÁCH V4.5 - CHỐT ĐƠN QUA ĐIỆN THOẠI
const AI_CONFIG = {
    minWait: 30000, // 30 giây nổ cuốc nhanh nhất
    maxWait: 120000, // 2 phút nổ cuốc chậm nhất
    phonePrefix: ['091','098','090','034','035','086','077','039'],
    points: [
        "Cầu Bãi Cháy", "Chợ Hạ Long 2", "Bệnh viện Tỉnh", 
        "Khu Mon Bay", "Cột 8", "Cảng Cái Lân", "Big C Hạ Long", 
        "Vinpearl Đảo Rều", "Sun World", "Bãi tắm Hòn Gai"
    ]
};

// 1. Hàm tự động định vị lại khi vào app
function refreshLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                if(typeof map !== 'undefined') {
                    const myLoc = { lat: pos.coords.latitude, lng: pos.coords.longitude };
                    map.setCenter(myLoc);
                    if(typeof marker !== 'undefined') marker.setPosition(myLoc);
                    console.log("Đã cập nhật vị trí chuẩn!");
                }
            },
            (err) => console.log("Lỗi GPS: ", err),
            { enableHighAccuracy: true, timeout: 5000 }
        );
    }
}

// 2. Tạo SĐT ngẫu nhiên
function getPhone() {
    let pre = AI_CONFIG.phonePrefix[Math.floor(Math.random() * AI_CONFIG.phonePrefix.length)];
    let num = Math.floor(1000000 + Math.random() * 9000000).toString().substring(0,7);
    return pre + num;
}

// 3. Vòng lặp sàn giao dịch
function startMarket() {
    let delay = Math.floor(Math.random() * (AI_CONFIG.maxWait - AI_CONFIG.minWait + 1)) + AI_CONFIG.minWait;
    
    setTimeout(() => {
        const phone = getPhone();
        const dest = AI_CONFIG.points[Math.floor(Math.random() * AI_CONFIG.points.length)];
        
        const box = document.getElementById('custAlert');
        const info = document.getElementById('custInfo');
        
        if (box && info) {
            // Hiển thị SĐT dạng link tel: để ấn là gọi
            info.innerHTML = `
                <div style="border-bottom: 1px solid #444; padding-bottom:5px; margin-bottom:5px;">
                    <b style="color:#2ecc71;">📢 CÓ KHÁCH MỚI!</b>
                </div>
                <div style="font-size: 1.1em;">
                    <b>Khách:</b> <a href="tel:${phone}" style="color:#ffc107; text-decoration:none; font-weight:bold; font-size:1.3em;">📞 ${phone}</a><br>
                    <b>Điểm đến:</b> ${dest}
                </div>
                <div style="margin-top:5px; font-size:0.8em; color:#aaa;">(Ấn vào số điện thoại để gọi làm giá)</div>
            `;
            box.style.display = 'block';
            if (navigator.vibrate) navigator.vibrate([400, 200, 400]);
        }
        startMarket();
    }, delay);
}

// Khởi chạy
refreshLocation();
startMarket();
