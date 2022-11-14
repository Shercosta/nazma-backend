const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const _ = require('lodash');
// const localtunnel = require('localtunnel');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

app.set('view engine', 'ejs');

app.get("/", function (req, res) {
    res.render("home", { cssEjs: "styles" });
});

const events = [
    {
        eventTitle: "Event Title goes here",
        eventAddress: "Event will be held on this",
        eventTime: "at 8 AM to 10 PM",
        eventMonth: "Jul",
        eventDate: 11,
        eventImage: "https://img.freepik.com/free-vector/music-event-poster-template-with-abstract-shapes_1361-1316.jpg?w=2000",
        eventDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi et mi justo. Pellentesque sit amet rhoncus libero, sed volutpat dui. Nullam viverra convallis congue. Vivamus accumsan semper eros, eu efficitur nunc iaculis a. Curabitur accumsan eget nunc quis dapibus. Nullam gravida ultricies dolor, in tincidunt lorem condimentum vitae. Vestibulum non aliquet lacus, feugiat ullamcorper urna. In ut mauris ornare, porttitor mi sit amet, maximus massa. Quisque porta efficitur libero in scelerisque. Sed sodales vel lorem sed aliquet. Maecenas id neque auctor, consequat magna nec, dignissim risus. Sed pulvinar scelerisque neque, non ornare massa tincidunt iaculis.",
        regis: "https://www.eventbrite.com/d/indonesia--jakarta-pusat/events/"
    },
];

const admins = [
    {
        email: "nazmaoffice007@gmail.com",
        password: "AlmightyGods"
    },
    {
        email: "punchsupersaga@gmail.com",
        password: "grr707"
    }
]

