function getViewStanding(data) {
    let teamStanding = '';
    let i = 0;
    data.standings[0].table.map(function (standing) {
        i++;
        teamStanding += `
                <tr>
                    <td>${i}.</td>
                    <td><img src="${standing.team.crestUrl.replace(/^http:\/\//i, 'https://')}" width="30px" alt="badge"/></td>
                    <td>
                    <a href="#">${standing.team.name}</a>
                    </td>
                    <td class="center">${standing.won}</td>
                    <td class="center">${standing.draw}</td>
                    <td class="center">${standing.lost}</td>
                    
                    <td class="center">${standing.goalsFor}</td>
                    <td class="center">${standing.goalsAgainst}</td>
                    <td class="center">${standing.goalDifference}</td>
                    <td class="center"> ${standing.points}</td>
                </tr>
        `;
    });
    document.getElementById("standing-teams").innerHTML = teamStanding;
}