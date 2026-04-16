// AI THỢ SĂN KHÁCH V4.6 - PHIÊN BẢN CHỐNG ẢO - ANHHAIC2
const AI_CONFIG = {
    minWait: 30000, // 30 giây nổ cuốc nhanh nhất
    maxWait: 120000, // 2 phút nổ cuốc chậm nhất
    phonePrefix: ['091','098','090','034','035','086','077','039'],
    points: [
        "Cầu Bãi Cháy", "Chợ Hạ Long 2", "Bệnh viện Tỉnh", 
        "Khu Mon Bay", "Cột 8", "Cảng Cái Lân", "Big C Hạ Long", 
        "Vinpearl Đảo Rều", "Sun World", "Bãi tắm Hòn Gai",
        "Chợ Đêm Hạ Long", "Bảo tàng Quảng Ninh"
    ]
};

// 1. Hàm đồng bộ vị trí (Giữ bản đồ luôn theo sát tài xế)
function refreshLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                if(typeof map !== 'undefined') {
                    const myLoc = [pos.coords.latitude, pos.coords.longitude];
                    map.panTo(myLoc);
                    console.log("Đã cập nhật vị trí chuẩn!");
                }
            },
            (err) => console.log("Lỗi GPS: ", err),
            { enableHighAccuracy: true, timeout: 5000 }
        );
    }
}

// 2. Tạo SĐT ngẫu nhiên chuẩn Việt Nam
function getPhone() {
    let pre = AI_CONFIG.phonePrefix[Math.floor(Math.random() * AI_CONFIG.phonePrefix.length)];
    let num = Math.floor(1000000 + Math.random() * 9000000).toString().substring(0,7);
    return pre + num;
}

// 3. Vòng lặp sàn giao dịch săn khách
function startMarket() {
    let delay = Math.floor(Math.random() * (AI_CONFIG.maxWait - AI_CONFIG.minWait + 1)) + AI_CONFIG.minWait;
    
    setTimeout(() => {
        const phone = getPhone();
        const dest = AI_CONFIG.points[Math.floor(Math.random() * AI_CONFIG.points.length)];
        
        const box = document.getElementById('custAlert');
        const info = document.getElementById('custInfo');
        
        if (box && info) {
            // Giao diện chuyên nghiệp: Icon lửa + SĐT nổi bật + Không còn dòng chữ hướng dẫn thừa
            info.innerHTML = `
                <div style="border-bottom: 1px dotted rgba(255,255,255,0.2); padding-bottom:8px; margin-bottom:10px; display:flex; justify-content:space-between; align-items:center;">
                    <span style="background:#ffc107; color:#000; padding:2px 8px; border-radius:5px; font-size:10px; font-weight:bold;">🔥 CUỐC XE MỚI</span>
                    <span style="font-size:10px; color:#aaa;">Vừa xong</span>
                </div>
                <div style="font-size: 1.1em; line-height: 1.6;">
                    <div style="margin-bottom:5px;">
                        <span style="color:#aaa; font-size:0.9em;">Khách:</span> 
                        <a href="tel:${phone}" style="color:#00bfa5; font-size:1.4em; text-decoration:none; font-weight:900; margin-left:5px;">📞 ${phone}</a>
                    </div>
                    <div>
                        <span style="color:#aaa; font-size:0.9em;">Đến:</span> 
                        <span style="color:#fff; font-weight:bold; margin-left:5px;">${dest}</span>
                    </div>
                </div>
            `;
            box.style.display = 'block';
            
            // Rung máy để báo hiệu có khách (chỉ hoạt động trên Android)
            if (navigator.vibrate) navigator.vibrate([400, 200, 400]);
        }
        
        // Gọi lại vòng lặp để tiếp tục săn khách
        startMarket(); 
    }, delay);
}

// Kích hoạt khi tải trang
refreshLocation();
startMarket();
