const resultDetailTeamJSON = (data) => {
  data = JSON.parse(JSON.stringify(data).replace(/http:/g, "https:"));

  document.getElementById("logoTeam").src = data.crestUrl;
  document.getElementById("logoTeam").alt = data.shortName;
  document.getElementById("nameTeam").innerHTML = data.name;
  document.getElementById("foundedTeam").innerHTML = data.founded;
  document.getElementById("venueTeam").innerHTML = data.venue;
  document.getElementById("addressTeam").innerHTML = data.address;
  document.getElementById("websiteTeam").innerHTML = data.website;

  document.getElementById("preloader").innerHTML = "";
};

const resultTeamFav = (data) => {
  let detailTeamFavHTML = "";
  data.forEach(function (team) {
    // Objek JavaScript dari response.json() masuk lewat variabel data.
    console.dir("setupTeamFavHtml: " + team.name);

    detailTeamFavHTML += `
    <li class="collection-item avatar">
      <a href="./detailTeam.html?id=${team.id}&saved=true">
        <img
          src="${team.crestUrl}"
          alt="${team.shortName}"
          class="circle"
        />
        <span class="title f-title">${team.name}</span>
      </a>
      <p>
        ${team.venue} <br />
        <a href="${team.website}"
          >${team.website}</a
        >
      </p>
    </li>               
    `;
    document.getElementById("team-fav").innerHTML = detailTeamFavHTML;
  });
};

export { resultDetailTeamJSON, resultTeamFav };
