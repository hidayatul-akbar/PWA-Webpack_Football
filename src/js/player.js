import { convertUTCDate, time } from "./convertDate";

const resultDetailPlayerJSON = (data) => {
  document.getElementById("name").innerHTML = data.name;
  if (data.shirtNumber === null) {
    data.shirtNumber = "-";
  }
  document.getElementById("shirtNumber").innerHTML = data.shirtNumber;
  document.getElementById("nationality").innerHTML = data.nationality;
  document.getElementById("countryOfBirth").innerHTML = data.countryOfBirth;
  document.getElementById("dateOfBirth").innerHTML = convertUTCDate(
    new Date(data.dateOfBirth)
  );
  document.getElementById("position").innerHTML = data.position;

  document.getElementById("preloader").innerHTML = "";
};

// Favorite
const resultPlayerFav = (data) => {
  let dataPlayerFavHTML = "";
  data.forEach((player) => {
    console.dir("cek nama pemain: " + player.name);
    dataPlayerFavHTML += `
    <li class="collection-item avatar">
      <a href="./detailPlayer.html?id=${player.id}&saved=true">
        <img
          src="./images/player.svg"
          alt="Player Image"
          class="circle"
        />
        <span class="title f-title">${player.name}</span>
      </a>
      <p>
        ${player.position} <br />
        ${player.nationality}
      </p>
    </li>
    `;
    document.getElementById("player-fav").innerHTML = dataPlayerFavHTML;
  });
};

export { resultDetailPlayerJSON, resultPlayerFav };
