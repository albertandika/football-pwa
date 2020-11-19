document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const id = Number(urlParams.get("id"));

    const save = document.getElementById("save");
    const saved = document.getElementById("delete");

    const item = getDetailTeamById();

    exist(id)
        .then((msg) => {
            console.log(msg);
            save.style.display = 'none';
            saved.style.display = 'block';
        }).catch((msg) => {
            console.log(msg);
            save.style.display = 'block';
            saved.style.display = 'none';
        })

    save.onclick = () => {
        item.then(team => {
            addTeam(team)
            M.toast({ html: `team berhasil di simpan` })
            save.style.display = 'none';
            saved.style.display = 'block';
        });
    };

    saved.onclick = () => {
        deleteTeam(id);
        M.toast({ html: `berhasil di hapus` })
        save.style.display = 'block';
        saved.style.display = 'none';
    };

});