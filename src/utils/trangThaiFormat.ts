export function formatTrangThai(trangThai: number): string {
    switch (trangThai) {
        case 0:
            return "Đã hủy";
        case 1:
            return "Đang hoạt động";
        default:
            return "---";
    }
}

export function formatTrangThaiGiaoHang(trangThai: number): string {
    switch (trangThai) {
        case 0:
            return "Chờ duyệt";
        case 1:
            return "Đang chuẩn bị";
        case 2:
            return "Đang giao";
        case 3:
            return "Giao thành công";
        case 4:
            return "Giao thất bại";
        default:
            return "---";
    }
}

export function formatTrangThaiThanhToan(trangThai: number): string {
    switch (trangThai) {
        case 0:
            return "Chưa thanh toán";
        case 1:
            return "Đã thanh toán";
        default:
            return "---";
    }
}
