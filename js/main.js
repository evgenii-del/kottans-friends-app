let friendsArr = [];
const main = document.querySelector(".js-main");
const filter = document.querySelector(".js-filter");
const gender = document.querySelector(".js-gender");
const age = document.querySelector(".js-age");
const name = document.querySelector(".js-name");
const reset = document.querySelector(".js-reset");


const renderItem = (friends) => {
    main.innerHTML = "";
    let fragment = document.createDocumentFragment();
    friends.forEach((friend) => {
        const block = document.createElement('li');
        block.innerHTML = `
        <p>photo</p>
        <p>${friend.name.first} ${friend.name.last}</p>
        <p>${friend.dob.age}</p>
        <p>${friend.gender}</p>
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
    fetch('https://randomuser.me/api/?inc=gender,name,phone,dob&results=5', headers)
        .then(response => response.json())
        .then(response => friendsArr = response.results)
        .finally(() => renderItem(friendsArr));
}

const filterBySearch = (value) => {
    let newFriendsArr = friendsArr.filter(friend => {
        const name = `${friend.name.first.toLowerCase()} ${friend.name.last.toLowerCase()}`;
        return name.includes(value);
    })
    renderItem(newFriendsArr);
}

const filterBySex = (sex) => {
    if (sex === 'male') {
        let newFriendsArr = friendsArr.filter(friend => friend.gender === 'male');
        renderItem(newFriendsArr);
    } else if (sex === 'female') {
        let newFriendsArr = friendsArr.filter(friend => friend.gender === 'female');
        renderItem(newFriendsArr);
    } else {
        renderItem(friendsArr);
    }
}

const sortByAge = (type) => {
    let newFriendsArr = [...friendsArr].sort((prev, next) => prev.dob.age - next.dob.age);
    if (type === 'asc') {
        renderItem(newFriendsArr);
    } else if (type === 'des') {
        renderItem(newFriendsArr.reverse());
    }
}

const sortByName = (type) => {
    let newFriendsArr = [...friendsArr].sort((prev, next) => {
        if (prev.name.first < next.name.first) return -1;
        if (prev.name.first < next.name.first) return 1;
    });
    if (type === 'abc') {
        renderItem(newFriendsArr);
    } else if (type === 'cba') {
        renderItem(newFriendsArr.reverse());
    }
}

document.addEventListener("DOMContentLoaded", () => {
    getUsers();

    document.querySelector('.js-search').addEventListener('keyup', (event) =>
        filterBySearch(event.target.value.toLowerCase())
    );

    gender.addEventListener('change', (event) => filterBySex(event.target.value));

    age.addEventListener('change', (event) => sortByAge(event.target.value));

    name.addEventListener('change', (event) => sortByName(event.target.value));

    reset.addEventListener('click', () => renderItem(friendsArr));
})
