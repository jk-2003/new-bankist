'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const nav = document.querySelector('.nav');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

///////////////////////////////////////
// Modal window

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};
btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));
btnCloseModal.addEventListener('click', closeModal);

//navigation scroll

document.querySelector('.nav__links').addEventListener('click', e => {
  e.preventDefault();
  const link = e.target.getAttribute('href');
  console.log(link);
  document.querySelector(link).scrollIntoView({ behavior: 'smooth' });
});

// tab operations

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  // console.log(clicked);
  // console.log(clicked.dataset.tab);

  // add and remove active class
  if (clicked) {
    tabs.forEach(t => {
      t.classList.remove('operations__tab--active');
    });
    clicked.classList.add('operations__tab--active');
    // add content

    tabsContent.forEach(t => t.classList.remove('operations__content--active'));

    document
      .querySelector(`.operations__content--${clicked.dataset.tab}`)
      .classList.add('operations__content--active');
  }
  return;
});

// // navbar

// const hoverEffect = function (e, opa) {
//   if (e.target.classList.contains('nav__link')) {
//     const link = e.target;
//     const siblings = link.closest('.nav').querySelectorAll('.nav__link');
//     console.log(siblings);
//     siblings.forEach(el => {
//       if (el !== link) el.style.opacity = opa;
//     });
//     console.log(link);
//   }
// };

// navlinks.addEventListener('mouseover', e => {
//   hoverEffect(e, 0.5);
// });

// navlinks.addEventListener('mouseout', e => {
//   hoverEffect(e, 1);
// });
// console.log(navlinks);

nav.addEventListener('mouseover', e => {
  const link = e.target;
  const siblings = document.querySelectorAll('.nav__link');
  siblings.forEach(el => {
    if (el !== link) {
      el.style.opacity = 0.5;
    }
  });
});
nav.addEventListener('mouseout', e => {
  const link = e.target;
  const siblings = document.querySelectorAll('.nav__link');
  siblings.forEach(el => {
    if (el !== link) {
      el.style.opacity = 1;
    }
  });
});

// sticky navigation
const head = document.querySelector('.header');
const stickyNav = function (entries) {
  const [entry] = entries;
  // console.log(entry.isIntersecting);
  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
};
const headNavigation = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0.1,
});
headNavigation.observe(head);

// animation scrooling
const sections = document.querySelectorAll('.section');
const showSection = function (entries, observe) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  else {
    entry.target.classList.remove('section--hidden');
  }
  observe.unobserve(entry.target);
};
const animationection = new IntersectionObserver(showSection, {
  root: null,
  threshold: 0.2,
});
sections.forEach(section => {
  section.classList.add('section--hidden');
  animationection.observe(section);
});

// lazy loading image
const imgs = document.querySelectorAll('img[data-src]');
// console.log(imgs);
const loading = function (entries, observe) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', () => {
    entry.target.classList.remove('lazy-img');
  });
  observe.unobserve(entry.target);
};
const imagObserver = new IntersectionObserver(loading, {
  root: null,
  threshold: 0,
});
imgs.forEach(img => imagObserver.observe(img));

// testimonial slider
let currentslide = 0;
let maxslide = 3;
const slides = document.querySelectorAll('.slide');
const slider = document.querySelector('.slider');
const btnRight = document.querySelector('.slider__btn--right');
const btnLeft = document.querySelector('.slider__btn--left');
const dotcontainer = document.querySelector('.dots');
// console.log(dotcontainer);

const creatDot = function () {
  slides.forEach(function (s, i) {
    dotcontainer.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
};

const activeDot = function (slide) {
  document
    .querySelectorAll('.dots__dot')
    .forEach(btn => btn.classList.remove('dots__dot--active'));
  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add('dots__dot--active');
};

slider.style.overflow = 'hiddenS';
slides.forEach((s, i) => {
  s.style.transform = `translateX(${100 * i}%)`;
});

const gotoSlide = function (currentslide) {
  slides.forEach((s, i) => {
    s.style.transform = `translateX(${100 * (i - currentslide)}%)`;
  });
};
// previous slide
const prvSlide = function () {
  if (currentslide === 0) {
    currentslide = maxslide - 1;
  } else {
    currentslide--;
  }
  gotoSlide(currentslide);
  activeDot(currentslide);
};
// next slide
const nxtSlide = function () {
  if (currentslide === maxslide - 1) {
    currentslide = 0;
  } else {
    currentslide++;
  }
  gotoSlide(currentslide);
  activeDot(currentslide);
};

// calling functions
const initial = function () {
  gotoSlide(0);
  creatDot();
  activeDot(0);
};
initial();
// Event handlers
setInterval(nxtSlide, 10000);
btnRight.addEventListener('click', nxtSlide);
btnLeft.addEventListener('click', prvSlide);
dotcontainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) {
    const currdot = e.target.dataset.slide;
    gotoSlide(currdot);
    console.log('dot');
    activeDot(currdot);
  }
});

/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////