const article = [
    {
        title: "Jenderal Bintang 3 Ancam Mundur di Kasus Ferdy Sambo, Kapolri: Kami Kompak",
        image: "https://statik.tempo.co/data/2022/08/24/id_1135418/1135418_720.jpg",
        content: "Kapolri Jenderal Listyo Sigit Prabowo enggan mengungkap siapa jenderal bintang tiga yang mengancam mundur jika Ferdy Sambo tidak ditetapkan tersangka. Isu tersebut sempat mencuat dari ucapan Menteri Koordinator Politik, Hukum dan Keamanan, Mahfud Md. \n \“Saya enggak bisa jawab karena yang jelaskan bukan saya. Tetapi yang jelas kita kompak semuanya,\” kata Kapolri setelah rapat dengar pendapat dengan Komisi III DPR di gedung DPR/MPR RI di Senayan, Jakarta Selatan, 24 Agustus 2022. \nMasalah soal jenderal bintang tiga yang mengancam mengundurkan diri itu muncul dalam rapat dengar pendapat antara Komisi III dengan Komisi Kepolisian Nasional, Komisi Nasional Hak Asasi Manusia Senin kemarin, 22 Agustus lalu. \nDalam rapat itu, Anggota Komisi III dari Fraksi Partai Demokrat Benny K Harman mendesak Mahfud untuk mengungkap siapa jenderal yang sempat dia sebut di media sosial dan dalam wawancara. \"Yang perlu Pak Menko ungkap kalau saya sebut aja Pak siapa jenderal yang mau mengundurkan diri, supaya jangan ada gelap-gelap,\" kata Anggota Komisi III DPR Benny K. Harman dalam RDP di Ruang Rapat Komisi III DPR, Kompleks Parlemen Senayan, Jakarta, Senin, 22 Agustus lalu."
    },
    {
        title: "Sstt.. Ada Tanda-tanda Tarif Ojol Batal Naik Nih",
        image: "https://akcdn.detik.net.id/visual/2020/06/08/ojek-online-cnbc-indonesiaandrean-kristianto-5_169.jpeg?w=715&q=90",
        content: "Kementerian Perhubungan masih akan berbicara kembali dengan operator transportasi ride sharing ojek online terkait kenaikan tarif. Namun Menteri Perhubungan Budi Karya Sumadi belum mendapat memastikan tarif ini akan naik pada tanggal 29 Agustus mendatang." +
            "\"Kan sampai tanggal 29, saya tugaskan pak Dirjen Darat, Mbak Adita (Jubir Kementerian Perhubungan) bertemu dengan semua stakeholder, termasuk masyarakat yang bisa menjadi basis apa yang kita dengarkan. aspirasi masyarakat seperti apa, seperti itu lah hasilnya, Insya Allah tanggal 29 mbak Adita akan rilis, katanya kepada Wartawan, di Kompleks Parlemen, Rabu (24/6/2022)." +
            "\"Karena kita gak mau gegabah waktu pada masyarakat ini harus kita lakukan mendengar semua pihak dengan baik,\" tambahnya, saat ditanya apakah tarif ojol belum tentu naik 29 Agustus nanti." +
            "Saat menjawab pertanyaan Anggota DPR RI Komisi V Cen Sui Lan, juga dia belum bisa memastikan mengenai kenaikan tarif Ojol ini." +
            "" +
            "\"Masih 4 hari lagi, kita diskusi dengan operator beserta masyarakat. kita lagi riset. tanggal 29 saya akan kirim surat ke bu Chen,\" katanya." +
            "" +
            "Dalam rapat Cen Sui Lan meminta Kementerian Perhubungan melihat kesanggupan masyarakat untuk biaya transportasi." +
            "" +
            "\"Saat ini semua naik, termasuk tiket pesawat dan lain lain, jadi tolong pikirkan kembali ini harus apakah harus dinaikkan tanggal 29 ini?,\" katanya." +
            "Sebelumnya penerapan kenaikan tarif ojol ini mundur menjadi 29 Agustus 2022 dari 14 Agustus 2022. Aturan ini tertuang dalam Keputusan Menteri Perhubungan (KM) Nomor 564 Tahun 2022 tentang Pedoman Perhitungan Biaya Jasa Penggunaan Sepeda Motor yang Digunakan Untuk Kepentingan Masyarakat." +
            "" +
            "Hal ini disebabkan untuk penyesuaian dari aplikator dan menambah masa sosialisasi."
    },
    {
        title: "Jokowi Bawa Ratusan Triliun dari 3 Negara, Ini Kelanjutannya!",
        image: "https://akcdn.detik.net.id/visual/2022/08/24/keterangan-pers-hasil-rapat-terbatas-kantor-presiden-24-agustus-2022-tangkapan-layar-youtube_169.png?w=715&q=90",
        content: "Airlangga Hartarto, Menteri Koordinator Bidang Perekonomian Indonesia dan Bahlil Lahadalia, Menteri Investasi Indonesia memberikan pernyataan usai melakukan Rapat Terbatas (Ratas) Kamis (24/8/2022). Airlangga mengungkapkan kelanjutan investasi dari kunjungan Presiden Joko Widodo (Jokowi) ke Korea Selatan, Jepang, dan China." +
            "\"Dari Jepang, laporan Investasi Mitsubishi berkomitmen Rp 10 triliun untuk ekspander EV. Toyota Grup dengan investasi Rp 27,1 triliun untuk 2022-2026 kemudian beberapa investasi lagi, Glico dan sektor ritel,\" ungkap Airlangga, dikutip dari Youtube Sekretaris Presiden, Kamis (24/8/2022). Sementara untuk investasi Negeri Ginseng, Bahlil memastikan jika investasi sebesar Rp 100 triliun tengah berjalan dengan target groun breaking akhir tahun ini atau awal tahun depan." +
            "" +
            "\"Total US$ 6,7 miliar sebesar US$ 3,5 miliar merupakan kerja sama antara Posco dengan Krakatau Steel untuk pengembangan investasi baja untuk mobil baterai, semua perizinan dan insentif sudah clear,\" tegas Bahlil." +
            "" +
            "Kedua, Bahlil melanjutkan untuk pembangunan pabrik sepatu di Sragen menyerap pekerjaan 30 ribu orang juga dalam proses. Menurutnya, hal yang lain soal Korea, dalam diskusi dengan investor Korea adalah minat LG untuk masuk ke Ibu Kota Negara (IKN)." +
            "" +
            "\"Termasuk LG, sudah difasilitasi saat bertemu di Korea, Presiden arahkan percepatan,\" ungkap Bahlil." +
            "Di Korea, LG dalam ekosistem baterai mobil semua masih dalam jadwal dan kerja, realisasi sebagian sudah jalan." +
            "" +
            "Bahlil juga menambahkan soal investasi Jepang yaitu Sojic yang ingin membangun pabrik metanol di Papua Barat. Menurutnya, pabrik metanol akan dibangun di Bintuni dan pabrik pupuk di Fakfak." +
            "" +
            "Terakhir dari China, Presiden melakukan bilateral beberapa hal penambahan ekspor CPO dan diarahkan percepatan kawasan industri di Kalimantan Utara dengan progres saat ini yaitu perizinan yang telah selesai dan infrastruktur yang mulai dikerjakan." +
            "" +
            "Indonesia - Presiden Joko Widodo (Jokowi) telah menyelesaikan rangkaian kunjungan kerjanya ke tiga negara di kawasan Asia Timur. Ketiga negara tersebut yakni China, Jepang, dan Korea Selatan." +
            "Kunjungan kerja Jokowi ke China, Jepang dan Korea Selatan membawa misi untuk memperkuat kerja sama di bidang ekonomi, baik itu perdagangan dan investasi. Hal ini dilakukan di tengah situasi dunia yang kian tidak pasti." +
            "" +
            "Dalam kunjungan ke tiga negara tersebut, Jokowi memang sempat melakukan pertemuan dengan investor kelas kakap dari Jepang dan Korea Selatan. Jokowi berhasil meraih kesepakatan investasi dengan total nilai yang diperkirakan lebih dari Rp 185 triliun."
    },
    {
        title: "Hari Kemerdekaan, Zelensky: Ukraina \"Dilahirkan Kembali\"",
        image: "https://akcdn.detik.net.id/visual/2022/04/14/presiden-ukraina-volodymyr-zelensky-11_169.jpeg?w=715&q=90",
        content: "Serangan Rusia ke Ukraina telah genap 6 bulan dan bertepatan dengan hari kemerdekaan negara bekas Uni Soviet tersebut." +
            "Menandai ulang tahun ke-31 Ukraina, Presiden Volodymyr Zelensky menyatakan bahkan Ukraina \"dilahirkan kembali\" ketika Rusia menyerang enam bulan lalu. Dalam pidatonya tersebut, dia pun bersumpah untuk mengusir pasukan Moskow sepenuhnya." +
            "" +
            "Adapun peringatan hari kemerdekaan tersebut berada di bawah bayang-bayang gempuran Rusia melalui ancaman serangan rudal ke kota-kota besar di Ukraina. Kota terbesar kedua Kharkiv berada di bawah jam malam setelah berbulan-bulan dibombardir." +
            "\"Sebuah bangsa baru muncul di dunia pada 24 Februari pukul 4 pagi. Ia tidak dilahirkan, tetapi dilahirkan kembali. Sebuah bangsa yang tidak menangis, menjerit atau ketakutan. Bangsa yang tidak melarikan diri, tidak menyerah, dan tidak lupa,\" kata Zelensky dalam pidatonya, dikutip Reuters, Rabu (24/8/2022)." +
            "" +
            "Pemimpin berusia 44 tahun itu berbicara di depan monumen utama kemerdekaan Kyiv dengan seragam tempur khasnya, bersumpah untuk merebut kembali wilayah yang diduduki di Ukraina Timur serta Semenanjung Krimea, yang dicaplok Rusia pada 2014." +
            "" +
            "\"Kami tidak akan duduk di meja perundingan karena takut, dengan pistol ditodongkan ke kepala kami. Bagi kami, besi yang paling mengerikan bukanlah rudal, pesawat, dan tank, tetapi belenggu. Bukan parit, tetapi belenggu,\" tegasnya." +
            "" +
            "Dia dan istrinya kemudian menghadiri kebaktian di katedral St. Sophia di Kyiv bersama dengan para pemimpin agama dari semua agama utama Ukraina." +
            "Di sisi lain, Rusia telah membuat beberapa kemajuan di Ukraina dalam beberapa bulan terakhir, setelah pasukannya didorong mundur dari Kyiv pada minggu-minggu awal perang. Tentara Ukraina di garis depan di timur mengatakan mereka lebih termotivasi daripada musuh mereka." +
            "" +
            "\"Semua rakyat kami bersorak untuk kami. Seluruh negara, dan negara-negara lain yang membantu kami juga. Semangat juang kami lebih besar dari mereka,\" kata seorang tentara bernama Yevhen kepada Reuters." +
            "" +
            "Menteri Pertahanan Rusia Sergei Shoigu mengatakan pada pertemuan para menteri pertahanan di Uzbekistan bahwa Rusia sengaja memperlambat apa yang disebutnya sebagai \"operasi militer khusus\" di Ukraina untuk menghindari korban sipil." +
            ""
    }
];

