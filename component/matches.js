function resultMatchinSeason(data) {
    let MatchesHTML = '';
    data.matches.map(function (matches) {
        MatchesHTML += `
                <div class="row mb-1">
                    <div class="col s5 right-align">
                        <span class="">${matches.homeTeam.name}</span>
                    </div>
                    <div class="col s2 ">
                    VS
                    </div>
                    <div class="col s5 left-align">
                        <span > ${matches.awayTeam.name}</span>
                    </div> 
                </div>
                <div class="row">
                    <div class="col s12 center-align">
                        <span >${matches.utcDate}</span>
                    </div> 
                    <div class="col s12 center-align">
                        <a class="waves-effect waves-light btn-small" href="./detail-match.html?id=${matches.id}">Detail</a>
                    </div> 
                </div>  
        `
    });
    document.getElementById("schedule-match").innerHTML = MatchesHTML;
}