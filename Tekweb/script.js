document.addEventListener('DOMContentLoaded', function () {
    const navItems = document.querySelectorAll('.nav-item');

    navItems.forEach(item => {
        item.addEventListener('click', function () {
            // Hapus kelas aktif dari semua item navigasi
            navItems.forEach(navItem => navItem.classList.remove('active'));

            // Tambahkan kelas aktif pada item yang sedang diklik
            item.classList.add('active');

            // Jika item yang diklik adalah "Keranjang", tambahkan kelas aktif ke sana juga
            if (item.id === 'cart') {
                document.getElementById('cart').classList.add('active');
            } else {
                // Jika bukan item "Keranjang", pastikan kelas "active" dihapus dari "Keranjang"
                document.getElementById('cart').classList.remove('active');
            }
        });
    });

    // Menambahkan event listener ke semua tombol "Tambahkan ke Keranjang"
    var addToCartButtons = document.querySelectorAll(".add-to-cart");
    addToCartButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            addToCart(button.parentElement);
        });
    });

    // Menangani klik tombol "Checkout"
    var checkoutButton = document.getElementById("checkout");
    checkoutButton.addEventListener("click", checkout);

    // ... (Bagian lain yang sudah ada)

    // Fungsi untuk menangani klik tombol "Tambahkan ke Keranjang"
    function addToCart(menuItem) {
        var itemId = menuItem.getAttribute("data-id");
        var itemName = menuItem.getAttribute("data-name");
        var itemPrice = menuItem.getAttribute("data-price");

        // Memuat keranjang dari localStorage
        var cartData = localStorage.getItem("cartData");
        var cartItems = cartData ? JSON.parse(cartData) : [];

        // Mengecek apakah item sudah ada di keranjang
        var existingItem = cartItems.find(item => item.id === itemId);

        if (existingItem) {
            // Jika item sudah ada, update quantity dan harga
            existingItem.quantity++;
            existingItem.totalPrice = existingItem.quantity * itemPrice;
        } else {
            // Jika item belum ada, tambahkan item baru
            cartItems.push({
                id: itemId,
                name: itemName,
                price: itemPrice,
                quantity: 1,
                totalPrice: itemPrice
            });
        }

        // Simpan data keranjang ke localStorage
        localStorage.setItem("cartData", JSON.stringify(cartItems));

        // Memuat kembali keranjang
        loadCartFromStorage();

        // Update jumlah pesanan di navbar
        updateCartCount();
    }

    // Fungsi untuk memuat keranjang dari localStorage saat halaman dimuat
    function loadCartFromStorage() {
        // ... (Bagian lain yang sudah ada)

        // Update jumlah pesanan di navbar
        updateCartCount();
    }

    // Fungsi untuk mengupdate jumlah pesanan di navbar
    function updateCartCount() {
        var cartCountElement = document.getElementById("cart-count");
        if (cartCountElement) {
            var cartData = localStorage.getItem("cartData");
            var cartItems = cartData ? JSON.parse(cartData) : [];

            // Menghitung total quantity dari semua item di keranjang
            var totalQuantity = cartItems.reduce(function (acc, item) {
                return acc + item.quantity;
            }, 0);

            // Mengupdate teks pada elemen navbar
            cartCountElement.textContent = "Keranjang (" + totalQuantity + ")";
        }
    }
    

    // ... (Bagian lain yang sudah ada)
});
