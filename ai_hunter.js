// AI THỢ SĂN KHÁCH V5.0 - AUTO MONITORING - ANHHAIC2
const AI_CONFIG = {
    minWait: 45000, 
    maxWait: 150000,
    phonePrefix: ['091','098','090','034','035','086','077','039'],
    points: ["Cầu Bãi Cháy", "Chợ Hạ Long 2", "Bệnh viện Tỉnh", "Khu Mon Bay", "Cột 8", "Big C Hạ Long", "Sun World", "Bãi tắm Hòn Gai"],
    firebaseURL: "https://super-cap-anh-hai-default-rtdb.asia-southeast1.firebasedatabase.app/real_guests.json"
};

window.lastGuestId = null;

// 1. HÀM CANH KHÁCH THẬT TỪ FIREBASE (CHẠY NGẦM 24/7)
function watchRealGuest() {
    setInterval(() => {
        fetch(AI_CONFIG.firebaseURL)
        .then(res => res.json())
        .then(data => {
            if (data) {
                const keys = Object.keys(data);
                const lastKey = keys[keys.length - 1];
                const lastGuest = data[lastKey];
                
                // Nếu tìm thấy ID mới (Khách thật mới đẩy lên)
                if (window.lastGuestId !== lastKey) {
                    window.lastGuestId = lastKey;
                    showGuest(lastGuest.phone, lastGuest.dest, true);
                }
            }
        })
        .catch(e => console.log("Đang đợi dữ liệu khách thật..."));
    }, 5000); // 5 giây kiểm tra một lần cho nóng
}

// 2. HÀM HIỂN THỊ THÔNG BÁO (DÙNG CHUNG CHO THẬT VÀ ẢO)
function showGuest(phone, dest, isReal = false) {
    const box = document.getElementById('custAlert');
    const info = document.getElementById('custInfo');
    
    if (box && info) {
        const tagColor = isReal ? "#ff4d4d" : "#ffc107";
        const tagName = isReal ? "🔥 KHÁCH THẬT (FB/ZALO)" : "⭐ HỆ THỐNG DÒ TÌM";
        
        info.innerHTML = `
            <div style="border-bottom: 1px dotted rgba(255,255,255,0.2); padding-bottom:8px; margin-bottom:10px; display:flex; justify-content:space-between; align-items:center;">
                <span style="background:${tagColor}; color:#fff; padding:2px 8px; border-radius:5px; font-size:10px; font-weight:bold;">${tagName}</span>
                <span style="font-size:10px; color:#aaa;">Vừa xong</span>
            </div>
            <div style="font-size: 1.1em; line-height: 1.6;">
                <div style="margin-bottom:5px;">
                    <span style="color:#aaa; font-size:0.9em;">Liên hệ:</span> 
                    <a href="tel:${phone}" style="color:#00bfa5; font-size:1.5em; text-decoration:none; font-weight:900; margin-left:5px;">📞 ${phone}</a>
                </div>
                <div>
                    <span style="color:#aaa; font-size:0.9em;">Điểm đón:</span> 
                    <span style="color:#fff; font-weight:bold; margin-left:5px;">${dest}</span>
                </div>
            </div>
        `;
        box.style.display = 'block';
        
        // Rung máy báo hiệu
        if (navigator.vibrate) navigator.vibrate([500, 200, 500]);
        
        // Chuông báo (nếu muốn)
        console.log("Nổ cuốc: " + phone);
    }
}

// 3. VÒNG LẶP KHÁCH MÔ PHỎNG (ĐỂ APP LUÔN CÓ VIỆC)
function startAutoHunter() {
    let delay = Math.floor(Math.random() * (AI_CONFIG.maxWait - AI_CONFIG.minWait + 1)) + AI_CONFIG.minWait;
    
    setTimeout(() => {
        // Chỉ nổ khách ảo nếu popup đang đóng (không đè lên khách thật)
        const box = document.getElementById('custAlert');
        if (box && box.style.display !== 'block') {
            const pre = AI_CONFIG.phonePrefix[Math.floor(Math.random() * AI_CONFIG.phonePrefix.length)];
            const num = Math.floor(1000000 + Math.random() * 9000000).toString().substring(0,7);
            const phone = pre + num;
            const dest = AI_CONFIG.points[Math.floor(Math.random() * AI_CONFIG.points.length)];
            
            showGuest(phone, dest, false);
        }
        startAutoHunter();
    }, delay);
}

// 4. KHỞI CHẠY HỆ THỐNG
watchRealGuest(); // Bật canh khách thật
startAutoHunter(); // Bật quét khách ảo xen kẽ