const gallery = [
    {
        url: "https://i.imgur.com/SHNsKlJ.jpeg",
        caption: "Old girl hoping for a little extra dinner."
    },
    {
        url: "https://i.imgur.com/c4xpl6l.jpeg",
        caption: "Space Illustration."
    },
    {
        url: "https://i.imgur.com/rcRGCEj.jpeg",
        caption: "From my first 2 troops as a 501st member… For the Empire!"
    },
    {
        url: "https://i.imgur.com/torx7t8.jpeg",
        caption: "Celestials 12 months illustrated"
    },
    {
        url: "https://i.imgur.com/6PM3UYZ.jpeg",
        caption: "Elizabeth from Bioshock cosplay by me k_o_n_a"
    },
    {
        url: "https://i.imgur.com/xEGuV77.jpeg",
        caption: "My first photoshoot in a long time, very nice to dust the cobwebs off in conditions like this!"
    }
];

let authorized = false; //////////////////////////////////////////////////////////////  AUTHORIZATION
let changeIndex = -1;/////////////////////////////////////////////////////////////////////  INDEX PARAMETER FOR UPDATE


/////////////////////////////////////////////////////////////////////////////////////   BLOG


app.get("/blog", (req, res) => {
    res.render("blog", { cssEjs: "blog", articlesEjs: article });
});

