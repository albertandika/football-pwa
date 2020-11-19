function detailTeams(data) {
    data = JSON.parse(JSON.stringify(data).replace(/http:/g, 'https:'));
    showSquadTeam(data);
    document.getElementById("img-club").src = data.crestUrl;
    document.getElementById("name-club").innerHTML = data.name;
    let info = `
        <div class="container">
            <div class="row mb-1">
                <div class="col s12 m3">
                    Short Name
                </div>
                <div class="col s12 m9">
                    : ${data.shortName}
                </div>
            </div>
            <div class="row mb-1">
                <div class="col s12 m3">
                    Address
                </div>
                <div class="col s12 m9">
                    : ${data.address}
                </div>
            </div>
            <div class="row mb-1">
                <div class="col s12 m3">
                    Club Colors
                </div>
                <div class="col s12 m9">
                    : ${data.clubColors}
                </div>
            </div>
            <div class="row mb-1">
                <div class="col s12 m3">
                    Email
                </div>
                <div class="col s12 m9">
                    : ${data.email}
                </div>
            </div>
            <div class="row mb-1">
                <div class="col s12 m3">
                    Phone
                </div>
                <div class="col s12 m9">
                    : ${data.phone}
                </div>
            </div>
            <div class="row mb-1">
                <div class="col s12 m3">
                    Venue
                </div>
                <div class="col s12 m9">
                    : ${data.venue}
                </div>
            </div>
            <div class="row mb-1">
                <div class="col s12 m3">
                    Website
                </div>
                <div class="col s12 m9">
                    : <a href="${data.website}">${data.website}</a>
                </div>
            </div>
            <div class="row mb-1">
                <div class="col s12">
                    <ul class="collection with-header">
                        <li class="collection-header"><h5>Competitive Active</h3></li>
                        ${competitive(data.activeCompetitions)}
                    </ul>
                </div>

            </div>

        </div>
    `
    document.getElementById("club-details").innerHTML = info;
}

function competitive(data) {
    let teams = ''
    data.map(function (list, index) {
        teams += `<li class="collection-item">${index + 1}. ${list.name}</li>`
    })
    return teams
}

function showSquadTeam(data) {
    let squadHTML = ''
    data.squad.map(function (response, index) {
        squadHTML += `
        <tr>
            <td>${index + 1}. </td>
            <td>
                <a href="./player.html?id=${response.id}">${response.name}</a>
            </td>
            <td>${response.position}</td>
            <td>${response.countryOfBirth}</td>
        </tr>`
    });
    document.getElementById("squad-team").innerHTML = squadHTML;
}

