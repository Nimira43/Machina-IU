import { topBar, exteriorImage, interiorImage, exteriorColourSection, interiorColourSection, wheelsButtonsSection, performanceBtn, fullSelfDrivingCheckbox,totalPriceElement, downPaymentElement, monthlyPaymentElement, accessoryCheckboxes } from './variables'

import { selectedOptions, pricing } from './objects'

import { exteriorImages, interiorImages } from './imageMapping'

const basePrice = 57835
let currentPrice = basePrice
let selectedColour = 'Stealth Grey' 

const handleScroll = () => {
  const atTop = window.scrollY === 0 
  topBar.classList.toggle('visible-bar', atTop)
  topBar.classList.toggle('hidden-bar', !atTop)
}

window.addEventListener('scroll', () => requestAnimationFrame(handleScroll))