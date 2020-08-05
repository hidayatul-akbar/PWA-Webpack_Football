const resultKlasemenJSON = (data) => {
  let tabelKlasemenHtml = "";
  data.standings.forEach(function (klasemen) {
    let dataTabelKlasemen = "";
    //console.log("cek panjang klasemen table: " + klasemen.table.length)

    klasemen.table.forEach(function (club) {
      club = JSON.parse(JSON.stringify(club).replace(/http:/g, "https:"));

      console.log("cek url logo club: " + club.team.crestUrl);

      dataTabelKlasemen += `
              <tr>
                <td class="center-align">${club.position}</td>
                <td>
                  <!-- Modal Trigger -->
                  <a href="./detailTeam.html?id=${club.team.id}"
                    ><span class="hide-on-small-only valign-wrapper">
                        <img
                          class="show-on-large hide-on-med-and-down"
                          src="${club.team.crestUrl}"
                          alt="logo club"
                        />
                        ${club.team.name}
                      </span>
                      <span class="hide-on-med-and-up">
                        ${club.team.name}
                      </span></a
                  >
                </td>
                <td class="center-align">${club.playedGames}</td>
                <td class="center-align">${club.won}</td>
                <td class="center-align">${club.draw}</td>
                <td class="center-align">${club.lost}</td>
                <td class="center-align s-bold">${club.points}</td>
              </tr>
            `;
    });

    tabelKlasemenHtml +=
      `      
            
            <table class="striped highlight">
              <thead>
                <tr>
                  <th class="center-align">
                    <span class="hide-on-small-only show-on-medium-and-up">
                      Position
                    </span>
                    <span class="hide-on-med-and-up">
                      Pos
                    </span>
                  </th>
                  <th>Team</th>
                  <th class="center-align">Played</th>
                  <th class="center-align">
                    <span class="hide-on-small-only show-on-medium-and-up">
                      Won
                    </span>
                    <span class="hide-on-med-and-up">
                      W
                    </span>
                  </th>
                  <th class="center-align">
                    <span class="hide-on-small-only show-on-medium-and-up">
                      Draw
                    </span>
                    <span class="hide-on-med-and-up">
                      D
                    </span>
                  </th>
                  <th class="center-align">
                    <span class="hide-on-small-only show-on-medium-and-up">
                      Lost
                    </span>
                    <span class="hide-on-med-and-up">
                      L
                    </span>
                  </th>
                  <th class="center-align">
                    <span class="hide-on-small-only show-on-medium-and-up">
                      Points
                    </span>
                    <span class="hide-on-med-and-up">
                      P
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody class="s-info">` +
      dataTabelKlasemen +
      `</tbody>
            </table>
          
          `;
  });

  // Sisipkan komponen card ke dalam elemen dengan id tabelKlasemen
  document.getElementById("tabelKlasemen").innerHTML = tabelKlasemenHtml;
  document.getElementById("preloader").innerHTML = "";
};

const resultKlasemenFullJSON = (data) => {
  let tabelKlasemenHtml = "";
  data.standings.forEach(function (klasemen) {
    let dataTabelKlasemen = "";
    //console.log("cek panjang klasemen table: " + klasemen.table.length)

    klasemen.table.forEach(function (club) {
      club = JSON.parse(JSON.stringify(club).replace(/http:/g, "https:"));

      console.log("cek url logo club: " + club.team.crestUrl);

      dataTabelKlasemen += `
              <tr>
                <td class="center-align">${club.position}</td>
                <td>
                  <!-- Modal Trigger -->
                  <a href="./detailTeam.html?id=${club.team.id}"
                    ><span class="hide-on-small-only valign-wrapper">
                        <img
                          class="show-on-large hide-on-med-and-down"
                          src="${club.team.crestUrl}"
                          alt="logo club"
                        />
                        ${club.team.name}
                      </span>
                      <span class="hide-on-med-and-up">
                        ${club.team.name}
                      </span></a
                  >
                </td>
                <td class="center-align">${club.playedGames}</td>
                <td class="center-align">${club.won}</td>
                <td class="center-align">${club.draw}</td>
                <td class="center-align">${club.lost}</td>
                <td class="center-align">${club.goalsFor}</td>
                <td class="center-align">${club.goalsAgainst}</td>
                <td class="center-align">${club.goalDifference}</td>
                <td class="center-align s-bold">${club.points}</td>
              </tr>
            `;
    });

    tabelKlasemenHtml +=
      `      
            
            <table class="striped highlight responsive-table">
              <thead>
                <tr>
                  <th class="center-align">
                    <span class="hide-on-small-only show-on-medium-and-up">
                      Position
                    </span>
                    <span class="hide-on-med-and-up">
                      Pos
                    </span>
                  </th>
                  <th>Team</th>
                  <th class="center-align">Played</th>
                  <th class="center-align">
                    <span>
                      Won
                    </span>
                    
                  </th>
                  <th class="center-align">
                    <span>
                      Draw
                    </span>
                    
                  </th>
                  <th class="center-align">
                    <span>
                      Lost
                    </span>
                    
                  </th>
                  <th class="center-align">GF</th>
                  <th class="center-align">GA</th>
                  <th class="center-align">GD</th>
                  <th class="center-align">
                    <span>
                      Points
                    </span>
                    
                  </th>
                </tr>
              </thead>
              <tbody class="s-info">` +
      dataTabelKlasemen +
      `</tbody>
            </table>
          
          `;
  });

  // Sisipkan komponen card ke dalam elemen dengan id tabelKlasemen
  document.getElementById("tabelKlasemenFull").innerHTML = tabelKlasemenHtml;
  document.getElementById("preloader").innerHTML = "";
};

const resultTopScorerJSON = (data) => {
  let topScorerHTML = "";
  let dataTopScorerHTML = "";
  let player = data.scorers;
  for (let i = 0; i < data.count; i++) {
    // data.scorers.forEach(function(player) {
    dataTopScorerHTML += `
    <tr>
      <td class="center-align">${[i + 1]}</td>
      <td>
        <!-- Modal Trigger -->
        <a href="./detailPlayer.html?id=${player[i].player.id}">
          <span>${player[i].player.name}</span>
        </a>
      </td>
      <td>
        <span class="hide-on-small-only show-on-medium-and-up">
          ${player[i].team.name}
        </span>
        <span class="hide-on-med-and-up">
        ${player[i].team.name}
        </span>
      </td>
      
      <td class="center-align s-bold">${player[i].numberOfGoals}</td>
    </tr>
    `;
  }
  topScorerHTML +=
    `
  <table class="striped highlight">
    <thead>
      <tr>
        <th class="center-align">
          <span class="hide-on-small-only show-on-medium-and-up">
            Position
          </span>
          <span class="hide-on-med-and-up">
            Pos
          </span>
        </th>
        <th>
          <span class="hide-on-small-only show-on-medium-and-up">
            Player Name
          </span>
          <span class="hide-on-med-and-up">
            Name
          </span>
        </th>
        <th>Team</th>
        
        <th class="center-align">
          <span>
            Goals
          </span>
          
        </th>
      </tr>
    </thead>
    <tbody class="s-info s-info-p">` +
    dataTopScorerHTML +
    `
    </tbody>
  </table>
  `;
  document.getElementById("topScorer").innerHTML = topScorerHTML;
  document.getElementById("preloader").innerHTML = "";
};

export { resultKlasemenJSON, resultKlasemenFullJSON, resultTopScorerJSON };
