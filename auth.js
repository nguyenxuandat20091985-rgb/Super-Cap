// Quản lý đăng ký và đăng nhập tài khoản
const SuperCapAuth = {
    // Hàm đăng ký tài khoản mới
    register: function(phone, name, licensePlate) {
        const userId = 'SC-' + Math.random().toString(36).substr(2, 6).toUpperCase();
        const userData = {
            id: userId,
            phone: phone,
            name: name,
            licensePlate: licensePlate,
            vipLevel: 0, // Mặc định là khách thường
            joinDate: new Date().toISOString(),
            status: "active"
        };
        
        // Lưu vào máy người dùng
        localStorage.setItem('sc_user', JSON.stringify(userData));
        console.log("Đăng ký thành công ID: " + userId);
        return userData;
    },

    // Kiểm tra xem đã đăng nhập chưa
    checkAuth: function() {
        const user = localStorage.getItem('sc_user');
        return user ? JSON.parse(user) : null;
    }
};
