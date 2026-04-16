let step = 0;
let data = {
    layanan: 0,
    kecepatan: 0
  };
document.addEventListener("DOMContentLoaded", function () {

  /* =====================
     GLOBAL STATE
  ===================== */
  
  let selectedNPS = 0;

  const nama = document.getElementById("nama");
  const rekening = document.getElementById("rekening");


  /* =====================
     STEP NAVIGATION
  ===================== */
  const contents = document.querySelectorAll('.step-content');
  const steps = document.querySelectorAll('.step');

  window.show = function() {
        contents.forEach(c => c.classList.remove('active'));
        steps.forEach(s => s.classList.remove('active'));
        
        if (contents[step]) {
            contents[step].classList.add('active');
            // Menyalakan indikator angka 1 sampai step tujuan
            for (let i = 0; i <= step; i++) {
                if(steps[i]) steps[i].classList.add('active');
            }
        }
    };

  window.next = function () {
    if (step === 0 && (!nama.value || !rekening.value)) {
      alert('Lengkapi data nasabah terlebih dahulu');
      return;
    }
    step++;
    show();
  };

  window.prev = function () {
    step--;
    show();
  };

 
window.kirimData = function () {
    const elSaran = document.getElementById("saran");
    const teksSaran = elSaran ? elSaran.value : ""; // Ambil nilai di sini

    let fd = new FormData();
    fd.append("nama", document.getElementById("nama")?.value || "");
    fd.append("rekening", document.getElementById("rekening")?.value || "");
    fd.append("layanan", data.layanan || 0);
    fd.append("saran", teksSaran); // Kirim ke PHP

    fetch("simpan_penilaian.php", {
        method: "POST",
        body: fd
    })
    .then(res => res.text())
    .then(hasil => {
        if (hasil.trim() === "sukses") {
            step = 2;
            show();
        } else {
            alert("Gagal: " + hasil);
        }
    });
};


  window.resetKeStepSatu = function() {
        step = 0; // Reset index ke awal
        data = { layanan: 0, saran: 0 }; // Reset data penilaian

        // Kosongkan Input
        if(nama) nama.value = "";
        if(rekening) rekening.value = "";

        // Bersihkan semua class active dari emoji & grid angka
        document.querySelectorAll('.emoji, .num, .nps-btn').forEach(el => {
            el.classList.remove('active');
        });

        show();
        console.log("Sistem di-reset ke awal");
    };


  /* =====================
     EMOJI LAYANAN
  ===================== */
  document.querySelectorAll('#layanan .emoji').forEach(e => {
    e.onclick = () => {
      document.querySelectorAll('#layanan .emoji')
        .forEach(x => x.classList.remove('active'));
      e.classList.add('active');
      data.layanan = Number(e.dataset.v);
    };
  });

  
document.querySelectorAll('#layanan .emoji').forEach(e => {
        e.onclick = () => {
            document.querySelectorAll('#layanan .emoji').forEach(x => x.classList.remove('active'));
            e.classList.add('active');
            data.layanan = Number(e.dataset.v);
        };
    });


    // Mengambil semua elemen emoji
const emojis = document.querySelectorAll('.emoji');
const ratingInput = document.getElementById('selected-rating');

emojis.forEach(emoji => {
  emoji.addEventListener('click', () => {
    // 1. Hapus class 'selected' dari semua emoji
    emojis.forEach(e => e.classList.remove('selected'));
    
    // 2. Tambahkan class 'selected' pada yang diklik
    emoji.classList.add('selected');
    
    // 3. Simpan nilainya ke dalam input hidden
    const val = emoji.getAttribute('data-value');
    ratingInput.value = val;
    
    console.log("Rating yang dipilih:", val);
  });
});


  

  /* =====================
   NPS 0–10
===================== */
const npsContainer = document.getElementById("nps");

// Tambahkan validasi ini agar tidak error 'null'
if (npsContainer) {
    for (let i = 0; i <= 10; i++) {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.textContent = i;
        btn.className = "nps-btn";

        btn.onclick = () => {
            selectedNPS = i;
            document.querySelectorAll(".nps-btn")
                .forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            
            // Masukkan ke objek data jika perlu
            data.nps = i; 
        };

        npsContainer.appendChild(btn);
    }
} else {
    console.warn("Elemen dengan id='nps' tidak ditemukan di HTML.");
}

  document.getElementById('btnKembali').addEventListener('click', function() {
    // Arahkan ke halaman pertama penilaian
    window.location.href = 'index.html'; 
});

});

function kembaliKeAwal() {
    // 1. Reset data di memori
    step = 0;
    data = { layanan: 0, produk: 0, kecepatan: 0 };

    // 2. Hapus status visual emoji (menghilangkan highlight/warna)
    document.querySelectorAll('.emoji, .num')
        .forEach(el => el.classList.remove('active', 'selected'));

    // 3. Reset semua Input (Nama, Rekening, dll)
    document.querySelectorAll('input')
        .forEach(i => i.value = '');

    // 4. Reset Textarea (Khusus untuk bagian Saran/Masukan)
    const elSaran = document.getElementById("saran");
    if (elSaran) {
        elSaran.value = '';
    }

    // 5. Update tampilan UI
    show();
}



function showStep(index) {
  currentStep = 0;
    const contents = document.querySelectorAll('.step-content');
    const steps = document.querySelectorAll('.step');

    // Validasi agar index tidak keluar batas
    if (index >= 0 && index < contents.length) {
        contents.forEach(c => c.classList.remove('active'));
        steps.forEach(s => s.classList.remove('active'));

        contents[index].classList.add('active');
        steps[index].classList.add('active');
        currentStep = index;
    }
}

function next() {
    showStep(currentStep + 1);
}

function prev() {
    showStep(currentStep - 1);
}


const saranInput = document.getElementById("saran");
const charCount = document.getElementById("charCount");


if (saranInput && charCount) {
    saranInput.addEventListener("input", () => {
        const length = saranInput.value.length;
        charCount.textContent = `${length} / 250`;

        if (length > 200) {
            charCount.style.color = "#dc2626"; // merah
        } else {
            charCount.style.color = "#64748b";
        }
    });
} else {
    console.warn("Elemen saran atau charCount tidak ditemukan di halaman ini.");
}


