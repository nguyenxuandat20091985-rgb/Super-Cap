const VIP_SYSTEM = {
    BANK: {
        NAME: "BIDV",
        STK: "4430269669",
        OWNER: "NGUYEN XUAN DAT"
    },
    LEVELS: {
        VIP1: { name: "VIP 1 - CƠ BẢN", price: 50000, duration: 30, feature: "Xem bản đồ nhiệt" },
        VIP2: { name: "VIP 2 - CHUYÊN NGHIỆP", price: 150000, duration: 30, feature: "Ưu tiên nổ cuốc sớm 15s" },
        VIP3: { name: "VIP 3 - ĐỘC QUYỀN", price: 300000, duration: 30, feature: "AI săn khách cao cấp & lọc cuốc Sân Bay" }
    },
    
    generateQR: function(vipKey, userId) {
        const plan = this.LEVELS[vipKey];
        const content = `NAP_${vipKey}_${userId}`;
        return `https://img.vietqr.io/image/${this.BANK.NAME}/${this.BANK.STK}-compact2.jpg?amount=${plan.price}&addInfo=${content}&accountName=${this.BANK.OWNER}`;
    }
};
