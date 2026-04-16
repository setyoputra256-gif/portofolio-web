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
    // Validasi sederhana: pastikan rating sudah diisi
    if (data.layanan === 0 || data.produk === 0 || data.kecepatan === 0) {
        alert("Mohon berikan semua penilaian sebelum mengirim.");
        return;
    }

    let fd = new FormData();
    fd.append("nama", nama.value);
    fd.append("rekening", rekening.value);
    fd.append("layanan", data.layanan);
    fd.append("produk", data.produk);
    fd.append("kecepatan", data.kecepatan);

    fetch("simpan_penilaian.php", {
      method: "POST",
      body: fd
    })
    .then(res => res.text())
    .then(hasil => {
      if (hasil.trim() === "sukses") {
        // Pindah ke Step 3 (Terima Kasih)
        step = 2; 
        show();
      } else {
        alert("Gagal menyimpan: " + hasil);
      }
    })
    .catch(err => {
      console.error(err);
      alert("Terjadi kesalahan koneksi.");
    });
  };

  window.resetKeStepSatu = function() {
        step = 0; // Reset index ke awal
        data = { layanan: 0, produk: 0, kecepatan: 0 }; // Reset data penilaian

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

  /* =====================
     GRID KECEPATAN
  ===================== */
  function grid(id, key, max) {
    const g = document.getElementById(id);
    if (!g) return; // Jika elemen tidak ada, jangan jalankan appendChild
    g.innerHTML = "";
    for (let i = 1; i <= max; i++) {
      let d = document.createElement('div');
      d.className = 'num';
      d.innerText = i;
      d.onclick = () => {
        g.querySelectorAll('.num')
          .forEach(x => x.classList.remove('active'));
        d.classList.add('active');
        data[key] = i;
      };
      g.appendChild(d);
    }
  }
 
    grid('produk', 'produk', 10);
    grid('kecepatan', 'kecepatan', 10);

document.querySelectorAll('#layanan .emoji').forEach(e => {
        e.onclick = () => {
            document.querySelectorAll('#layanan .emoji').forEach(x => x.classList.remove('active'));
            e.classList.add('active');
            data.layanan = Number(e.dataset.v);
        };
    });


  

  /* =====================
     NPS 0–10
  ===================== */
  const npsContainer = document.getElementById("nps");
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
    };

    npsContainer.appendChild(btn);
  }

  document.getElementById('btnKembali').addEventListener('click', function() {
    // Arahkan ke halaman pertama penilaian
    window.location.href = 'index.html'; 
});

  /* =====================
     SUBMIT FORM
  ===================== */
  window.submitForm = function () {

    alert("SUBMIT DIKLIK"); // 🔥 SEKARANG PASTI MUNCUL

    let fd = new FormData();
    fd.append("nama", nama.value);
    fd.append("rekening", rekening.value);
    fd.append("layanan", data.layanan);
    fd.append("produk", data.produk);
    fd.append("kecepatan", data.kecepatan);
    
    fetch("simpan_penilaian.php", {
      method: "POST",
      body: fd
    })
    .then(res => res.text())
    .then(res => alert(res))
    .catch(err => alert("FETCH ERROR"));
  };

});

function kembaliKeAwal() {
  step = 0;
  data = { layanan: 0, produk: 0, kecepatan: 0 };

  document.querySelectorAll('.emoji, .num')
    .forEach(el => el.classList.remove('active'));

  document.querySelectorAll('input')
    .forEach(i => i.value = '');

  show();
}


function resetKeStepSatu() {
  showStep(0);
    // 1. Reset nomor step aktif
    currentStep = 1; 

    // 2. Tampilkan Step 1, Sembunyikan yang lain
    const contents = document.querySelectorAll('.step-content');
    const steps = document.querySelectorAll('.step');
    
    contents.forEach(c => c.classList.remove('active'));
    steps.forEach(s => s.classList.remove('active'));
    
    contents[0].classList.add('active');
    steps[0].classList.add('active');

    // 3. Reset Data Object agar penilaian sebelumnya hilang
    data = { nama: "", rekening: "", layanan: 0, produk: 0, kecepatan: 0 };
    
    // 4. Bersihkan tampilan visual yang terpilih (Emoji & Grid)
    document.querySelectorAll('.active').forEach(el => {
        if(!el.classList.contains('step-content') && !el.classList.contains('step')) {
            el.classList.remove('active');
        }
    });

    // 5. Kosongkan Input Form
    document.getElementById('nama').value = "";
    document.getElementById('rekening').value = "";
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
