// AI THỢ SĂN KHÁCH V6.0 - CHỈ KHÁCH THẬT 100% - ANHHAIC2
const AI_CONFIG = {
    // Đường dẫn Firebase chứa khách thật quét từ FB/Zalo
    firebaseURL: "https://super-cap-anh-hai-default-rtdb.asia-southeast1.firebasedatabase.app/real_guests.json"
};

window.lastGuestId = null;

// 1. HÀM CANH KHÁCH THỰC TẾ 24/7
function watchRealGuest() {
    console.log("📡 Hệ thống đang canh khách thật từ vệ tinh...");
    
    setInterval(() => {
        fetch(AI_CONFIG.firebaseURL)
        .then(res => res.json())
        .then(data => {
            if (data) {
                // Lấy danh sách ID khách
                const keys = Object.keys(data);
                const lastKey = keys[keys.length - 1];
                const lastGuest = data[lastKey];
                
                // Chỉ nổ cuốc khi phát hiện có ID khách mới hoàn toàn
                if (window.lastGuestId !== lastKey) {
                    window.lastGuestId = lastKey;
                    showRealGuest(lastGuest.phone, lastGuest.dest, lastGuest.source || "HỆ THỐNG");
                }
            }
        })
        .catch(e => {
            // Lỗi này thường do internet hoặc chưa có khách nào trên database
            console.log("Đang quét tín nguồn khách...");
        });
    }, 3000); // 3 giây quét một lần để đảm bảo tài xế nhận cuốc nhanh nhất
}

// 2. HÀM HIỂN THỊ CUỐC XE THẬT
function showRealGuest(phone, dest, source) {
    const box = document.getElementById('custAlert');
    const info = document.getElementById('custInfo');
    
    if (box && info) {
        // Giao diện tập trung vào số điện thoại và điểm đến thực tế
        info.innerHTML = `
            <div style="border-bottom: 1px solid #ff4d4d; padding-bottom:8px; margin-bottom:12px; display:flex; justify-content:space-between; align-items:center;">
                <span style="background:#ff4d4d; color:#fff; padding:3px 10px; border-radius:8px; font-size:11px; font-weight:bold;">📍 KHÁCH THẬT</span>
                <span style="font-size:10px; color:#aaa;">Nguồn: ${source}</span>
            </div>
            <div style="font-size: 1.1em; line-height: 1.8;">
                <div style="margin-bottom:8px;">
                    <span style="color:#aaa; font-size:0.9em;">Số điện thoại:</span><br>
                    <a href="tel:${phone}" style="color:#00bfa5; font-size:1.6em; text-decoration:none; font-weight:900; letter-spacing:1px;">📞 ${phone}</a>
                </div>
                <div>
                    <span style="color:#aaa; font-size:0.9em;">Điểm đón khách:</span><br>
                    <span style="color:#fff; font-weight:bold; font-size:1.2em;">${dest}</span>
                </div>
            </div>
            <div style="margin-top:15px; background:rgba(0,191,165,0.1); padding:8px; border-radius:10px; text-align:center;">
                <span style="color:#00bfa5; font-size:11px;">✅ Tài xế liên hệ ngay để chốt khách</span>
            </div>
        `;
        
        box.style.display = 'block';
        
        // Rung mạnh báo hiệu có khách thật
        if (navigator.vibrate) {
            navigator.vibrate([500, 110, 500, 110, 500]);
        }
    }
}

// 3. KHỞI CHẠY DUY NHẤT HÀM CANH KHÁCH THẬT
watchRealGuest();
