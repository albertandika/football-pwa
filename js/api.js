const BASE_API = 'https://api.football-data.org/v2';
const API_TOKEN = 'c5912aaff70b42afaa58a7ff6a009477';
const LEAGUE_ID = '2003';
const ENDPOINT_COMPETITION = `${BASE_API}/competitions/${LEAGUE_ID}/standings`;
const ENDPOINT_SHOW_ALL_TEAMS = `${BASE_API}/competitions/${LEAGUE_ID}/teams	`;
const ENDPOINT_DETAIL_TEAM = `${BASE_API}/teams	`;
const ENDPOINT_PLAYER = `${BASE_API}/players`;
const ENDPOINT_MATCH_DETAIL = `${BASE_API}/matches`;
const ENDPOINT_SCHEDULE = `${BASE_API}/competitions/${LEAGUE_ID}/matches?status=SCHEDULED&matchday=9`;

const fetchAPI = (url) => {
  return fetch(url, {
    method: "GET",
    headers: {
      'X-Auth-Token': API_TOKEN
    }
  })
}

// fungsi ketika suatu response di lanjutkan atau di tolak
function status(response) {
  if (response.status == 200) {
    return Promise.resolve(response);
  } else {
    return Promise.reject(new Error(response.statusText));
  }
}

// mengubah data menjadi bentuk json
function json(response) {
  return response.json();
}

// fungsi untuk error 
function error(error) {
  console.log("Error : " + error);
}


// tampilkan seluruh team yang ada
function getShowAllTeams() {
  if ('caches' in window) {
    caches.match(ENDPOINT_SHOW_ALL_TEAMS).then(function (response) {
      if (response) {
        response.json().then((data) => getViewTeamPremierLeague(data));
      }
    });
  }

  fetchAPI(ENDPOINT_SHOW_ALL_TEAMS)
    .then(status)
    .then(json)
    .then(data => getViewTeamPremierLeague(data))
    .catch(error);
}

// tampilkan seluruh klasemen
function getKlasemenAllTeams() {
  if ("caches" in window) {
    caches.match(ENDPOINT_COMPETITION).then(function (response) {
      if (response) {
        response.json().then((data) => getViewStanding(data));
      }
    })
  }

  fetchAPI(ENDPOINT_COMPETITION)
    .then(status)
    .then(json)
    .then(data => getViewStanding(data))
    .catch(error)
}

function getMatchNextWeekend() {
  if ('caches' in window) {
    caches.match(ENDPOINT_SCHEDULE).then(function (response) {
      if (response) {
        response.json().then((data) => resultMatchinSeason(data))
      }
    });
  }

  fetchAPI(ENDPOINT_SCHEDULE)
    .then(status)
    .then(json)
    .then((data) => resultMatchinSeason(data))
    .catch(error);
}

function getDetailTeamById() {
  return new Promise(function (resolve, reject) {
    const urlParams = new URLSearchParams(window.location.search);
    const idParam = urlParams.get("id");

    if ("caches" in window) {
      caches.match(`${ENDPOINT_DETAIL_TEAM}/${idParam}`).then(function (response) {
        if (response) {
          response.json().then(function (data) {
            detailTeams(data)
            resolve(data);
          });
        }
      });
    }

    fetchAPI(`${ENDPOINT_DETAIL_TEAM}/${idParam}`)
      .then(status)
      .then(json)
      .then(function (data) {
        detailTeams(data)
        resolve(data);
      })
      .catch(error);
  });
}

function getDetailMatchById(id) {
  return new Promise(function (resolve, reject) {
    if ("caches" in window) {
      caches.match(`${ENDPOINT_MATCH_DETAIL}/${id}`).then(function (response) {
        if (response) {
          response.json().then(function (data) {
            detailPlayers(data)
            resolve(data);
          });
        }
      });
    }
    fetchAPI(`${ENDPOINT_MATCH_DETAIL}/${id}`)
      .then(status)
      .then(json)
      .then(function (data) {
        detailPlayers(data)
        resolve(data);
      })
      .catch(error);
  });
}

function getSavedTeam() {
  getAll().then(function (saved) {
    let favTeamHTML = "";
    saved.map(function (fav) {
      favTeamHTML += `
        <div class="col s12 m4">
        <div class="card">
            <div class="card-image waves-effect waves-block waves-light">
                <img class="activator img-home" src="${fav.crestUrl.replace(/^http:\/\//i, 'https://')}" >
            </div>
            <div class="card-content">
               <p class="green"> ${fav.name}</p>
            </div>
            <div class="card-reveal ">
            <span class="card-title grey-text text-darken-4">
                ${fav.shortName}
                <i class="material-icons right">close</i>
            </span>
            <div class="divider"></div>
                
                <div class="row">
                    <div class="col s12 m3"><p>Address</p></div>
                    <div class="col s12 m9"><p>${fav.address}</p></div>
                </div>
                <div class="divider"></div> 
                <div class="row">
                    <div class="col s12 m3 "><p>Venue</p></div>
                    <div class="col s12 m9"><p>${fav.venue}</p></div>
                </div>
                <div class="divider"></div>
                <div class="row">
                    <div class="col s12 m3 "><p>Phone</p></div>
                    <div class="col s12 m9"><p>${fav.phone}</p></div>
                </div>
                <div>
                    <a class="btn blue waves-effect" href="./detail-team.html?id=${fav.id}">
                         Detail
                    </a>
                </div>
                
            </div>
        </div>
    </div>
        `;
    });
    document.getElementById("fav-team").innerHTML = favTeamHTML;
  });
}

function getSavedTeamsById() {
  const urlParams = new URLSearchParams(window.location.search);
  const idParam = urlParams.get("id");

  getById(idParam).then(function (teams) {
    detailPlayers(teams)
  });
}