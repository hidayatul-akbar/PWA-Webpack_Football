import moment from "moment";
import { convertUTCDate, time } from "./convertDate";
import {
  resultKlasemenJSON,
  resultKlasemenFullJSON,
  resultTopScorerJSON,
} from "./standings";
import { resultDetailTeamJSON } from "./team";
import { resultDetailPlayerJSON } from "./player";
import {
  resultHighlightJSON,
  resultMatchJSON,
  resultDetailMatchJSON,
} from "./matches";

// Header
const api_token = "8febe859297447c6acf5c0d294aa6513";
const kode_liga = 2021; //id Liga Inggris

// Get Date
const currentDate = moment().format("YYYY-MM-DD");
const lastDate = moment().subtract(3, "days").format("YYYY-MM-DD");

let base_url = "https://api.football-data.org/v2/";
let endpoint_tim = `${base_url}teams/`;
let endpoint_pemain = `${base_url}players/`;
let endpoint_klasemen = `${base_url}competitions/${kode_liga}/standings?standingType=TOTAL`;
let endpoint_pertandingan_upcoming = `${base_url}competitions/${kode_liga}/matches`;
let endpoint_pertandingan_detail = `${base_url}matches/`;
let endpoint_top_skor = `${base_url}competitions/${kode_liga}/scorers`;
let endpoint_highlight = `${base_url}competitions/${kode_liga}/matches?status=FINISHED&dateFrom=${lastDate}&dateTo=${currentDate}`;

let fetchApi = (url) => {
  return fetch(url, {
    headers: {
      "X-Auth-Token": api_token,
    },
  });
};

// Blok kode yang akan di panggil jika fetch berhasil
let status = (response) => {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    // Method reject() akan membuat blok catch terpanggil
    return Promise.reject(new Error(response.statusText));
  } else {
    // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
    return Promise.resolve(response);
  }
};

// Blok kode untuk memparsing json menjadi array JavaScript
let json = (response) => {
  return response.json();
};

// Blok kode untuk meng-handle kesalahan di blok catch
let error = (error) => {
  // Parameter error berasal dari Promise.reject()
  console.log("Error : " + error);
};

// Blok kode untuk melakukan request data json

// Standing
const getKlasemenLiga = () => {
  if ("caches" in window) {
    caches.match(endpoint_klasemen).then(function (response) {
      if (response) {
        response.json().then(function (data) {
          resultKlasemenJSON(data);
        });
      }
    });
  }

  fetchApi(endpoint_klasemen)
    .then(status)
    .then(json)
    .then(function (data) {
      resultKlasemenJSON(data);
    })
    .catch(error);
};

// Standing Full
const getKlasemenLigaFull = () => {
  if ("caches" in window) {
    caches.match(endpoint_klasemen).then(function (response) {
      if (response) {
        response.json().then(function (data) {
          resultKlasemenFullJSON(data);
        });
      }
    });
  }

  fetchApi(endpoint_klasemen)
    .then(status)
    .then(json)
    .then(function (data) {
      resultKlasemenFullJSON(data);
    })
    .catch(error);
};

//  Get Teams Detail
const getDetailTeamById = () => {
  return new Promise(function (resolve, reject) {
    var urlParams = new URLSearchParams(window.location.search);
    var idParam = urlParams.get("id");
    let detailTeamSquadHTML = "";
    let tabelSquadHTML = "";

    if ("caches" in window) {
      caches.match(endpoint_tim + idParam).then(function (response) {
        if (response) {
          response.json().then(function (data) {
            resultDetailTeamJSON(data);

            data.squad.forEach(function (squad) {
              detailTeamSquadHTML += `
              <tr>
                <td>
                  <!-- Modal Trigger -->
                  <a href="./detailPlayer.html?id=${squad.id}">${squad.name}</a>
                </td>
                <td class="right">${squad.position}</td>
              </tr>  
              `;
            });
            tabelSquadHTML += `
            <table class="striped highlight"> 
              <tbody class="s-info">
                ${detailTeamSquadHTML}  
              </tbody> 
            </table>`;

            document.getElementById("team-squad").innerHTML = tabelSquadHTML;
            document.getElementById("preloader").innerHTML = "";

            resolve(data);
          });
        }
      });
    }
    fetchApi(endpoint_tim + idParam)
      .then(status)
      .then(json)
      .then(function (data) {
        resultDetailTeamJSON(data);

        data.squad.forEach(function (squad) {
          if (squad.position === null) {
            squad.position = "Staff";
          }
          detailTeamSquadHTML += `
              <tr>
                <td>
                  <!-- Modal Trigger -->
                  <a href="./detailPlayer.html?id=${squad.id}">${squad.name}</a>
                </td>
                <td class="right">${squad.position}</td>
              </tr>  
              `;
        });
        tabelSquadHTML += `
            <table class="striped highlight"> 
              <tbody class="s-info">
                ${detailTeamSquadHTML}  
              </tbody> 
            </table>`;

        document.getElementById("team-squad").innerHTML = tabelSquadHTML;
        document.getElementById("preloader").innerHTML = "";

        resolve(data);
      })
      .catch(error);
  });
};

