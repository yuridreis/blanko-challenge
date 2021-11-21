document.addEventListener("DOMContentLoaded", () => {
    getUsers(URL);

    document.querySelector("#create-user").addEventListener("click", ()=> {
        document.querySelector(".fade").classList.toggle("fade-off");
    });

    document.querySelectorAll(".close")[0].addEventListener("click", function(i){
        i.preventDefault();
        document.querySelector(".fade").classList.toggle("fade-off");
    });
    
    document.querySelectorAll(".close")[1].addEventListener("click", function(i){
        i.preventDefault();
        document.querySelector(".fade-edit").classList.toggle("fade-off");
    });

    document.querySelectorAll(".send")[0].addEventListener("click", function(i) {
        i.preventDefault();
        let name = document.querySelector("#form-name").value;
        let email = document.querySelector("#form-email").value;
        createUser(name, email)
    });

    document.querySelectorAll(".send")[1].addEventListener("click", function(i) {
        i.preventDefault();
        let name = document.querySelector("#edit-name").value;
        let email = document.querySelector("#edit-email").value;
        let id = document.querySelector("#edit-id").value;
        editUserAction(id, name, email);
    });
});

const URL = "http://localhost:3333/";

const getUsers = async URL => {
    try {
        const users = await fetch(URL, {
            method: 'GET'
        });

        const data = await users.json()
        
        data.forEach(user => {
            createRow(user);
        });



    } catch (error) {
        console.log(error);
    }
}

const createRow = (user) => {
    let row = document.createElement("tr");
    const table = document.querySelector("table tbody");
    let {id, name, email} = user;
    row.innerHTML = `<td>${name}</td><td>${email}</td>`;
    row.append(actionSection(id));
    table.append(row);
}

const actionSection = id => {
    let actionSection = document.createElement("td");
    
    actionSection.innerHTML =`
        <span class="edit">Editar</span>
        <span class="delete">Deletar</span>`;

    actionSection.classList.add("buttons");
    actionSection.id = id;

    actionSection.querySelector(".edit").addEventListener("click", function () {
        let id = this.parentNode.id;
        editUser(id);
    });

    actionSection.querySelector(".delete").addEventListener("click", function () {
        let id = this.parentNode.id;
        deleteUser(id);
    });

    return actionSection;
}

const editUser = id => {
    document.querySelector(".fade-edit").classList.toggle("fade-off");
    document.querySelector("#edit-name").value = document.getElementById(id).parentNode.querySelectorAll("td")[0].innerHTML;
    document.querySelector("#edit-email").value = document.getElementById(id).parentNode.querySelectorAll("td")[1].innerHTML;
    document.querySelector("#edit-id").value = id;
}

const editUserAction =  async (id, name, email) => {
    try {
        const result = await fetch(URL, {
            method: 'PUT',
            body: JSON.stringify({
                "id": id, 
                "name": name,
                "email": email
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        });

        const data = await result.json()
        
        if(data) {
            alert("Usuário editado com sucesso!");
            document.querySelector(".fade-edit").classList.toggle("fade-off");
            document.getElementById(id).parentNode.querySelectorAll("td")[0].innerHTML = name;
            document.getElementById(id).parentNode.querySelectorAll("td")[1].innerHTML = email;
        }
    } catch (error) {
        console.log(error);
    }
}

const deleteUser = async id => {
    try {
        const result = await fetch(URL, {
            method: 'DELETE',
            body: JSON.stringify({
                "id": id
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        });

        const data = await result.json()
        
        if(data) {
            document.getElementById(`${id}`).parentNode.remove();
        }
    } catch (error) {
        console.log(error);
    }
}

const createUser = async (name, email) => {
    try {
        const result = await fetch(URL, {
            method: 'POST',
            body: JSON.stringify({
                "name": name,
                "email": email
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        });

        const data = await result.json()
        
        if(data) {
            alert("Usuário criado com sucesso!");
            document.querySelector(".fade").classList.toggle("fade-off");
            createRow(data)
        }
    } catch (error) {
        console.log(error);
    }
}