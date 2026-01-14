// Pets list.
var pets = [];

var shop_items = {
  pets: [
    {
      id: 1,
      name: 'Tom',
      sex: 'male',
      price: 100000,
      category: 'pet',
      image: './assets/images/2172.jpg',
    },
    {
      id: 2,
      name: 'Tabby',
      sex: 'female',
      price: 100000,
      category: 'pet',
      image: './assets/images/18961869.jpg',
    },
    {
      id: 3,
      name: 'Tabby',
      sex: 'female',
      price: 100000,
      category: 'pet',
      image: './assets/images/2170.jpg',
    },
    {
      id: 4,
      name: 'Tabby',
      sex: 'female',
      price: 100000,
      category: 'pet',
      image: './assets/images/2210.jpg',
    },
    {
      id: 5,
      name: 'Tabby',
      sex: 'female',
      price: 100000,
      category: 'pet',
      image: './assets/images/2296.jpg',
    },
    {
      id: 6,
      name: 'Tabby',
      sex: 'female',
      price: 100000,
      category: 'pet',
      image: './assets/images/18354595.jpg',
    },
  ],
  foods: [
    {
      id: 3,
      name: 'Cat\'s food',
      price: 30000,
      category: 'food',
    }, {
      id: 4,
      name: 'Cat\'s treat',
      price: 22000,
      category: 'food',
    }, 
  ]
}

class TutorialOptions {
  identifier;
  maxIdentifier;
  constructor() {
    this.maxIdentifier = 1;
  }
}

const VIRTUAL_APP_CONSTANT = {
  MAXIMUM_PET_COUNT: 4,
  MAXIMUM_FOOD_COUNT: 100,
}

// Default user
let currentUserCoin = 220000;
let currentUserFood = 50;
let currentUserPets = 0;

const localBrowserData = localStorage.getItem('virtualpet');

if(localBrowserData != null) {
  const {pets: petsOnStorage, user} = JSON.parse(localBrowserData);
  pets = petsOnStorage;
  currentUserCoin = user.currentUserCoin;
  currentUserFood = user.currentUserFood;
  currentUserPets = user.currentUserPets;
}

// Sweetalert toast.
const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})

const storeButton = document.getElementById('storeButton');
const storeSection = document.getElementById('storeSection');
const petsSection = document.getElementById('petsSection');
const petLists = document.getElementById('petLists');
const EmptyPetStatePage = document.getElementById('EmptyPetStatePage');
const EmptyPetStateButton = document.getElementById('EmptyPetStateButton');
const Store_backButton = document.getElementById('Store_backButton');

// const logoutButton = document.getElementById('logoutButton');

logoutButton.addEventListener('click', function() {
  localStorage.clear();
  window.location.reload();
});

EmptyPetStateButton.addEventListener('click', function() {
  storeButton.click();
})

storeButton.addEventListener('click', function() {
  storeSection.classList.remove('hidden');
  EmptyPetStatePage.classList.add('hidden');
  petsSection.classList.add('hidden');
});

Store_backButton.addEventListener('click', function() {
  storeSection.classList.add('hidden');

  if (pets.length > 0) {
    petsSection.classList.remove('hidden');
  } else {
    EmptyPetStatePage.classList.remove('hidden');
  }
})

