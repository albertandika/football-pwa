function getViewTeamPremierLeague(data) {
    var TeamsHTML = '';
    data.teams.map(function (team) {
        TeamsHTML += `
                <div class="col s12 m4">
                    <div class="card">
                        <div class="card-image waves-effect waves-block waves-light">
                            <img class="activator img-home" src="${team.crestUrl.replace(/^http:\/\//i, 'https://')}" >
                        </div>
                        <div class="card-content">
                           <p class="green"> ${team.name}</p>
                        </div>
                        <div class="card-reveal ">
                        <span class="card-title grey-text text-darken-4">
                            ${team.shortName}
                            <i class="material-icons right">close</i>
                        </span>
                        <div class="divider"></div>
                            
                            <div class="row">
                                <div class="col s12 m3"><p>Address</p></div>
                                <div class="col s12 m9"><p>${team.address}</p></div>
                            </div>
                            <div class="divider"></div> 
                            <div class="row">
                                <div class="col s12 m3 "><p>Venue</p></div>
                                <div class="col s12 m9"><p>${team.venue}</p></div>
                            </div>
                            <div class="divider"></div>
                            <div class="row">
                                <div class="col s12 m3 "><p>Phone</p></div>
                                <div class="col s12 m9"><p>${team.phone}</p></div>
                            </div>
                            <div id="addToFavorit">
                                <a class="btn blue waves-effect" href="./detail-team.html?id=${team.id}">
                                     Detail
                                </a>
                            </div>
                            
                        </div>
                    </div>
                </div>
        `
    });
    document.getElementById("all-teams").innerHTML = TeamsHTML;
}