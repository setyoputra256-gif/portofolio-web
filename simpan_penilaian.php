<?php
include "koneksi.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Ambil data dan amankan
    $nama      = mysqli_real_escape_string($conn, $_POST['nama']);
    $rekening  = mysqli_real_escape_string($conn, $_POST['rekening']);
    $layanan   = mysqli_real_escape_string($conn, $_POST['layanan']);
    $produk    = mysqli_real_escape_string($conn, $_POST['produk']);
    $kecepatan = mysqli_real_escape_string($conn, $_POST['kecepatan']);

    // Query (Gunakan tanda kutip yang benar)
    $sql = "INSERT INTO penilaian (nama, rekening, layanan, produk, kecepatan) 
            VALUES ('$nama', '$rekening', '$layanan', '$produk', '$kecepatan')";

    if (mysqli_query($conn, $sql)) {
        echo "sukses"; 
    } else {
        echo "Error: " . mysqli_error($conn);
    }
}
mysqli_close($conn);
?>