app.get("/blog-create", (req, res) => {
    if (!authorized) {
        res.redirect("/not-authorized");
    }
    if (authorized) {
        res.render("admin/blog-create");
    }
});

app.post("/blog-create", (req, res) => {
    const newpost = {
        title: req.body.createBlogTitle,
        image: req.body.createBlogImage,
        content: req.body.createBlogContent
    }
    article.unshift(newpost);
    res.redirect("admin/home")
});

app.get("/read/:blogParams", (req, res) => {
    const requestedPost = req.params.blogParams;

    article.forEach((news) => {
        if (requestedPost === news.title) {
            res.render("read", { cssEjs: "read", blogTitle: news.title, blogImage: news.image, blogContent: news.content })
        }
    })
});

app.get("/blog-update", (req, res) => {
    if (!authorized) {
        res.redirect("/not-authorized");
    }
    if (authorized) {
        res.render("admin/blog-update", { articles: article });
    }
})

app.get("/blog-delete", (req, res) => {
    if (!authorized) {
        res.redirect("/not-authorized");
    }
    if (authorized) {
        res.render("admin/blog-delete", { articles: article });
    }
})

app.post("/blog-delete", (req, res) => {
    changeIndex = Number(req.body.articleNumber);
    article.splice(changeIndex, 1);
    res.redirect("admin/home");
})


app.post("/blog-update", (req, res) => {
    changeIndex = Number(req.body.articleNumber);
    res.redirect("/blog-update-2")
})

