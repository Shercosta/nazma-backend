const router = require("express").Router();
const blog = require("./blog");
const event = require("./event");
const gallery = require("./gallery");
const project = require("./project");
const read = require("./read");
const testimony = require("./testimony");
const trainer = require("./trainer");
const repository = require("../repository");
const _ = require("lodash");

var db = require("../db");

function fetchTodos(req, res, next) {
  db.all(
    "SELECT * FROM todos WHERE owner_id = ?",
    [req.user.id],
    function (err, rows) {
      if (err) {
        return next(err);
      }

      var todos = rows.map(function (row) {
        return {
          id: row.id,
          title: row.title,
          completed: row.completed == 1 ? true : false,
          url: "/" + row.id,
        };
      });
      res.locals.todos = todos;
      res.locals.activeCount = todos.filter(function (todo) {
        return !todo.completed;
      }).length;
      res.locals.completedCount = todos.length - res.locals.activeCount;
      next();
    }
  );
}

let changeIndex = -1; /////////////////////////////////////////////////////////////////////  INDEX PARAMETER FOR UPDATE

// const events = [
//   {
//     eventTitle: "Event Title goes here",
//     eventAddress: "Event will be held on this",
//     eventTime: "at 8 AM to 10 PM",
//     eventMonth: "Jul",
//     eventDate: 11,
//     eventImage:
//       "https://img.freepik.com/free-vector/music-event-poster-template-with-abstract-shapes_1361-1316.jpg?w=2000",
//     eventDescription:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi et mi justo. Pellentesque sit amet rhoncus libero, sed volutpat dui. Nullam viverra convallis congue. Vivamus accumsan semper eros, eu efficitur nunc iaculis a. Curabitur accumsan eget nunc quis dapibus. Nullam gravida ultricies dolor, in tincidunt lorem condimentum vitae. Vestibulum non aliquet lacus, feugiat ullamcorper urna. In ut mauris ornare, porttitor mi sit amet, maximus massa. Quisque porta efficitur libero in scelerisque. Sed sodales vel lorem sed aliquet. Maecenas id neque auctor, consequat magna nec, dignissim risus. Sed pulvinar scelerisque neque, non ornare massa tincidunt iaculis.",
//     regis: "https://www.eventbrite.com/d/indonesia--jakarta-pusat/events/",
//   },
// ];

// const gallery = [
//   {
//     url: "https://i.imgur.com/SHNsKlJ.jpeg",
//     caption: "Old girl hoping for a little extra dinner.",
//   },
//   {
//     url: "https://i.imgur.com/c4xpl6l.jpeg",
//     caption: "Space Illustration.",
//   },
//   {
//     url: "https://i.imgur.com/rcRGCEj.jpeg",
//     caption: "From my first 2 troops as a 501st member… For the Empire!",
//   },
//   {
//     url: "https://i.imgur.com/torx7t8.jpeg",
//     caption: "Celestials 12 months illustrated",
//   },
//   {
//     url: "https://i.imgur.com/6PM3UYZ.jpeg",
//     caption: "Elizabeth from Bioshock cosplay by me k_o_n_a",
//   },
//   {
//     url: "https://i.imgur.com/xEGuV77.jpeg",
//     caption:
//       "My first photoshoot in a long time, very nice to dust the cobwebs off in conditions like this!",
//   },
// ];

// const ongoingProjects = [
//   "Onproj 1",
//   "Onproj 2",
//   "Onproj 3",
//   "Onproj 4",
//   "Onproj 5",
//   "Onproj 6",
// ];
// const ongoingProjectLinks = ["#", "#", "#", "#", "#", "#"];

// const testimony = [
//   {
//     cliPic:
//       "https://img.freepik.com/premium-photo/indonesian-man-smiling_86639-992.jpg",
//     cliName: "Chandra Kilau",
//     cliRev:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi accumsan ex semper neque aliquam tempus.",
//   },
//   {
//     cliPic:
//       "https://img.freepik.com/premium-photo/asian-woman-white-t-shirt-stand-smiling-with-braces-white-background_2034-2735.jpg",
//     cliName: "Kayla Rufikasari",
//     cliRev:
//       "Vestibulum urna sapien, tincidunt quis euismod sed, elementum id erat. Nunc velit orci, congue ut sceler.",
//   },
//   {
//     cliPic:
//       "https://www.accenture.com/t20220614T031106Z__w__/id-en/_acnmedia/Accenture/Redesign-Assets/DotCom/Images/Local/General/143/Accenture-Jayant-400x400.jpg",
//     cliName: "John Farquaad",
//     cliRev:
//       "Aliquam eu sollicitudin leo. Aliquam erat volutpat. Etiam pharetra, massa nec ultrices sollicitudin enim.",
//   },
// ];