/*const msg = document.createElement('div');
msg.classList.add('cookie-message');
msg.innerHTML =
  'kjnckjnojn cjnjn jnjwjnj  wjcnwccjdj jncjn2cc c2jcncjhgvfjfefbejnjcnjncecefbf eofijeicehblknvjjxjnzkxosipowdkofufyihfeneji.<button class="btn btn--close-cookie">got it</button>';
const headtitle = document.querySelector('.header__title');
// headtitle.append(msg);
headtitle.prepend(msg);
// headtitle.after(msg);
// headtitle.before(msg);
btnScrollTo.addEventListener('click', function () {
  const sec2 = document.querySelector('#section--2');
  sec2.scrollIntoView({ behavior: 'smooth' });
  console.log(sec2);
});*/
// const person = function (name, dob) {
//   this.name = name;
//   this.dob = dob;
//   // this.age = function () {
//   //   console.log(2023 - this.dob);
//   // };
// };
// const jk_1 = new person('Jeya Krishnan', 2003);
// const jk_2 = new person('Jeya', 1975);
// const jk_3 = new person('Krishnan', 2000);

// person.prototype.age = function () {
//   console.log(2023 - this.dob);
// };
// console.log(person.prototype);
// jk_1.age();
// jk_2.age();
// jk_3.age();
// console.log(jk_1, jk_2, jk_3);

// class car {
// constructor(name, speed) {
//     this.name = name;
//     this.speed = speed;
//     console.log(name, speed);
//   }
//   get speedUS() {
//     return this.speed / 1.6;
//   }
//   set speedUS(val) {
//     this.speed = val * 1.6;
//   }
//   acclerate() {
//     this.speed += 10;
//     console.log(`the ${this.name} is at ${this.speed} Km/h`);
//   }
//   break() {
//     this.speed -= 5;
//     console.log(`the ${this.name} is at ${this.speed} Km/h`);
//   }
// }
// // const car1 = new car('BMW', 120);
// const car1 = new car('ford', 120);

// console.log(car1.speedUS);
// car1.acclerate();
// car1.break();
// car1.speedUS = 70;
// console.log(car1);

// const car2 = new car('Mercedes', 220);
// console.log(car2);
// car2.acclerate();
// car2.break();
// console.log(
// '-------------------------------------------------------------------'
// );

// ES6 "class"
// class person {
//   constructor(ownername, dob) {
//     this.ownername = ownername;
//     this.dob = dob;
//   }
//   age() {
//     return `owner's age is ${new Date().getFullYear() - this.dob}`;
//   }
//   name23() {
//     return `hai i am ${this.ownername}`;
//   }
// }
// // const jk = new person();
// // console.log(jk);
// // console.log(jk.name23());
// // console.log(jk.age());

// class car extends person {
//   constructor(name, dob, carname, price, speed) {
//     super(name, dob);
//     this.carName = carname;
//     this.carPrice = price;
//     this.speed = speed;
//   }
//   info() {
//     return `It is a ${this.carName}`;
//   }
//   rate() {
//     return `price of the care is ₹${this.carPrice} Crore `;
//   }
// }
// const car1 = new car('krishna', 2003, 'FERRARI', 4.3, 220);
// console.log(car1);
// console.log(car1.info());
// console.log(car1.rate());
// console.log(car1.age());
// console.log(car1.name23());
// console.log(
//   '-------------------------------------------------------------------'
// );

// // function constructor

// const owner = function (name, dob) {
//   this.ownername = name;
//   this.dob = dob;
// };
// owner.prototype.ownerinfo = function () {
//   console.log(`owner is ${this.ownername}`);
//   console.log(`owner's dob is ${this.dob}`);
// };

// const vehicle = function (ownername, dob, name, price, speed) {
//   owner.call(this, ownername, dob);
//   this.carname = name;
//   this.carprice = price;
//   this.carspeed = speed;
// };
// vehicle.prototype = owner.prototype;
// vehicle.prototype.carinfo = function () {
//   console.log(
//     `car name is ${this.carname} and price ${this.carrice} and top speed is ${this.carspeed}`
//   );
// };
// const owner1 = new vehicle('krishna', 2003, 'FERRARI', 4.3, 220);
// console.log(owner1);
// owner1.ownerinfo();
// owner1.carinfo();

const car = function (make, speed) {
  this.carname = make;
  this.carspeed = speed;
};
car.prototype.acclerate = function () {
  this.carspeed += 20;
  console.log(`the ${this.carname} is at ${this.carspeed} Km/h`);
};
car.prototype.break = function () {
  console.log(this.carspeed);
  this.carspeed -= (1 / 100) * this.carspeed;
  console.log(`the ${this.carname} is at ${this.carspeed} Km/h`);
};
const EV = function (make, speed, charge) {
  car.call(this, make, speed);
  this.currentcharge = charge;
};
EV.prototype = car.prototype;
EV.prototype.chargeBaterry = function () {
  console.log(`the battery charge to ${(this.currentcharge / 100) * 100}%`);
};

const tesla = new EV('TESLA', 145, 83);
console.log(tesla);
tesla.acclerate();
tesla.break();
