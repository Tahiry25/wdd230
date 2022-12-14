let path = window.location.pathname

function toggleMenu() {
  // alert('test');
  document.getElementById("primaryNav").classList.toggle("open");
}

const x = document.getElementById("hamburgerBtn");
x.onclick = toggleMenu;

let date = new Date().toUTCString();
document.getElementById("current").innerHTML = date;

// Lazy loading
const images = document.querySelectorAll("[data-src]");

function preloadImage(img) {
  const src = img.getAttribute("data-src");
  if (!src) {
    return;
  }

  img.src = src;
}

const imgOptions = {
  threshold: 1,
  rootMargin: "0px 0px 100px 0px",
};
const imgObserver = new IntersectionObserver((entries, imgObserver) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      return;
    } else {
      preloadImage(entry.target);
      imgObserver.unobserve(entry.target);
    }
  });
}, imgOptions);

images.forEach((image) => {
  imgObserver.observe(image);
});

// visit count
const today = new Date();
const userStat = {};
userStat.currentDate = today;
let visited = ""
if (localStorage.getItem("visited")) {
  	visited += localStorage.getItem("visited");
} else {
	localStorage.setItem("visited", today)
	visited += localStorage.getItem("visited");
}


function dateDiffInDays(a, b) {
  const _MS_PER_DAY = 1000 * 60 * 60 * 24;
  // Discard the time and time-zone information.
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
  return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}

difference = dateDiffInDays(new Date(visited), today);

document.getElementById("visit_count").textContent = difference;


// Join page

function changeState() {
  let choice = document.querySelector("select#mlevel").value;
  console.log(choice + "_pkg");
  document.querySelectorAll(".membership_grid > *")[0].style.backgroundColor =
  document.querySelectorAll(".membership_grid > *")[1].style.backgroundColor =
  document.querySelectorAll(".membership_grid > *")[2].style.backgroundColor =
  document.querySelectorAll(".membership_grid > *")[3].style.backgroundColor =
    "transparent";

  document.querySelector(`#${choice}_pkg`).style.backgroundColor = "#25A55F";
}

if (path.includes('join')) {
  document.querySelector('input#date').value = new Date()
  const selectElmnt = document.querySelector('select#mlevel')
  selectElmnt.onchange = changeState;
}

// Directory page
const requestURL =
  "../chamber/json/directory.json";

fetch(requestURL)
  .then((res) => res.json())
  .then((data) => {
    const list = data;
    return list;
  })
  .then((list) => {
    localStorage.setItem("list", JSON.stringify(list));
    if (path.includes('directory')) {
      addTiles(list);
    }
  });

function addTiles(array) {
  const main = document.querySelector(".directory main");
  main.classList.add('cards');
  const cards = document.querySelector(".directory .cards");
  array.forEach((list) => {
    let node = document.createElement("div");

    // name
    let name = document.createElement("h2");
    name.textContent = list["name"];
    node.appendChild(name);

    // Profile image
    let image = document.createElement("img");
    image.setAttribute("src", list["logo"]);
    image.setAttribute(
      "alt",
      `${list["name"]}`
    );
    node.appendChild(image);

    // Phone Number
    let number = document.createElement("p");
    number.textContent = "Phone: " + list["phone"];
    node.appendChild(number);

    // Address
    let address = document.createElement("p");
    address.textContent = list["address"];
    node.appendChild(address);

    cards.appendChild(node);
  });
}

function addList(array) {
  const main = document.querySelector(".directory main");
  main.classList.add("list");

  array.forEach((list) => {
    let node = document.createElement("div");
    let nodeChild = document.createElement('div')
    // image
    let image = document.createElement("img");
    image.setAttribute("src", list["logo"]);
    image.setAttribute("alt", `${list["name"]}`);
    image.setAttribute("width", "150");
    node.appendChild(image);

    // name
    let name = document.createElement("h2");
    name.textContent = list["name"];
    nodeChild.appendChild(name);

    // Phone Number
    let number = document.createElement("p");
    number.textContent = "Phone: " + list["phone"];
    nodeChild.appendChild(number);

    // Address
    let address = document.createElement("p");
    address.textContent = `Address ${list["address"]}`;
    nodeChild.appendChild(address);

    node.appendChild(nodeChild)

    main.appendChild(node);
  })
}

function tiles(array) {
  let elmt = document.querySelector(".directory main");
  elmt.classList.remove("list");
  elmt.innerHTML = "";
  addTiles(array)
}

function list(array) {
  let elmt = document.querySelector(".directory main");
  elmt.classList.remove('cards')
  elmt.innerHTML = "";
  addList(array);
}