import { convertUTCDate, time } from "./convertDate";

let base_url = "https://api.football-data.org/v2/";

const resultHighlightJSON = (data) => {
  let dataHighlightHtml = "";
  let match = data.matches;
  let maxLoopData = match.length;

  for (let i = 0; i < maxLoopData; i++) {
    // Ambil endpoint team
    $.ajax({
      headers: { "X-Auth-Token": "8febe859297447c6acf5c0d294aa6513" },
      url: `${base_url}teams/${match[i].homeTeam.id}`,
      type: "get",
      dataType: "json",

      success: function (home) {
        $.ajax({
          headers: { "X-Auth-Token": "8febe859297447c6acf5c0d294aa6513" },
          url: `${base_url}teams/${match[i].awayTeam.id}`,
          type: "get",
          dataType: "json",

          success: function (away) {
            dataHighlightHtml += `
            <div class="col s12 m12 l6 h-card">
              <div class="card">
                <div class="card-content">
                  <div class="row">
                    <div class="col s2 m2 l2 team-logo center-align">
                      <img src="${home.crestUrl}" alt="${home.shortName}" />
                    </div>
                    <div class="col s2 m2 l2 team-logo center-align">
                      <img src="${away.crestUrl}" alt="${away.shortName}" />
                    </div>
                    <div class="col s8 m8 l8 h-date">
                      <h6 class="right">${convertUTCDate(
                        new Date(match[i].utcDate)
                      )}</h6>
                    </div>
                  </div>
                  <div class="divider"></div>
                  <br />
                  <div class="row">
                    <div class="col s12 m12 l12 h-card-head">
                      <h5 class="flow-text">Premier League</h5>
                    </div>
                  </div>
                  <!-- HomeTeam -->
                  <div class="row team-text">
                    <div class="col s10 m10 l10">
                      <h5 class="left">${match[i].homeTeam.name}</h5>
                    </div>
                    <div class="col s2 m2 l2">
                      <h5 class="left">${match[i].score.fullTime.homeTeam}</h5>
                    </div>
                  </div>
                  <!-- AwayTeam -->
                  <div class="row team-text">
                    <div class="col s10 m10 l10">
                      <h5 class="left">${match[i].awayTeam.name}</h5>
                    </div>
                    <div class="col s2 m2 l2">
                      <h5 class="left">${match[i].score.fullTime.awayTeam}</h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            `;
            document.getElementById(
              "match-highlight"
            ).innerHTML = dataHighlightHtml;
            document.getElementById("preloader").innerHTML = "";
          },
        });
      },
    });
  }
};

const resultMatchJSON = (data) => {
  let dataMatchesHtml = "";
  let match = data.matches;
  let maxLoopData = match.length;

  //Membatasi maksimal 15 pertandingan saja
  if (match.length > 3) {
    maxLoopData = 3;
  }

  for (let i = 0; i < maxLoopData; i++) {
    // Ambil endpoint team
    $.ajax({
      headers: { "X-Auth-Token": "8febe859297447c6acf5c0d294aa6513" },
      url: `${base_url}teams/${match[i].homeTeam.id}`,
      type: "get",
      dataType: "json",

      success: function (home) {
        $.ajax({
          headers: { "X-Auth-Token": "8febe859297447c6acf5c0d294aa6513" },
          url: `${base_url}teams/${match[i].awayTeam.id}`,
          type: "get",
          dataType: "json",

          success: function (away) {
            dataMatchesHtml += `
            <div class="col s12 m6 l4">
              <div class="card">
                <div class="card-content">
                  <div class="row">
                    <div class="col s10 m10 l10 h-card-head">
                      <h5 class="flow-text">${data.competition.name}</h5>
                    </div>
                    <div class="col s2 m2 l2">
                      <h5>${match[i].matchday}</h5>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col s12 m12 l12 center-align match-text-detail">
                      <h6>Kick Off</h6>
                    </div>
                  </div>

                  <!-- Team -->
                  <div class="row">
                    <div class="col s5 m5 l5 match-team-logo center-align">
                      <img src="${home.crestUrl}" alt="${home.shortName}" />
                      <h6>${home.tla}</h6>
                    </div>
                    <div class="col s2 m2 l2 center-align">
                      <br /><br />
                      <span>vs</span>
                    </div>
                    <div class="col s5 m5 l5 match-team-logo center-align">
                      <img src="${away.crestUrl}" alt="${away.shortName}" />
                      <h6>${away.tla}</h6>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col s6 m6 l6 center-align match-text-detail">
                      <span>${convertUTCDate(new Date(match[i].utcDate))}</span>
                    </div>
                    <div class="col s6 m6 l6 center-align match-text-detail">
                      <span>${time(new Date(match[i].utcDate))}</span>
                    </div>
                  </div>
                  <!-- Details with modal -->
                  <span class="card-title card-overlay center-align"
                    ><a
                      href="./detailMatch.html?id=${match[i].id}"
                      >Details</a
                    ></span
                  >
                </div>
              </div>
            </div>
          `;
            document.getElementById("listMatches").innerHTML = dataMatchesHtml;
            document.getElementById("preloader").innerHTML = "";
          },
        });
      },
    });
  }
};

