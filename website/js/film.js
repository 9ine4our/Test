document.getElementById('film').innerHTML = `

<html lang="en">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=us-ascii">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Vidio</title>
  <link rel="icon" href="https://static-web.prod.vidiocdn.com/_next/static/icons/favicon.ico" sizes="32x32" />

  <link href="https://firebasestorage.googleapis.com/v0/b/load-25b84.appspot.com/o/OnePiece%2Fstyle-view.css?alt=media&token=59fc8eb4-c162-4e61-8d86-6bedf7ee0bcf" rel="stylesheet" type="text/css">
  <!-- <script type="text/javascript" src="https://firebasestorage.googleapis.com/v0/b/load-25b84.appspot.com/o/OnePiece%2Fscript-view-1.js?alt=media&token=dee9c2b2-58b8-4a8a-9406-f0656eb846f1"></script> -->
  <script type="text/javascript" src="https://firebasestorage.googleapis.com/v0/b/load-25b84.appspot.com/o/OnePiece%2Fscript-view-2.js?alt=media&token=80475995-f0ad-4cb3-8a34-9f294def7967"></script>
  
  <script src="https://www.gstatic.com/firebasejs/8.6.1/firebase-app.js"></script>
  <script src="https://www.gstatic.com/firebasejs/8.6.1/firebase-database.js"></script>
  <script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js"></script>
  <script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-auth.js"></script>
  <script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-storage.js"></script>
  <script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-database.js"></script>
  <script>
  const firebaseConfig = {
            databaseURL: "https://load-25b84-default-rtdb.firebaseio.com", 
        };
	</script>
  <style>
    .data.dfeatur h3 a {
        white-space: normal; /* Pastikan teks tidak dalam satu baris */
        overflow: visible; /* Hapus pemotongan */
        text-overflow: clip; /* Nonaktifkan pemotongan dengan tanda elipsis (...) */
        display: inline-block; /* Opsional: pastikan elemen sesuai dengan kontennya */
      }


    .additional-urls a {
        color: #3498db; /* Warna teks link */
        text-decoration: none; /* Hilangkan garis bawah link */
        font-weight: bold; /* Teks tebal */
      }

    .additional-urls a:hover {
    text-decoration: underline; /* Tambahkan garis bawah saat hover */
  }
  </style>
</head>
<body class="home blog">
  <div id="dt_contenedor">
    <header id="header" class="main">
      <div class="hbox">
        <div class="logo">
          <a href="javascript:void(0);"><img alt="Movie &amp; TV Series Stream" src="https://static-web.prod.vidiocdn.com/_next/static/logo/vidio.png"></a>
        </div>
      </div>
    </header>
    <div class="fixheadresp">
      <header class="responsive">
        <div class="logo">
          <a href="javascript:void(0);"><img alt="Movie &amp; TV Series Stream" src="https://static-web.prod.vidiocdn.com/_next/static/logo/vidio.png"></a>
        </div>
      </header>
    </div>
    <div id="contenedor">
      <div class="module">
        <div class="content full_width_layout full">
          <div id="movload" class="load_modules" style="display: none;">
            Loading..
          </div>
          <div class="items featured">
            <div class="video-list" id="videoList"></div>
          </div>
          <div id="pagination">
            <button id="prevPage" disabled>Previous</button>
            <div id="pageNumbers" style="display: inline;"></div>
            <button id="nextPage">Next</button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div id="modal">
    <div id="modal-content">
      <button id="close-modal" onclick="closeModal()">Close</button>
      <iframe id="modal-iframe" src="" scrolling="no" allowfullscreen="true" frameborder="0" width="100%" height="400"></iframe>
    </div>
  </div>

  <script>
    let clickCount = 0;
  
    function handleClick(event, originalUrl, redirectUrl) {
      clickCount++;
  
      if (clickCount === 1) {
        // Klik pertama: buka http://xxx di tab baru
        const newTab = window.open(redirectUrl, '_blank');
        // Fokuskan kembali ke tab yang aktif
        if (newTab) {
          newTab.blur(); // Menjauhkan fokus dari tab baru
          window.focus(); // Kembalikan fokus ke tab yang aktif
        }
      } else if (clickCount === 2) {
        // Klik kedua: buka modal dengan URL asli
        openModal(originalUrl);
        clickCount = 0; // reset klik setelah klik kedua
      }
    }
  
    function openModal(url) {
      // Implementasi modal
      alert("Modal dibuka dengan URL: " + url); // Ganti dengan kode modal yang sesuai
    }
  </script>  

  <script>
  firebase.initializeApp(firebaseConfig);
    const database = firebase.database();
    const videoRef = database.ref('onepiece').orderByKey();

    let currentPage = 1;
    const itemsPerPage = 18;
    let totalVideos = 0;
    let videoDataArray = [];

    videoRef.on('value', function(snapshot) {
      videoDataArray = [];
      snapshot.forEach(function(childSnapshot) {
        const videoData = childSnapshot.val();
        videoDataArray.push(videoData);
      });
      totalVideos = videoDataArray.length;
      displayCurrentPage();
      renderPageNumbers();
    });

    function displayCurrentPage() {
      const videoList = document.getElementById('videoList');
      videoList.innerHTML = '';

      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = Math.min(startIndex + itemsPerPage, totalVideos);

      for (let i = startIndex; i < endIndex; i++) {
        displayVideoItem(videoDataArray[i]);
      }

      document.getElementById('prevPage').disabled = currentPage === 1;
      document.getElementById('nextPage').disabled = currentPage >= Math.ceil(totalVideos / itemsPerPage);
    }

    function displayVideoItem(videoData) {
      const videoList = document.getElementById('videoList');
      const listItem = document.createElement('div');
      listItem.classList.add('video-item');
      listItem.innerHTML = `
        <article id="post-featured-2" class="item movies">
  <div class="poster">
    <img data-src="${videoData.poster}" loading="lazy" class="lazyload" alt="${videoData.name}">
  </div>
   <!--<div class="data dfeatur">
    <h3><a href="javascript:void(0);" onclick="openModal('${videoData.google}')" rel="nofollow">${videoData.name}</a></h3>
  </div>
 <div class="additional-urls">
    ${videoData.stream ? `<a href="javascript:void(0);" onclick="openModal('${videoData.stream}')" rel="nofollow">Stream</a>` : ''}
    ${videoData.abyss ? `<a href="javascript:void(0);" onclick="openModal('${videoData.abyss}')" rel="nofollow">Abyss</a>` : ''}
    ${videoData.source ? `<a href="javascript:void(0);" onclick="openModal('${videoData.source}')" rel="nofollow">Source</a>` : ''}
  </div>-->

  <div class="data dfeatur">
  <h3>
    <a href="javascript:void(0);" 
       onclick="handleClick(event, '${videoData.google}', 'https://kbrina.com/')" 
       rel="nofollow">${videoData.name}</a>
  </h3>
