function detailPlayers(response) {
    let headHTML = `
        <div class="row">
            <div class="col s12 m5 left-align">
                <h4>
                    ${response.head2head.homeTeam.name} 
                </h4>
                <span>HOME</span>
                <div style="position: absolute">
                    <span class="new badge red" data-badge-caption="L">${response.head2head.homeTeam.losses}</span>
                    <span class="new badge yellow" data-badge-caption="D">${response.head2head.homeTeam.draws}</span>
                    <span class="new badge green" data-badge-caption="W">${response.head2head.homeTeam.wins}</span>
                    
                </div>
            </div>
            <div class="col s12 m2 center-align">
                <h5> VS </h5>   
            </div>
            <div class="col s12 m5 right-align">
                <h4>
                    ${response.head2head.awayTeam.name}
                </h4>
                <span>AWAY</span>
                <div>
                    <span class="new badge red" data-badge-caption="L">${response.head2head.awayTeam.losses} </span>
                    <span class="new badge yellow" data-badge-caption="D">${response.head2head.awayTeam.draws} </span>
                    <span class="new badge green" data-badge-caption="W">${response.head2head.awayTeam.wins} </span>
                </div>
            </div>
        </div>
        `;
    let matchHTML = `
        <h6 class="center-align">Matchday: ${response.match.matchday}</h6>
        <div class="center-align">${response.match.group}</div>   
        <div class="row left-align">
            <div class="col s12 m2 f-500">
                Competition
            </div>
            <div class="col s12 m9">
                ${response.match.competition.name}
            </div>
        </div>
        <div class="row left-align">
            <div class="col s12 m2 f-500">
                Venue
            </div>
            <div class="col s12 m9">
                ${response.match.venue}
            </div>
        </div>
    `;
    document.getElementById("head-to-head-details").innerHTML = headHTML;
    document.getElementById("match-details").innerHTML = matchHTML;
}


