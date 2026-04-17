import requests
import pandas as pd
import time

# CẤU HÌNH HỆ THỐNG SUPER-CAP
# Link CSV đã được em chuyển đổi từ link của anh
SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/1xVAHAoMw-m9eiMpCjN8tdBw2WL1ZK9aXw1JE_qkHUh8/export?format=csv"
FIREBASE_URL = "https://super-cap-anh-hai-default-rtdb.asia-southeast1.firebasedatabase.app/real_guests.json"

def run_super_cap_radar():
    print("🚀 Super-Cap Radar đang quét dữ liệu khách hàng...")
    try:
        # 1. Đọc dữ liệu từ Google Sheet của anh
        df = pd.read_csv(SHEET_CSV_URL)
        
        if df.empty:
            print("📭 Chưa có khách mới trong danh sách.")
            return

        # 2. Lấy thông tin khách hàng mới nhất (dòng cuối cùng)
        last_guest = df.iloc[-1]
        phone = str(last_guest['Phone'])
        destination = str(last_guest['Destination'])

        # 3. Kiểm tra và đẩy lên Firebase để nổ cuốc trên App tài xế
        guest_data = {
            "phone": phone,
            "dest": destination,
            "source": "AUTO_RADAR_GSHEET",
            "timestamp": int(time.time() * 1000)
        }
        
        response = requests.post(FIREBASE_URL, json=guest_data)
        
        if response.status_code == 200:
            print(f"✅ Đã nổ cuốc thành công: {phone} đi {destination}")
        else:
            print("❌ Lỗi kết nối hệ thống.")
            
    except Exception as e:
        print(f"⚠️ Đang đợi dữ liệu mới từ Sheet... (Chi tiết: {e})")

if __name__ == "__main__":
    run_super_cap_radar()
