let friendsArr = [];
const main = document.querySelector(".js-main");
const gender = document.querySelector(".js-gender");
const age = document.querySelector(".js-age");
const name = document.querySelector(".js-name");
const reset = document.querySelector(".js-reset");


const createBlock = (friend) => {
    const block = document.createElement("div");
    block.classList.add("card");
    block.innerHTML = `
                <div class="card__img">
                    <img src="${friend.picture.medium}" alt="avatar">
                </div>
                <div class="card__content">
                    <div class="card__top">
                        <p>Name: ${friend.name.first}</p>
                        <p>Surname: ${friend.name.last}</p>
                    </div>
                    <div>
                        <p>Number:</p>
                        <p>${friend.phone}</p>
                    </div>
                    <div class="card__bottom">
                        <p>Age: ${friend.dob.age}</p>
                        <p>Gender: ${friend.gender}</p>
                    </div>
                </div>
        `;
    return block;
}

const renderItem = (friends) => {
    main.innerHTML = "";
    let fragment = document.createDocumentFragment();
    friends.forEach((friend) => {
        const block = createBlock(friend);
        fragment.append(block);
    })
    main.append(fragment);
}

const getUsers = () => {
    const headers = {
        dataType: 'json'
    }
    fetch('https://randomuser.me/api/?inc=gender,name,phone,dob,picture&results=12', headers)
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

    document.querySelector('.js-search').addEventListener('keyup', ({target}) =>
        filterBySearch(target.value.toLowerCase())
    );

    gender.addEventListener('change', ({target}) => filterBySex(target.value));

    age.addEventListener('change', ({target}) => sortByAge(target.value));

    name.addEventListener('change', ({target}) => sortByName(target.value));

    reset.addEventListener('click', () => renderItem(friendsArr));
})


