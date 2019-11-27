// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

require("@rails/ujs").start()
require("turbolinks").start()
require("@rails/activestorage").start()
require("channels")


// Uncomment to copy all static images under ../images to the output folder and reference
// them with the image_pack_tag helper in views (e.g <%= image_pack_tag 'rails.png' %>)
// or the `imagePath` JavaScript helper below.
//
// const images = require.context('../images', true)
// const imagePath = (name) => images(name, true)

window.addEventListener('load', () => {


  var about = document.querySelector('.about') 
  var aboutBtn = document.querySelector('.about-close-btn')
  var model = document.querySelector('.model')
  var menuBtn = document.querySelector('.menu-btn')
  var menu = document.querySelector('.menu')
  var container = document.querySelectorAll('.container')
  var containerInput = document.querySelectorAll('.container input')
  var searchForm = document.querySelector('.search-form')
  var searchInput = document.querySelector('.search-input')


  var openAbout = () => {
    if (model.classList[1] === 'active') {
      model.classList.remove('active')
    } else {
      model.classList.add('active')
    }
  }

  var openMenu = () => {
    if (menu.classList[1] === 'active1') {
      menu.classList.remove('active1')
      container.forEach((aCont)=>{aCont.classList.remove('active2')})
    } else {
      menu.classList.add('active1')
      container.forEach((aCont)=>{aCont.classList.add('active2')})
    }
  }

  var oneChecked = () => {
    if (containerInput[0].checked == true){
      console.log('hi')
    } else {
      console.log('bye')
    }
  }
  var twoChecked = () => {
    if (containerInput[1].checked == true){
      console.log('2hi')
    } else {
      console.log('2bye')
    }
  }
  var threeChecked = () => {
    if (containerInput[2].checked == true){
      console.log('3hi')
    } else {
      console.log('3bye')
    }
  }

  var handleForm = (event) => {
    event.preventDefault()
    var quary = searchInput.value
    console.log(quary)
  }

  about.addEventListener('click', openAbout)
  aboutBtn.addEventListener('click', openAbout)
  menuBtn.addEventListener('click', openMenu)
  containerInput[0].addEventListener('click',oneChecked)  
  containerInput[1].addEventListener('click',twoChecked)
  containerInput[2].addEventListener('click',threeChecked)

  searchForm.addEventListener('submit', handleForm)






  // var clickMonitor = function(clicking) {
  //   clicking.addEventListener('click',oneChecked)
  // }
  // // containerInput.addEventListener('click', oneChecked(event))
  // containerInput.forEach(clickMonitor)


})