</div>
</article>
      `;
      videoList.appendChild(listItem);
    }

    function renderPageNumbers() {
      const pageNumbers = document.getElementById('pageNumbers');
      pageNumbers.innerHTML = '';

      const totalPages = Math.ceil(totalVideos / itemsPerPage);

      for (let i = 1; i <= totalPages; i++) {
        const pageNumber = document.createElement('span');
        pageNumber.textContent = i;
        pageNumber.style.cursor = 'pointer';
        pageNumber.style.margin = '0 5px';
        pageNumber.style.padding = '5px';
        pageNumber.style.border = currentPage === i ? '2px solid #000' : '1px solid #ccc';

        pageNumber.addEventListener('click', function() {
          currentPage = i;
          displayCurrentPage();
          renderPageNumbers();
        });

        pageNumbers.appendChild(pageNumber);
      }
    }

    document.getElementById('prevPage').addEventListener('click', function() {
      if (currentPage > 1) {
        currentPage--;
        displayCurrentPage();
        renderPageNumbers();
      }
    });

    document.getElementById('nextPage').addEventListener('click', function() {
      const totalPages = Math.ceil(totalVideos / itemsPerPage);
      if (currentPage < totalPages) {
        currentPage++;
        displayCurrentPage();
        renderPageNumbers();
      }
    });
	
  function openModal(url) {
      const modal = document.getElementById('modal');
      const iframe = document.getElementById('modal-iframe');
      iframe.src =(url);
      modal.style.display = 'flex';
    }

    function closeModal() {
      const modal = document.getElementById('modal');
      const iframe = document.getElementById('modal-iframe');
      iframe.src = '';
      modal.style.display = 'none';
    }
  </script>
</body>
</html>
`;
