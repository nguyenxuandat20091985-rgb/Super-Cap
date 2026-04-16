// SUPER-CAP V7.0 - HỆ THỐNG HỖ TRỢ DỮ LIỆU VẬN TẢI
const AI_CONFIG = {
    firebaseURL: "https://super-cap-anh-hai-default-rtdb.asia-southeast1.firebasedatabase.app/real_guests.json",
    brandName: "SUPER-CAP",
    cityMaxTime: 5,   // Nội thành: Đón trong 5 phút (~3.5km)
    tourMaxDist: 15   // Đi tỉnh/Tour: Đón trong bán kính 15km
};

window.lastGuestId = null;

// 1. Công thức tính khoảng cách chuẩn xác
function getDistance(lat1, lon1, lat2, lon2) {
    var R = 6371; 
    var dLat = (lat2 - lat1) * Math.PI / 180;
    var dLon = (lon2 - lon1) * Math.PI / 180;
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon/2) * Math.sin(dLon/2);
    return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))); 
}

// 2. Hàm canh khách thực tế 24/7 từ Firebase
function watchRealGuest() {
    setInterval(() => {
        fetch(AI_CONFIG.firebaseURL)
        .then(res => res.json())
        .then(data => {
            if (data) {
                const keys = Object.keys(data);
                const lastKey = keys[keys.length - 1];
                const lastGuest = data[lastKey];

                if (window.lastGuestId !== lastKey) {
                    window.lastGuestId = lastKey;

                    // Kiểm tra vị trí khách và tài xế
                    if (lastGuest.lat && lastGuest.lon && typeof userLoc !== 'undefined') {
                        let dist = getDistance(userLoc[0], userLoc[1], lastGuest.lat, lastGuest.lon);
                        
                        // Phân loại cuốc dựa trên từ khóa hoặc đánh dấu từ hệ thống
                        let isLong = lastGuest.isLongDist || dist > 4;

                        if (isLong) {
                            // Cuốc đường dài/Tour: Bán kính 15km
                            if (dist <= AI_CONFIG.tourMaxDist) {
                                showRealGuest(lastGuest.phone, lastGuest.dest, "ĐƯỜNG DÀI/TOUR", dist);
                            }
                        } else {
                            // Cuốc phố: Quy đổi ra phút đón (Tốc độ 35km/h)
                            let pickupTime = Math.ceil((dist / 35) * 60);
                            if (pickupTime <= AI_CONFIG.cityMaxTime) {
                                showRealGuest(lastGuest.phone, lastGuest.dest, pickupTime + " PHÚT", dist);
                            }
                        }
                    }
                }
            }
        }).catch(err => console.log("Hệ thống Super-Cap đang quét tín hiệu..."));
    }, 3000); 
}

// 3. Giao diện hiển thị chuyên nghiệp
function showRealGuest(phone, dest, timeLabel, distance) {
    const box = document.getElementById('custAlert');
    const info = document.getElementById('custInfo');
    
    if (box && info) {
        const isLong = timeLabel === "ĐƯỜNG DÀI/TOUR";
        const themeColor = isLong ? "#007aff" : "#00bfa5";

        info.innerHTML = `
            <div style="border-bottom: 1px solid ${themeColor}; padding-bottom:8px; margin-bottom:12px; display:flex; justify-content:space-between; align-items:center;">
                <span style="background:${themeColor}; color:#fff; padding:3px 10px; border-radius:8px; font-size:11px; font-weight:bold;">🚀 ${AI_CONFIG.brandName} REAL-TIME</span>
                <span style="font-size:10px; color:${themeColor}; font-weight:bold;">⏱ ${timeLabel}</span>
            </div>
            <div style="font-size: 1.1em; line-height: 1.8;">
                <div style="margin-bottom:8px;">
                    <span style="color:#aaa; font-size:0.9em;">Liên hệ khách (Bấm để gọi):</span><br>
                    <a href="tel:${phone}" style="color:${themeColor}; font-size:1.6em; text-decoration:none; font-weight:900; letter-spacing:1px;">📞 ${phone}</a>
                </div>
                <div>
                    <span style="color:#aaa; font-size:0.9em;">Điểm đón (Cách ${distance.toFixed(1)} km):</span><br>
                    <span style="color:#fff; font-weight:bold;">${dest}</span>
                </div>
            </div>
            <div style="margin-top:12px; font-size:9px; color:#666; font-style:italic;">
                * Dữ liệu hỗ trợ vận tải dành riêng cho thành viên Super-Cap.
            </div>
        `;
        
        box.style.display = 'block';
        if (navigator.vibrate) navigator.vibrate(isLong ? [200, 100, 200] : [500, 100, 500]);
    }
}

// Kích hoạt hệ thống
watchRealGuest();