// Refresh daftar hewan peliharaan
function refreshPetList() {
  if(document.getElementById('petLists') != undefined && pets.length != 0) {
    petLists.innerHTML = '';
    
    EmptyPetStatePage.classList.add('hidden');
    petsSection.classList.remove('hidden');

    for (let i = 0; i < pets.length; i++) {
      const item = pets[i];
      const itemNode = document.createElement('div');
      itemNode.classList.add('pet', 'relative', 'item', 'bg-gray-400', 'shadow')

      const petNickname = document.createElement('div');
      petNickname.innerText = item.nickname;
      petNickname.classList.add('text-center', 'text-gray-900', 'text-2xl');

      itemNode.appendChild(petNickname);

      const itemImage = document.createElement('img');
      itemImage.src = item.image;
      itemImage.classList.add('w-full', 'cursor-pointer')
      itemImage.addEventListener('click', function() {

        if (item.happiness + 1 > 100) {
          item.happiness = 100;
        } else {
          item.happiness = item.happiness + 1;
        }

        pettingPetSound.play();
      })
      itemNode.appendChild(itemImage);

      const petStats = document.createElement('div');
      petStats.classList.add('flex', 'flex-row', 'p-4', 'space-x-2');

      const petName = document.createElement('div');
      petName.innerText = item.nickname;

      const petStatsHealth = document.createElement('div');
      petStatsHealth.innerHTML = `<div class="flex flex-col"><span>Health</span><span>${item.health}</span></div>`;
      const petStatsEnergy = document.createElement('div');
      petStatsEnergy.innerHTML = `<div class="flex flex-col"><span>Energy</span><span>${Math.round(item.energy)}</span></div>`;
      const petStatsCleanliness = document.createElement('div');
      petStatsCleanliness.innerHTML = `<div class="flex flex-col"><span>Cleanliness</span><span>${Math.round(item.cleanliness)}</span></div>`;
      const petStatsHappiness = document.createElement('div');
      petStatsHappiness.innerHTML = `<div class="flex flex-col"><span>Happiness</span><span>${Math.round(item.happiness)}</span></div>`;

      petStats.append(petStatsHealth, petStatsEnergy, petStatsCleanliness, petStatsHappiness)

      itemNode.appendChild(petStats);

      const buttonActionGroup = document.createElement('div');
      buttonActionGroup.classList.add('flex', 'flex-row', 'justify-center', 'p-4', 'space-x-2');

      const giveFoodButton = document.createElement('button');
      giveFoodButton.className = 'py-2 px-4 border-l border-t border-r border-b-4 border-gray-600 leading-tight rounded bg-white text-gray-900 focus:shadow focus:outline-none'
      giveFoodButton.appendChild(document.createTextNode('Feed 🍴'));

      giveFoodButton.addEventListener('click', function() {
        feedPetSound.play();

        if (currentUserFood <= 0) {
          Toast.fire({
            position: 'bottom',
            icon: 'error',
            title:' Tidak dapat memberi makan karena stok makanan kamu kosong'
          });
          return;
        }

        currentUserFood = currentUserFood - 3;

        if ((item.energy + 30) <= 100) {
          item.energy = item.energy + 30;
        } else {
          item.energy = 100;
        }

        if ((item.happiness + 30) <= 100) {
          item.happiness = item.happiness + 30;
        } else {
          item.happiness = 100;
        }
      });

      buttonActionGroup.append(giveFoodButton);

      const playButton = document.createElement('button');
      playButton.className = 'py-2 px-4 border-l border-t border-r border-b-4 border-gray-600 leading-tight rounded bg-white text-gray-900 focus:shadow focus:outline-none'
      playButton.appendChild(document.createTextNode('Play 🧶'));

      playButton.addEventListener('click', function() {
        // item.happiness = item.happiness < 100 ? item.happiness + 30 : 100;


        if ((item.happiness + 30) <= 100) {
          item.happiness = item.happiness + 30;
        } else {
          item.happiness = 100;
        }

        item.energy = item.energy > 0 ? item.energy - 10 : 0;
        item.cleanliness = item.cleanliness > 0 ? item.cleanliness - 5 : 0;

        playPetSound.play();
      });

      buttonActionGroup.append(playButton);

      const groomingButton = document.createElement('button');
      groomingButton.className = 'py-2 px-4 border-l border-t border-r border-b-4 border-gray-600 leading-tight rounded bg-white text-gray-900 focus:shadow focus:outline-none'
      groomingButton.appendChild(document.createTextNode('Groom 🧼'));
      groomingButton.addEventListener('click', function() {
        item.cleanliness = 100;
        // item.happiness = item.happiness < 100 ? item.happiness + 1 : 100;

        if ((item.happiness + 30) <= 100) {
          item.happiness = item.happiness + 30;
        } else {
          item.happiness = 100;
        }
        
        groomPetSound.play();
      });

      buttonActionGroup.append(groomingButton);

      itemNode.appendChild(buttonActionGroup);

      petLists.appendChild(itemNode);
    }
  }

  storeSection.classList.add('hidden');
}