const resultDetailMatchJSON = (data) => {
  let detailMatchHTML = "";

  $.ajax({
    headers: { "X-Auth-Token": "8febe859297447c6acf5c0d294aa6513" },
    url: `${base_url}teams/${data.head2head.homeTeam.id}`,
    type: "get",
    dataType: "json",

    success: function (home) {
      console.log(home);
      $.ajax({
        headers: { "X-Auth-Token": "8febe859297447c6acf5c0d294aa6513" },
        url: `${base_url}teams/${data.head2head.awayTeam.id}`,
        type: "get",
        dataType: "json",

        success: function (away) {
          detailMatchHTML += `
          <div class="card-content">
          

          <!-- Mulai -->

          <div class="row">
            <div class="col s12 m12 l12 h-card-head center-align">
              <h5 class="flow-text">Matchday ${data.match.matchday}</h5>
            </div>
          </div>

          <!-- Team -->
          <div class="row">
            <div class="col s5 m5 l5 match-team-logo-det center-align">
              <img src="${home.crestUrl}" alt="${home.shortName}" />
            </div>
            <div class="col s2 m2 l2 center-align match-text-detail">
              <br />
              <span>${convertUTCDate(new Date(data.match.utcDate))}, ${time(
            new Date(data.match.utcDate)
          )}</span>
            </div>
            <div class="col s5 m5 l5 match-team-logo-det center-align">
              <img src="${away.crestUrl}" alt="${away.shortName}" />
            </div>
          </div>
          <div class="row">
            <div class="col s5 m5 l5 center-align match-team-logo">
              <h6>${home.shortName}</h6>
            </div>
            <div class="col s2 m2 l2 center-align">
              <span>vs</span>
            </div>
            <div class="col s5 m5 l5 center-align match-team-logo">
              <h6>${away.shortName}</h6>
            </div>
          </div>

          <div class="divider"></div>
          <br />
          <!-- Head to head -->
          <div class="row">
            <div class="col s12 m12 l12 m-hth center-align">
              <h6 class="flow-text">Head to head</h6>
            </div>
          </div>

          <!-- Number of match -->
          <h5 class="m-det-title">Statistics of last ${
            data.head2head.numberOfMatches
          } matches</h5>
          <div class="divider"></div>
          <br />
          <h6 class="m-det-subtitle">Number of wins</h6>
          <div class="row">
            <div class="col s6 m6">
              <ul class="collection">
                <li class="collection-item">
                  <div class="row">
                    <div class="col s2 m2">
                      <h6 class="left m-det-point">${
                        data.head2head.homeTeam.wins
                      }</h6>
                    </div>
                    <div class="col s10 m10 hide-on-small-only">
                      <h6 class="right m-det-team">${home.shortName}</h6>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div class="col s6 m6">
              <ul class="collection">
                <li class="collection-item">
                  <div class="row">
                    <div class="col s10 m10 hide-on-small-only">
                      <h6 class="left m-det-team">${away.shortName}</h6>
                    </div>
                    <div class="col s2 m2">
                      <h6 class="left m-det-point">${
                        data.head2head.awayTeam.wins
                      }</h6>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <h6 class="m-det-subtitle">Number of draws</h6>
          <div class="row">
            <div class="col s6 m6">
              <ul class="collection">
                <li class="collection-item">
                  <div class="row">
                    <div class="col s2 m2">
                      <h6 class="left m-det-point">${
                        data.head2head.homeTeam.draws
                      }</h6>
                    </div>
                    <div class="col s10 m10 hide-on-small-only">
                      <h6 class="right m-det-team">${home.shortName}</h6>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div class="col s6 m6">
              <ul class="collection">
                <li class="collection-item">
                  <div class="row">
                    <div class="col s10 m10 hide-on-small-only">
                      <h6 class="left m-det-team">${away.shortName}</h6>
                    </div>
                    <div class="col s2 m2">
                      <h6 class="left m-det-point">${
                        data.head2head.awayTeam.draws
                      }</h6>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <h6 class="m-det-subtitle">Number of loses</h6>
          <div class="row">
            <div class="col s6 m6">
              <ul class="collection">
                <li class="collection-item">
                  <div class="row">
                    <div class="col s2 m2">
                      <h6 class="left m-det-point">${
                        data.head2head.homeTeam.losses
                      }</h6>
                    </div>
                    <div class="col s10 m10 hide-on-small-only">
                      <h6 class="right m-det-team">${home.shortName}</h6>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div class="col s6 m6">
              <ul class="collection">
                <li class="collection-item">
                  <div class="row">
                    <div class="col s10 m10 hide-on-small-only">
                      <h6 class="left m-det-team">${away.shortName}</h6>
                    </div>
                    <div class="col s2 m2">
                      <h6 class="left m-det-point">${
                        data.head2head.awayTeam.losses
                      }</h6>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        `;
          document.getElementById("matches-detail").innerHTML = detailMatchHTML;
          document.getElementById("preloader").innerHTML = "";
        },
      });
    },
  });
};

export { resultHighlightJSON, resultMatchJSON, resultDetailMatchJSON };
