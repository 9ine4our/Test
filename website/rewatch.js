const firebaseConfig = {
      databaseURL: "https://bangden-com-default-rtdb.firebaseio.com", 
    };
    const app = firebase.initializeApp(firebaseConfig);
    const database = firebase.database(app);

    document.addEventListener('DOMContentLoaded', () => {
      const filmSelect = document.getElementById('film-select');
      const playlistSelect = document.getElementById('playlist-select');
      const videoSource = document.getElementById('video-source');
      const videoPlayer = document.getElementById('video-player');

      database.ref('films').once('value').then(snapshot => {
        const films = snapshot.val();
        for (const filmId in films) {
          const film = films[filmId];
          const option = document.createElement('option');
          option.value = filmId;
          option.textContent = film.title;
          filmSelect.appendChild(option);
        }
      });

      filmSelect.addEventListener('change', (event) => {
        const filmId = event.target.value;
        playlistSelect.innerHTML = '';

        database.ref(`films/${filmId}/episodes`).once('value').then(snapshot => {
          const episodes = snapshot.val();
          for (const episodeId in episodes) {
            const episode = episodes[episodeId];
            const option = document.createElement('option');
            option.value = episode.url;
            option.textContent = episode.title;
            playlistSelect.appendChild(option);
          }
        });
      });

      playlistSelect.addEventListener('change', (event) => {
        const src = event.target.value;
        videoSource.src = src;
        videoPlayer.load();
        videoPlayer.play();
      });

      function skip(time) {
        videoPlayer.currentTime = Math.max(0, videoPlayer.currentTime + time);
      }

	  document.getElementById('rewind-1').addEventListener('click', () => skip(-60));
      document.getElementById('rewind-3').addEventListener('click', () => skip(-180));
      document.getElementById('rewind-5').addEventListener('click', () => skip(-300));
      document.getElementById('rewind-10').addEventListener('click', () => skip(-600));
      document.getElementById('forward-1').addEventListener('click', () => skip(60));
      document.getElementById('forward-3').addEventListener('click', () => skip(180));
	  document.getElementById('forward-5').addEventListener('click', () => skip(300));
      document.getElementById('forward-10').addEventListener('click', () => skip(600));
    });