function getCurrentUserCoin() {
  return currentUserCoin;
}

const popSound = new Audio('./assets/audio/pop.wav');
const errorSound = new Audio('./assets/audio/error.wav');
const buyNewPetSound = new Audio('./assets/audio/05.mp3');
const feedPetSound = new Audio('./assets/audio/02.mp3');
const pettingPetSound = new Audio('./assets/audio/01.mp3');
const playPetSound = new Audio('./assets/audio/04.mp3');
const groomPetSound = new Audio('./assets/audio/06.mp3');

document.querySelectorAll('button').forEach((item) => {
  item.addEventListener('click', function() {
    popSound.play();
  });
});

// Buat list item di toko
if (document.getElementById('shop_items') != undefined) {
  const shopItemsEl = document.getElementById('shop_items');
  // Buat list shop items
  for (let i = 0; i < shop_items.pets.length; i++) {
    const item = shop_items.pets[i];
    const itemNode = document.createElement('div');
    itemNode.classList.add('relative', 'item', 'bg-gray-400', 'shadow')

    const itemPrice = document.createElement('div');
    itemPrice.classList.add('absolute', 'top-0.5', 'inset-x-0', 'bg-white', 'text-center')
    const itemPriceSpan = document.createElement('span');
    itemPriceSpan.appendChild(document.createTextNode(item.price));
    itemPrice.appendChild(itemPriceSpan);
    itemNode.appendChild(itemPrice);
    
    const itemImage = document.createElement('img');
    itemImage.src = item.image;
    itemImage.classList.add('w-full')
    itemNode.appendChild(itemImage);

    const buyButton = document.createElement('button');
    buyButton.className = 'py-2 px-4 border-b-2 border-green-800 bg-gradient-to-b from-green-500 to-green-600 leading-tight rounded bg-green-600 text-white focus:shadow focus:outline-none'

    buyButton.appendChild(document.createTextNode('Beli'));

    buyButton.addEventListener('click', function() {
      if (getCurrentUserCoin() - item.price < 0) {
        errorSound.play();
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Koin tidak mencukupi!',
        })
        return;
      }

      if (currentUserPets >= 4) {
        errorSound.play();
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Tempat untuk peliharaan kamu sudah penuh!',
        })
        return;
      }

      Swal.fire({
        title: 'Beri nama peliharaan baru kamu',
        input: 'text',
        inputLabel: 'Nama',
        inputPlaceholder: 'Masukkan nama peliharaan kamu',
        inputValidator: (value) => {
          if (!value) {
            return 'Mohon berikan nama peliharaaan kamu!'
          }
        }
      }).then(function(res) {
        if (res.isConfirmed) {
          const newPetName = res.value;
          currentUserCoin = currentUserCoin - item.price;
          currentUserPets = currentUserPets + 1;

          pets.push({
            id: 1,
            owner_id: 2,
            nickname: newPetName,
            biography: '',
            sex: 'male',
            age: 10,
            health: 100,
            happiness: 50,
            energy: 100,
            cleanliness: 100,
            image: item.image
          });

          refreshPetList();
          refreshUserInfo();

          buyNewPetSound.play();

          Toast.fire({
            icon: 'success',
            title: 'Membeli peliharaan baru sukses'
          });

          clearInterval(gameLoopInterval);

          const wt = new Walkthrough();
          let steps = [];

          steps.push({
              title: 'Yay!',
              desc: 'Ini adalah peliharaan virtual yang barusan anda beli...',
              selector: '.pet',
              selectorIndex: 0,
              fixMargin: true,
              fixPadding: true,
          });

          steps.push({
            desc: 'Anda wajib memberi makan peliharaan anda agar peliharaan anda tidak kehabisan energy.',
            selector: '.pet',
            selectorIndex: 0,
            fixMargin: true,
            fixPadding: true,
          })

          steps.push({
            desc: 'Anda dapat mengajaknya bermain agar mood peliharaan anda tetap happy.',
            selector: '.pet',
            selectorIndex: 0,
            fixMargin: true,
            fixPadding: true,
          })

          steps.push({
            desc: 'Jangan lupa untuk memandikannya agar peliharaan kamu tetap bersih.',
            selector: '.pet',
            selectorIndex: 0,
            fixMargin: true,
            fixPadding: true,
          })

          steps.push({
            desc: 'Kamu bisa mengelusnya (dengan mengeklik gambar) untuk membuat peliharaan kamu tetap ceria.',
            selector: '.pet',
            selectorIndex: 0,
            fixMargin: true,
            fixPadding: true,
          })
          
          let options = new TutorialOptions();
          options.identifier = 'new_pet_page';
          options.maxIdentifier = 1;

          wt.setTutorial(steps, options).subscribe(
            () => {
              gameLoopInterval = setInterval(gameIntervalFunc, 1000);
            }
          );

        }
      })
    });

    itemNode.append(buyButton);
    shopItemsEl.appendChild(itemNode);
  }
}

