const main = document.querySelector(".js-main");

const renderItem = (friends) => {
    console.log(friends);

    let fragment = document.createDocumentFragment();

    friends.forEach((friend, index) => {
        const block = document.createElement('li');
        block.innerHTML = `
        <p>photo</p>
        <p>${friend.name.first} ${friend.name.last}</p>
        <p>${friend.dob.age}</p>
        <p>${friend.phone}</p>
        </br>
        `;
        fragment.append(block);
    })

    main.append(fragment);
}

const getUsers = () => {
    const headers = {
        dataType: 'json'
    }
    fetch('https://randomuser.me/api/?results=5', headers)
        .then(response => response.json())
        .then(response => renderItem(response.results));
}

getUsers();