// const certifiedTrainer = [
//   {
//     image: "https://cdn.icon-icons.com/icons2/1674/PNG/512/person_110935.png",
//     name: "Person Name",
//     expertise: "Person Expertise",
//   },
//   {
//     image: "https://cdn.icon-icons.com/icons2/1674/PNG/512/person_110935.png",
//     name: "Person Name",
//     expertise: "Person Expertise",
//   },
//   {
//     image: "https://cdn.icon-icons.com/icons2/1674/PNG/512/person_110935.png",
//     name: "Person Name",
//     expertise: "Person Expertise",
//   },
//   {
//     image: "https://cdn.icon-icons.com/icons2/1674/PNG/512/person_110935.png",
//     name: "Person Name",
//     expertise: "Person Expertise",
//   },
//   {
//     image: "https://cdn.icon-icons.com/icons2/1674/PNG/512/person_110935.png",
//     name: "Person Name",
//     expertise: "Person Expertise",
//   },
// ];

// const article = [
//   {
//     title:
//       "Jenderal Bintang 3 Ancam Mundur di Kasus Ferdy Sambo, Kapolri: Kami Kompak",
//     image: "https://statik.tempo.co/data/2022/08/24/id_1135418/1135418_720.jpg",
//     content:
//       'Kapolri Jenderal Listyo Sigit Prabowo enggan mengungkap siapa jenderal bintang tiga yang mengancam mundur jika Ferdy Sambo tidak ditetapkan tersangka. Isu tersebut sempat mencuat dari ucapan Menteri Koordinator Politik, Hukum dan Keamanan, Mahfud Md. \n “Saya enggak bisa jawab karena yang jelaskan bukan saya. Tetapi yang jelas kita kompak semuanya,” kata Kapolri setelah rapat dengar pendapat dengan Komisi III DPR di gedung DPR/MPR RI di Senayan, Jakarta Selatan, 24 Agustus 2022. \nMasalah soal jenderal bintang tiga yang mengancam mengundurkan diri itu muncul dalam rapat dengar pendapat antara Komisi III dengan Komisi Kepolisian Nasional, Komisi Nasional Hak Asasi Manusia Senin kemarin, 22 Agustus lalu. \nDalam rapat itu, Anggota Komisi III dari Fraksi Partai Demokrat Benny K Harman mendesak Mahfud untuk mengungkap siapa jenderal yang sempat dia sebut di media sosial dan dalam wawancara. "Yang perlu Pak Menko ungkap kalau saya sebut aja Pak siapa jenderal yang mau mengundurkan diri, supaya jangan ada gelap-gelap," kata Anggota Komisi III DPR Benny K. Harman dalam RDP di Ruang Rapat Komisi III DPR, Kompleks Parlemen Senayan, Jakarta, Senin, 22 Agustus lalu.',
//   },
//   {
//     title: "Sstt.. Ada Tanda-tanda Tarif Ojol Batal Naik Nih",
//     image:
//       "https://akcdn.detik.net.id/visual/2020/06/08/ojek-online-cnbc-indonesiaandrean-kristianto-5_169.jpeg?w=715&q=90",
//     content:
//       "Kementerian Perhubungan masih akan berbicara kembali dengan operator transportasi ride sharing ojek online terkait kenaikan tarif. Namun Menteri Perhubungan Budi Karya Sumadi belum mendapat memastikan tarif ini akan naik pada tanggal 29 Agustus mendatang." +
//       '"Kan sampai tanggal 29, saya tugaskan pak Dirjen Darat, Mbak Adita (Jubir Kementerian Perhubungan) bertemu dengan semua stakeholder, termasuk masyarakat yang bisa menjadi basis apa yang kita dengarkan. aspirasi masyarakat seperti apa, seperti itu lah hasilnya, Insya Allah tanggal 29 mbak Adita akan rilis, katanya kepada Wartawan, di Kompleks Parlemen, Rabu (24/6/2022).' +
//       '"Karena kita gak mau gegabah waktu pada masyarakat ini harus kita lakukan mendengar semua pihak dengan baik," tambahnya, saat ditanya apakah tarif ojol belum tentu naik 29 Agustus nanti.' +
//       "Saat menjawab pertanyaan Anggota DPR RI Komisi V Cen Sui Lan, juga dia belum bisa memastikan mengenai kenaikan tarif Ojol ini." +
//       "" +
//       '"Masih 4 hari lagi, kita diskusi dengan operator beserta masyarakat. kita lagi riset. tanggal 29 saya akan kirim surat ke bu Chen," katanya.' +
//       "" +
//       "Dalam rapat Cen Sui Lan meminta Kementerian Perhubungan melihat kesanggupan masyarakat untuk biaya transportasi." +
//       "" +
//       '"Saat ini semua naik, termasuk tiket pesawat dan lain lain, jadi tolong pikirkan kembali ini harus apakah harus dinaikkan tanggal 29 ini?," katanya.' +
//       "Sebelumnya penerapan kenaikan tarif ojol ini mundur menjadi 29 Agustus 2022 dari 14 Agustus 2022. Aturan ini tertuang dalam Keputusan Menteri Perhubungan (KM) Nomor 564 Tahun 2022 tentang Pedoman Perhitungan Biaya Jasa Penggunaan Sepeda Motor yang Digunakan Untuk Kepentingan Masyarakat." +
//       "" +
//       "Hal ini disebabkan untuk penyesuaian dari aplikator dan menambah masa sosialisasi.",
//   },
//   {
//     title: "Jokowi Bawa Ratusan Triliun dari 3 Negara, Ini Kelanjutannya!",
//     image:
//       "https://akcdn.detik.net.id/visual/2022/08/24/keterangan-pers-hasil-rapat-terbatas-kantor-presiden-24-agustus-2022-tangkapan-layar-youtube_169.png?w=715&q=90",
//     content:
//       "Airlangga Hartarto, Menteri Koordinator Bidang Perekonomian Indonesia dan Bahlil Lahadalia, Menteri Investasi Indonesia memberikan pernyataan usai melakukan Rapat Terbatas (Ratas) Kamis (24/8/2022). Airlangga mengungkapkan kelanjutan investasi dari kunjungan Presiden Joko Widodo (Jokowi) ke Korea Selatan, Jepang, dan China." +
//       '"Dari Jepang, laporan Investasi Mitsubishi berkomitmen Rp 10 triliun untuk ekspander EV. Toyota Grup dengan investasi Rp 27,1 triliun untuk 2022-2026 kemudian beberapa investasi lagi, Glico dan sektor ritel," ungkap Airlangga, dikutip dari Youtube Sekretaris Presiden, Kamis (24/8/2022). Sementara untuk investasi Negeri Ginseng, Bahlil memastikan jika investasi sebesar Rp 100 triliun tengah berjalan dengan target groun breaking akhir tahun ini atau awal tahun depan.' +
//       "" +
//       '"Total US$ 6,7 miliar sebesar US$ 3,5 miliar merupakan kerja sama antara Posco dengan Krakatau Steel untuk pengembangan investasi baja untuk mobil baterai, semua perizinan dan insentif sudah clear," tegas Bahlil.' +
//       "" +
//       "Kedua, Bahlil melanjutkan untuk pembangunan pabrik sepatu di Sragen menyerap pekerjaan 30 ribu orang juga dalam proses. Menurutnya, hal yang lain soal Korea, dalam diskusi dengan investor Korea adalah minat LG untuk masuk ke Ibu Kota Negara (IKN)." +
//       "" +
//       '"Termasuk LG, sudah difasilitasi saat bertemu di Korea, Presiden arahkan percepatan," ungkap Bahlil.' +
//       "Di Korea, LG dalam ekosistem baterai mobil semua masih dalam jadwal dan kerja, realisasi sebagian sudah jalan." +
//       "" +
//       "Bahlil juga menambahkan soal investasi Jepang yaitu Sojic yang ingin membangun pabrik metanol di Papua Barat. Menurutnya, pabrik metanol akan dibangun di Bintuni dan pabrik pupuk di Fakfak." +
//       "" +
//       "Terakhir dari China, Presiden melakukan bilateral beberapa hal penambahan ekspor CPO dan diarahkan percepatan kawasan industri di Kalimantan Utara dengan progres saat ini yaitu perizinan yang telah selesai dan infrastruktur yang mulai dikerjakan." +
//       "" +
//       "Indonesia - Presiden Joko Widodo (Jokowi) telah menyelesaikan rangkaian kunjungan kerjanya ke tiga negara di kawasan Asia Timur. Ketiga negara tersebut yakni China, Jepang, dan Korea Selatan." +
//       "Kunjungan kerja Jokowi ke China, Jepang dan Korea Selatan membawa misi untuk memperkuat kerja sama di bidang ekonomi, baik itu perdagangan dan investasi. Hal ini dilakukan di tengah situasi dunia yang kian tidak pasti." +
//       "" +
//       "Dalam kunjungan ke tiga negara tersebut, Jokowi memang sempat melakukan pertemuan dengan investor kelas kakap dari Jepang dan Korea Selatan. Jokowi berhasil meraih kesepakatan investasi dengan total nilai yang diperkirakan lebih dari Rp 185 triliun.",
//   },
//   {
//     title: 'Hari Kemerdekaan, Zelensky: Ukraina "Dilahirkan Kembali"',
//     image:
//       "https://akcdn.detik.net.id/visual/2022/04/14/presiden-ukraina-volodymyr-zelensky-11_169.jpeg?w=715&q=90",
//     content:
//       "Serangan Rusia ke Ukraina telah genap 6 bulan dan bertepatan dengan hari kemerdekaan negara bekas Uni Soviet tersebut." +
//       'Menandai ulang tahun ke-31 Ukraina, Presiden Volodymyr Zelensky menyatakan bahkan Ukraina "dilahirkan kembali" ketika Rusia menyerang enam bulan lalu. Dalam pidatonya tersebut, dia pun bersumpah untuk mengusir pasukan Moskow sepenuhnya.' +
//       "" +
//       "Adapun peringatan hari kemerdekaan tersebut berada di bawah bayang-bayang gempuran Rusia melalui ancaman serangan rudal ke kota-kota besar di Ukraina. Kota terbesar kedua Kharkiv berada di bawah jam malam setelah berbulan-bulan dibombardir." +
//       '"Sebuah bangsa baru muncul di dunia pada 24 Februari pukul 4 pagi. Ia tidak dilahirkan, tetapi dilahirkan kembali. Sebuah bangsa yang tidak menangis, menjerit atau ketakutan. Bangsa yang tidak melarikan diri, tidak menyerah, dan tidak lupa," kata Zelensky dalam pidatonya, dikutip Reuters, Rabu (24/8/2022).' +
//       "" +
//       "Pemimpin berusia 44 tahun itu berbicara di depan monumen utama kemerdekaan Kyiv dengan seragam tempur khasnya, bersumpah untuk merebut kembali wilayah yang diduduki di Ukraina Timur serta Semenanjung Krimea, yang dicaplok Rusia pada 2014." +
//       "" +
//       '"Kami tidak akan duduk di meja perundingan karena takut, dengan pistol ditodongkan ke kepala kami. Bagi kami, besi yang paling mengerikan bukanlah rudal, pesawat, dan tank, tetapi belenggu. Bukan parit, tetapi belenggu," tegasnya.' +
//       "" +
//       "Dia dan istrinya kemudian menghadiri kebaktian di katedral St. Sophia di Kyiv bersama dengan para pemimpin agama dari semua agama utama Ukraina." +
//       "Di sisi lain, Rusia telah membuat beberapa kemajuan di Ukraina dalam beberapa bulan terakhir, setelah pasukannya didorong mundur dari Kyiv pada minggu-minggu awal perang. Tentara Ukraina di garis depan di timur mengatakan mereka lebih termotivasi daripada musuh mereka." +
//       "" +
//       '"Semua rakyat kami bersorak untuk kami. Seluruh negara, dan negara-negara lain yang membantu kami juga. Semangat juang kami lebih besar dari mereka," kata seorang tentara bernama Yevhen kepada Reuters.' +
//       "" +
//       'Menteri Pertahanan Rusia Sergei Shoigu mengatakan pada pertemuan para menteri pertahanan di Uzbekistan bahwa Rusia sengaja memperlambat apa yang disebutnya sebagai "operasi militer khusus" di Ukraina untuk menghindari korban sipil.' +
//       "",
//   },
// ];