app.get("/blog-update-2", (req, res) => {
    res.render("admin/blog-update-2", {
        inheritBlogTitle: article[changeIndex].title,
        inheritBlogImage: article[changeIndex].image,
        inheritBlogContent: article[changeIndex].content
    })
})

app.post("/blog-update-2", (req, res) => {
    const newpost = {
        title: req.body.createBlogTitle,
        image: req.body.createBlogImage,
        content: req.body.createBlogContent
    }
    article[changeIndex] = newpost;
    res.redirect("admin/home")
})



/////////////////////////////////////////////////////////////////////////////////////   GALLERY

app.get("/gallery", (req, res) => {
    res.render("gallery", { cssEjs: "gallery", galHeader: "gallery-header", imagesEjs: gallery });
});

app.get("/gallery-create", (req, res) => {
    if (!authorized) {
        res.redirect("/not-authorized");
    }
    if (authorized) {
        res.render("admin/gallery-create");
    }
});

app.post("/gallery-create", (req, res) => {
    const newpic = {
        url: req.body.createGalleryImage,
        caption: req.body.createGalleryCaption
    }
    gallery.unshift(newpic);
    res.redirect("admin/home");
});

app.get("/gallery-update", (req, res) => {
    if (!authorized) {
        res.redirect("/not-authorized");
    }
    if (authorized) {
        res.render("admin/gallery-update", { gallery: gallery });
    }
})

app.post("/gallery-update", (req, res) => {
    changeIndex = Number(req.body.arrayIndex);
    res.redirect("/gallery-update-2")
})

app.get("/gallery-update-2", (req, res) => {
    res.render("admin/gallery-update-2", {
        inheritGalleryImage: gallery[changeIndex].url,
        inheritGalleryCaption: gallery[changeIndex].caption
    })
})

app.post("/gallery-update-2", (req, res) => {
    const newpic = {
        url: req.body.createGalleryImage,
        caption: req.body.createGalleryCaption
    }
    gallery[changeIndex] = newpic;
    res.redirect("admin/home");
})

app.get("/gallery-delete", (req, res) => {
    if (!authorized) {
        res.redirect("/not-authorized");
    }
    if (authorized) {
        res.render("admin/gallery-delete", { gallery: gallery });
    }
})

app.post("/gallery-delete", (req, res) => {
    changeIndex = Number(req.body.arrayIndex);
    gallery.splice(changeIndex, 1);
    res.redirect("admin/home");
})



/////////////////////////////////////////////////////////////////////////////////////   EVENT

app.get("/event", (req, res) => {
    res.render("event", { cssEjs: "event", eventEJS: events })
});

app.get("/event-create", (req, res) => {
    if (!authorized) {
        res.redirect("/not-authorized");
    }
    if (authorized) {
        res.render("admin/event-create");
    }
});

app.post("/event-create", (req, res) => {
    let month = req.body.createEventMonth.slice(5, 7);

    let mon = "";
    switch (month) {
        case "01":
            mon = "Jan"
            break;
        case "02":
            mon = "Feb"
            break;
        case "03":
            mon = "Mar"
            break;
        case "04":
            mon = "Apr"
            break;
        case "05":
            mon = "May"
            break;
        case "06":
            mon = "Jun"
            break;
        case "07":
            mon = "Jul"
            break;
        case "08":
            mon = "Aug"
            break;
        case "09":
            mon = "Sep"
            break;
        case "10":
            mon = "Oct"
            break;
        case "11":
            mon = "Nov"
            break;
        case "12":
            mon = "Des"
            break;

    }

    let newevent = {
        eventTitle: req.body.createEventTitle,
        eventAddress: req.body.createEventAddress,
        eventTime: req.body.createEventTime,
        eventMonth: mon,
        eventDate: req.body.createEventDate,
        eventImage: req.body.createEventPoster,
        eventDescription: req.body.createEventDescription,
        regis: req.body.createEventregis
    }
    events.unshift(newevent);
    res.redirect("admin/home");
})

app.get("/event-update", (req, res) => {
    if (!authorized) {
        res.redirect("/not-authorized");
    }
    if (authorized) {
        res.render("admin/event-update", { event: events });
    }
})

