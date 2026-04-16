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

                    if (lastGuest.lat && lastGuest.lon && typeof userLoc !== 'undefined') {
                        let distanceKm = getDistance(userLoc[0], userLoc[1], lastGuest.lat, lastGuest.lon);
                        let isLongDist = lastGuest.isLongDist; // Phân loại từ Admin/Chatbot

                        // CHÍNH SÁCH LỌC THÔNG MINH
                        if (isLongDist) {
                            // CUỐC ĐI TỈNH/TOUR: Tài xế trong vòng 15km đều thấy để tiện chuyến
                            if (distanceKm <= 15) {
                                showRealGuest(lastGuest.phone, lastGuest.dest, "ĐƯỜNG DÀI", distanceKm);
                            }
                        } else {
                            // CUỐC NỘI THÀNH: Áp dụng quy tắc 5 phút (dưới 3.5km)
                            if (distanceKm <= 3.5) {
                                let pickupTime = Math.ceil((distanceKm / 40) * 60);
                                showRealGuest(lastGuest.phone, lastGuest.dest, pickupTime + " PHÚT", distanceKm);
                            }
                        }
                    }
                }
            }
        });
    }, 4000);
}

function showRealGuest(phone, dest, timeLabel, distance) {
    const box = document.getElementById('custAlert');
    const info = document.getElementById('custInfo');
    if (box && info) {
        // Đổi màu sắc dựa trên loại cuốc để tài xế dễ nhận diện
        const isLong = timeLabel === "ĐƯỜNG DÀI";
        const themeColor = isLong ? "#007aff" : "#ff4d4d"; // Xanh dương cho tỉnh, Đỏ cho nội thành
        
        info.innerHTML = `
            <div style="border-bottom: 1px solid ${themeColor}; padding-bottom:8px; margin-bottom:12px; display:flex; justify-content:space-between; align-items:center;">
                <span style="background:${themeColor}; color:#fff; padding:3px 10px; border-radius:8px; font-size:11px; font-weight:bold;">${isLong ? '💎 TIỆN CHUYẾN/TOUR' : '📍 CUỐC GẦN'}</span>
                <span style="font-size:10px; color:${themeColor}; font-weight:bold;">${timeLabel}</span>
            </div>
            <div style="font-size: 1.1em; line-height: 1.8;">
                <div style="margin-bottom:8px;">
                    <span style="color:#aaa; font-size:0.9em;">Liên hệ khách:</span><br>
                    <a href="tel:${phone}" style="color:#00bfa5; font-size:1.6em; text-decoration:none; font-weight:900;">📞 ${phone}</a>
                </div>
                <div>
                    <span style="color:#aaa; font-size:0.9em;">Điểm đón: (Cách ${distance.toFixed(1)} km)</span><br>
                    <span style="color:#fff; font-weight:bold;">${dest}</span>
                </div>
            </div>
        `;
        box.style.display = 'block';
        if (navigator.vibrate) navigator.vibrate(isLong ? [200, 100, 200] : [500, 100, 500]);
    }
}