/* GET home page. */
router.get(
  "/",
  async function (req, res, next) {
    if (!req.user) {
      const projects = await repository.project.findAll(
        {},
        req.query,
        req.filterQueryParser
      );

      const testimony = await repository.testimony.findAll(
        {},
        req.query,
        req.filterQueryParser
      );

      const trainer = await repository.trainer.findAll();

      return res.render("homelander", {
        cssEjs: "styles",
        Project1: projects?.rows?.[0]?.name,
        Project2: projects?.rows?.[1]?.name,
        Project3: projects?.rows?.[2]?.name,
        Project4: projects?.rows?.[3]?.name,
        Project5: projects?.rows?.[4]?.name,
        Project6: projects?.rows?.[5]?.name,
        projectLink1: projects?.rows?.[0]?.link,
        projectLink2: projects?.rows?.[0]?.link,
        projectLink3: projects?.rows?.[0]?.link,
        projectLink4: projects?.rows?.[0]?.link,
        projectLink5: projects?.rows?.[0]?.link,
        projectLink6: projects?.rows?.[0]?.link,
        clientImage1: testimony?.rows?.[0]?.cliPic,
        clientName1: testimony?.rows?.[0]?.cliName,
        clientReview1: testimony?.rows?.[0]?.cliRev,
        clientImage2: testimony?.rows?.[1]?.cliPic,
        clientName2: testimony?.rows?.[1]?.cliName,
        clientReview2: testimony?.rows?.[1]?.cliRev,
        clientImage3: testimony?.rows?.[2]?.cliPic,
        clientName3: testimony?.rows?.[2]?.cliName,
        clientReview3: testimony?.rows?.[2]?.cliRev,
        trainer: trainer,
      });
    }
    next();
  },
  fetchTodos,
  function (req, res, next) {
    res.locals.filter = null;
    res.render("admin-home", { user: req.user });
  }
);

