import { videoDataArray } from 'https://raw.githack.com/9ine4our/Test/refs/heads/main/test/data.js';

    function handleClick(event, originalUrl) {
      openModal(originalUrl);
    }

    function openModal(url) {
      const modal = document.getElementById('modal');
      const iframe = document.getElementById('modal-iframe');
      iframe.src = url;
      modal.style.display = 'flex';
    }

    function closeModal() {
      const modal = document.getElementById('modal');
      const iframe = document.getElementById('modal-iframe');
      iframe.src = '';
      modal.style.display = 'none';
    }

    let currentPage = 1;
    const itemsPerPage = 18;
    let totalVideos = videoDataArray.length;

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
        <article class="item movies">
          <div class="poster">
            <img src="${videoData.img}" loading="lazy" alt="${videoData.title}">
          </div>
          <div class="data dfeatur">
            <h3><a href="javascript:void(0);" onclick="handleClick(event, '${videoData.url}')" rel="nofollow">${videoData.title}</a></h3>
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
        pageNumber.addEventListener('click', function () {
          currentPage = i;
          displayCurrentPage();
          renderPageNumbers();
        });
        pageNumbers.appendChild(pageNumber);
      }
    }

    document.getElementById('prevPage').addEventListener('click', function () {
      if (currentPage > 1) {
        currentPage--;
        displayCurrentPage();
        renderPageNumbers();
      }
    });

    document.getElementById('nextPage').addEventListener('click', function () {
      const totalPages = Math.ceil(totalVideos / itemsPerPage);
      if (currentPage < totalPages) {
        currentPage++;
        displayCurrentPage();
        renderPageNumbers();
      }
    });

    displayCurrentPage();
    renderPageNumbers();