//  Get Player Detail
const getDetailPlayerById = () => {
  return new Promise(function (resolve, reject) {
    var urlParams = new URLSearchParams(window.location.search);
    var idParam = urlParams.get("id");

    if ("caches" in window) {
      caches.match(endpoint_pemain + idParam).then(function (response) {
        if (response) {
          response.json().then(function (data) {
            resultDetailPlayerJSON(data);
            resolve(data);
          });
        }
      });
    }
    fetchApi(endpoint_pemain + idParam)
      .then(status)
      .then(json)
      .then(function (data) {
        resultDetailPlayerJSON(data);
        resolve(data);
      })
      .catch(error);
  });
};

// Get Highlight
const getHighlight = () => {
  return new Promise(function (resolve, reject) {
    if ("caches" in window) {
      caches.match(endpoint_highlight).then(function (response) {
        if (response) {
          response.json().then(function (data) {
            resultHighlightJSON(data);
          });
        }
      });
    }

    fetchApi(endpoint_highlight)
      .then(status)
      .then(json)
      .then(function (data) {
        resultHighlightJSON(data);
      })
      .catch(error);
  });
};

// Get Matches
const getMatchByIdLeague = () => {
  return new Promise(function (resolve, reject) {
    if ("caches" in window) {
      caches.match(endpoint_pertandingan_upcoming).then(function (response) {
        if (response) {
          response.json().then(function (data) {
            resultMatchJSON(data);
          });
        }
      });
    }

    fetchApi(endpoint_pertandingan_upcoming)
      .then(status)
      .then(json)
      .then(function (data) {
        resultMatchJSON(data);
      })
      .catch(error);
  });
};

// Get Matches Detail
const getDetailMatchById = () => {
  return new Promise(function (resolve, reject) {
    var urlParams = new URLSearchParams(window.location.search);
    var idParam = urlParams.get("id");

    if ("caches" in window) {
      caches
        .match(endpoint_pertandingan_detail + idParam)
        .then(function (response) {
          if (response) {
            response.json().then(function (data) {
              resultDetailMatchJSON(data);
            });
          }
        });
    }
    fetchApi(endpoint_pertandingan_detail + idParam)
      .then(status)
      .then(json)
      .then(function (data) {
        console.log(data);
        console.log(data.head2head.homeTeam.id);
        resultDetailMatchJSON(data);
      })
      .catch(error);
  });
};

// Get Top Scorer
const getTopScorer = () => {
  return new Promise(function (resolve, reject) {
    if ("caches" in window) {
      caches.match(endpoint_top_skor).then(function (response) {
        if (response) {
          response.json().then(function (data) {
            resultTopScorerJSON(data);
          });
        }
      });
    }

    fetchApi(endpoint_top_skor)
      .then(status)
      .then(json)
      .then(function (data) {
        resultTopScorerJSON(data);
      })
      .catch(error);
  });
};

export {
  getKlasemenLiga,
  getKlasemenLigaFull,
  getMatchByIdLeague,
  getDetailMatchById,
  getDetailTeamById,
  getDetailPlayerById,
  getTopScorer,
  getHighlight,
};
