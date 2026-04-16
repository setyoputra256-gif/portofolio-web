<?php
include "koneksi.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Ambil data dan amankan
    $nama      = mysqli_real_escape_string($conn, $_POST['nama']);
    $rekening  = mysqli_real_escape_string($conn, $_POST['rekening']);
    $layanan   = mysqli_real_escape_string($conn, $_POST['layanan']);
    $saran    = mysqli_real_escape_string($conn, $_POST['saran']);
    

    // Query (Gunakan tanda kutip yang benar)
    $sql = "INSERT INTO penilaian (nama, rekening, layanan, saran) 
            VALUES ('$nama', '$rekening', '$layanan', '$saran')";

    if (mysqli_query($conn, $sql)) {
        echo "sukses"; 
    } else {
        echo "error: " . mysqli_error($conn);
    }
}
mysqli_close($conn);
?>
