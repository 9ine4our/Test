document.getElementById('film').innerHTML = `

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
  </body>
`;