const spanUserCoin = document.getElementById('spanUserCoin');
const spanUserFood = document.getElementById('spanUserFood');
const spanUserPets = document.getElementById('spanUserPets');

function refreshUserInfo() {
  spanUserCoin.innerText = currentUserCoin;
  spanUserFood.innerText = currentUserFood + ' / ' + VIRTUAL_APP_CONSTANT.MAXIMUM_FOOD_COUNT;
  spanUserPets.innerText = currentUserPets + ' / ' + VIRTUAL_APP_CONSTANT.MAXIMUM_PET_COUNT;
}

function saveDataToLocalStorage() {
  localStorage.setItem('virtualpet', JSON.stringify({
    pets,
    user: {
      currentUserCoin,
      currentUserFood,
      currentUserPets,
    }
  }));
}

function decrementPetsStat() {
  pets.forEach(function(pet) {
    pet.cleanliness = pet.cleanliness > 0 ? pet.cleanliness - 0.1 : 0;
    pet.happiness = pet.happiness > 0 ? pet.happiness - 0.1 : 0;
    pet.energy = pet.energy > 0 ? pet.energy - 0.1 : 0;
  });
}

function addFood() {
  if (currentUserFood < VIRTUAL_APP_CONSTANT.MAXIMUM_FOOD_COUNT) {
    currentUserFood = currentUserFood + .5;
  }
}

window.addEventListener('DOMContentLoaded', (event) => {
  refreshUserInfo();
  refreshPetList();

  if (pets.length > 0) {
    EmptyPetStatePage.classList.add('hidden');
    petsSection.classList.remove('hidden');
  }
});

function gameIntervalFunc() {
  // Game looping.
  if (!petsSection.classList.contains('hidden')) {
    decrementPetsStat();
    addFood();
    refreshPetList(); 
    refreshUserInfo();
    saveDataToLocalStorage();
  }
}

var gameLoopInterval = setInterval(gameIntervalFunc, 1000)

// Walkthrough awal tidak punya peliharaan
const wt = new Walkthrough();
let steps = [];
steps.push({
    title: 'Selamat datang',
    desc: 'Selamat datang di aplikasi VirtualPet. Di sini anda dapat memelihara hewan peliharaan secara virtual. Sebagai langkah awal anda dapat membeli hewan virtual anda terlebih dahulu.',
    selector: '#step_a',
    fixMargin: true,
    fixPadding: true,
    onExit: function() {
      return storeButton.click();
    }
});

wt.setTutorial(steps);