// router.get("/layanan", (req, res) => {
//   res.render("layanan", { cssEjs: "layanan" });
// });

// NOT AUTHORIZED

router.get("/not-authorized", (req, res) => {
  res.render("admin/unauthorized");
});

// router.get('/active', fetchTodos, function(req, res, next) {
//   res.locals.todos = res.locals.todos.filter(function(todo) { return !todo.completed; });
//   res.locals.filter = 'active';
//   res.render('index', { user: req.user });
// });

// router.get('/completed', fetchTodos, function(req, res, next) {
//   res.locals.todos = res.locals.todos.filter(function(todo) { return todo.completed; });
//   res.locals.filter = 'completed';
//   res.render('index', { user: req.user });
// });

// router.post('/', function(req, res, next) {
//   req.body.title = req.body.title.trim();
//   next();
// }, function(req, res, next) {
//   if (req.body.title !== '') { return next(); }
//   return res.redirect('/' + (req.body.filter || ''));
// }, function(req, res, next) {
//   db.run('INSERT INTO todos (owner_id, title, completed) VALUES (?, ?, ?)', [
//     req.user.id,
//     req.body.title,
//     req.body.completed == true ? 1 : null
//   ], function(err) {
//     if (err) { return next(err); }
//     return res.redirect('/' + (req.body.filter || ''));
//   });
// });

