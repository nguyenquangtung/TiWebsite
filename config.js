/**
 * ╔══════════════════════════════════════════════════════════╗
 * ║           CONFIG – CHỈNH SỬA MỌI THÔNG TIN Ở ĐÂY        ║
 * ╚══════════════════════════════════════════════════════════╝
 *
 * Sau khi sửa file này, tất cả nội dung trên website
 * sẽ tự động cập nhật – không cần chỉnh sửa index.html.
 */

const SITE_CONFIG = {

  /* ── THÔNG TIN DOANH NGHIỆP ─────────────────────────── */
  business: {
    name:       'Cơ Khí HAI TRUNG',
    tagline:    'Dịch vụ Sửa Cửa Nhanh tại nhà TP.HCM',
    slogan:     'Uy tín – Nhanh chóng – Bảo hành đầy đủ',
    description:'Dịch vụ sửa cửa sắt, cửa kéo, cửa nhôm tại nhà. Có mặt sau 30 phút. Báo giá rõ ràng. Bảo hành đầy đủ.',
    address:    'TP. Hồ Chí Minh, Việt Nam',
    city:       'TP. Hồ Chí Minh',
    country:    'VN',
    founded:    '2020',
    responseTime: '30 phút',
  },

  /* ── LIÊN HỆ ─────────────────────────────────────────── */
  contact: {
    phone:       '0903614273',          // SĐT không có khoảng trắng (dùng cho href)
    phoneDisplay:'0903 614 273',        // SĐT hiển thị
    zalo:        'https://zalo.me/0903614273',
    facebook:    'https://www.facebook.com/profile.php?id=61588263221347',   // ← ĐỔI link fanpage thật
    tiktok:      'https://www.tiktok.com/@sa.ca.30p.c.mt',     // ← ĐỔI link TikTok thật
    fbName:      '@SuaCuaNhanh.CoKhiHaiTrung.HCM',    // Tên hiển thị fanpage
    ttName:      '@suacuanhanh.CoKhiHaiTrung.HCM',        // Tên hiển thị TikTok
    workingHours:'24/7 – Kể cả ngày lễ & cuối tuần',
  },

  /* ── SEO / META ──────────────────────────────────────── */
  seo: {
    title:       'Cơ Khí Hai Trung - Sửa Cửa Sắt – Cửa Kéo – Cửa Nhôm Tại Nhà | 0903614273',
    description: 'Dịch vụ sửa cửa sắt, cửa kéo, cửa nhôm tại nhà TP.HCM. Có mặt sau 30 phút. Báo giá minh bạch. Bảo hành tận nơi. Gọi: 0903 614 273',
    keywords:    'sửa cửa sắt tại nhà, sửa cửa kéo, sửa cửa nhôm, thợ sửa cửa HCM, sửa cửa 24/7',
    ogImage:     'images/og-image.jpg',  // Ảnh preview khi share lên MXH (1200x630px)
    canonical:   '',                     // ← ĐỔI thành domain thật vd: https://suacuanhanh.vn
  },

  /* ── THỐNG KÊ (Stats section) ─────────────────────────── */
  stats: [
    { value: 1000, suffix: '+', label: 'Khách hàng hài lòng' },
    { value: 30,  suffix: "'", label: 'Có mặt tại nhà bạn' },
    { value: 5,   suffix: '+', label: 'Năm kinh nghiệm' },
    { value: 24,  suffix: '/7',label: 'Sẵn sàng phục vụ' },
  ],

  /* ── KHU VỰC PHỤC VỤ (Map section) ───────────────────── */
  serviceAreas: [
    'Quận 1,2,3,4 5,6,7,8,9,10',
    'Quận Bình Thạnh, Gò Vấp',
    'Quận Tân Bình, Tân Phú',
    'Quận 12, Thủ Đức',
    'Quận Bình Tân, Phú Nhuận',
    'Bình Dương, Đồng Nai (phụ phí xa)',
  ],
  /* ── KHUYẾN MÃI ──────────────────────────────────────── */
  promo: {
    enabled:     true,
    badge:       '🎉 KHUYẾN MÃI ĐẶC BIỆT',
    title:       'Giảm Ngay 10% Cho Lần Sửa Đầu Tiên!',
    subtitle:    'Áp dụng khi gọi điện hoặc nhắn tin Zalo – Nhắc mã khi liên hệ',
    discount:    '10%',
    code:        'TÙNG',
    note:        '* Áp dụng cho dịch vụ sửa cửa tại nhà. Không áp dụng cùng ưu đãi khác.',
    // Đếm ngược đến ngày nào — định dạng: 'YYYY-MM-DDTHH:mm:ss'
    deadline:    '2026-05-30T23:59:59',
    perks: [
      { icon: 'fa-tag',           text: 'Giảm 10% tổng hóa đơn' },
      { icon: 'fa-truck-fast',    text: 'Miễn phí đến xem & kiểm tra' },
      { icon: 'fa-shield-halved', text: 'Bảo hành 6 tháng tặng thêm' },
      { icon: 'fa-star',          text: 'Ưu tiên lịch thợ buổi sáng' },
    ],
  },

  /* ── NĂM FOOTER ──────────────────────────────────────── */
  footerYear: '2026',

};

/* Xuất ra global để script.js dùng */
window.SITE_CONFIG = SITE_CONFIG;