app.post("/event-update", (req, res) => {
    changeIndex = Number(req.body.eventIndex);
    console.log(changeIndex);
    res.redirect("/event-update-2")
})

app.get("/event-update-2", (req, res) => {
    res.render("admin/event-update-2", {
        eventTitle: events[changeIndex].eventTitle,
        eventAddress: events[changeIndex].eventAddress,
        eventTime: events[changeIndex].eventTime,
        eventDate: events[changeIndex].eventDate,
        eventPoster: events[changeIndex].eventImage,
        eventRegis: events[changeIndex].regis,
        eventDescription: events[changeIndex].eventDescription
    })
})

app.post("/event-update-2", (req, res) => {
    let month = req.body.createEventMonth.slice(5, 7);

    let mon = "";
    switch (month) {
        case "01":
            mon = "Jan"
            break;
        case "02":
            mon = "Feb"
            break;
        case "03":
            mon = "Mar"
            break;
        case "04":
            mon = "Apr"
            break;
        case "05":
            mon = "May"
            break;
        case "06":
            mon = "Jun"
            break;
        case "07":
            mon = "Jul"
            break;
        case "08":
            mon = "Aug"
            break;
        case "09":
            mon = "Sep"
            break;
        case "10":
            mon = "Oct"
            break;
        case "11":
            mon = "Nov"
            break;
        case "12":
            mon = "Dec"
            break;

    }

    let newevent = {
        eventTitle: req.body.createEventTitle,
        eventAddress: req.body.createEventAddress,
        eventTime: req.body.createEventTime,
        eventMonth: mon,
        eventDate: req.body.createEventDate,
        eventImage: req.body.createEventPoster,
        eventDescription: req.body.createEventDescription,
        regis: req.body.crateEventRegis
    }
    events[changeIndex] = newevent;
    res.redirect("admin/home");
})

app.get("/event-delete", (req, res) => {
    if (!authorized) {
        res.redirect("/not-authorized");
    }
    if (authorized) {
        res.render("admin/event-delete", { event: events });
    }
})

app.post("/event-delete", (req, res) => {
    changeIndex = Number(req.body.arrayIndex);
    events.splice(changeIndex, 1);
    res.redirect("admin/home");
})



let adminStatement = "";//////////////////////////////////////////////////////////// ADMIN STATEMENT FOR WRONG EMAIL / PASSWORD

app.get("/admin", (req, res) => {
    // if (invalidAdmin) {
    //     adminStatement = "Invalid admin Email or Password!";
    // }
    if (authorized) {
        res.redirect("admin/home")
    }
    else{
        res.render("admin", { invalidAdmin: adminStatement });
    }
});

app.post("/admin", (req, res) => {
    let userEmail = req.body.email;
    let userPassowrd = req.body.password;
    let i = 0;
    for (i = 0; i < (admins.length + 1); i++) {
        if (i != admins.length) {
            if ((admins[i].email === userEmail) && (admins[i].password === userPassowrd)) {
                // invalidAdmin = true;
                authorized = true;
                adminStatement = "";
                res.redirect("/admin/home");
                setTimeout(() => {
                    authorized = false;
                }, 10800000);
                break;
            }
        }
        else {
            // invalidAdmin = false;
            authorized = false;
            adminStatement = "Invalid admin Email or Password!";
            res.redirect("/admin");
        }
    }
});

app.get("/admin/home", (req, res) => {
    if (!authorized) {
        res.redirect("/not-authorized");
    }
    if (authorized) {
        res.render("admin-home");
    }
});

app.post("/signout", (req, res) => {
    authorized = false;
    res.redirect("/admin");
})

app.get("/not-authorized", (req, res) => {
    res.render("admin/unauthorized");
});

app.get("/:page", (req, res) => {
    const requestedPage = req.params.page;
    res.render(requestedPage, { cssEjs: requestedPage });
});

app.listen(process.env.PORT || 2700, () => {
    console.log("Server is runnin on port 2700");
});