// router.post('/:id(\\d+)', function(req, res, next) {
//   req.body.title = req.body.title.trim();
//   next();
// }, function(req, res, next) {
//   if (req.body.title !== '') { return next(); }
//   db.run('DELETE FROM todos WHERE id = ? AND owner_id = ?', [
//     req.params.id,
//     req.user.id
//   ], function(err) {
//     if (err) { return next(err); }
//     return res.redirect('/' + (req.body.filter || ''));
//   });
// }, function(req, res, next) {
//   db.run('UPDATE todos SET title = ?, completed = ? WHERE id = ? AND owner_id = ?', [
//     req.body.title,
//     req.body.completed !== undefined ? 1 : null,
//     req.params.id,
//     req.user.id
//   ], function(err) {
//     if (err) { return next(err); }
//     return res.redirect('/' + (req.body.filter || ''));
//   });
// });

// router.post('/:id(\\d+)/delete', function(req, res, next) {
//   db.run('DELETE FROM todos WHERE id = ? AND owner_id = ?', [
//     req.params.id,
//     req.user.id
//   ], function(err) {
//     if (err) { return next(err); }
//     return res.redirect('/' + (req.body.filter || ''));
//   });
// });

// router.post('/toggle-all', function(req, res, next) {
//   db.run('UPDATE todos SET completed = ? WHERE owner_id = ?', [
//     req.body.completed !== undefined ? 1 : null,
//     req.user.id
//   ], function(err) {
//     if (err) { return next(err); }
//     return res.redirect('/' + (req.body.filter || ''));
//   });
// });

// router.post('/clear-completed', function(req, res, next) {
//   db.run('DELETE FROM todos WHERE owner_id = ? AND completed = ?', [
//     req.user.id,
//     1
//   ], function(err) {
//     if (err) { return next(err); }
//     return res.redirect('/' + (req.body.filter || ''));
//   });
// });

// const http = require('http');

setInterval(() => {
  router.get("http://nazmaoffice.herokuapp.com");
}, 25 * 60 * 1000); // every 25 minutes

router.use(blog);
router.use(event);
router.use(gallery);
router.use(project);
router.use(read);
router.use(testimony);
router.use(trainer);

module.exports = router;
