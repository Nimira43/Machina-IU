import { topBar, exteriorImage, interiorImage, exteriorColourSection, interiorColourSection, wheelsButtonsSection, performanceBtn, fullSelfDrivingCheckbox, accessoryCheckboxes } from './variables.js'
import { selectedOptions } from './objects.js'
import { exteriorImages, interiorImages } from './imageMapping.js'
import { updateTotalPrice } from './payments.js'

let selectedColour = 'Solid Black' 

const handleScroll = () => {
  const atTop = window.scrollY === 0 
  topBar.classList.toggle('visible-bar', atTop)
  topBar.classList.toggle('hidden-bar', !atTop)
}

const handleColourButtonClick = (event) => {
  let button
  if (event.target.tagName === 'IMG') {
    button = event.target.closest('button')
  } else if (event.target.tagName === 'BUTTON') {
    button = event.target
  }
  if (button) {
    const buttons = event.currentTarget.querySelectorAll('button')
    buttons.forEach((btn) => btn.classList.remove('btn-selected'))
    button.classList.add('btn-selected') 
    
    if (event.currentTarget === exteriorColourSection) {
      const colour = button.querySelector('img').alt
      exteriorImage.src = exteriorImages[colour]
      selectedColour = colour
    }
    
    if (event.currentTarget === interiorColourSection) {
      const colour = button.querySelector('img').alt
      interiorImage.src = interiorImages[colour]
    }
  }
}

const updateExteriorImage = () => {
  const performanceSuffix = selectedOptions['Enhanced Wheels'] 
    ? '-performance' 
    : ''
  const colourKey = selectedColour in exteriorImages 
    ? selectedColour 
    : 'Solid Black'
  exteriorImage.src = exteriorImages[colourKey].replace(
    '.jpg',
    `${performanceSuffix}.jpg`
  )
}

const handleWheelButtonClick = (event) => {
  if (event.target.tagName === 'BUTTON') {
    const buttons = document.querySelectorAll('#wheel-buttons button')
    buttons.forEach((btn) => {
      btn.classList.remove(
        'selected', 
        'bg-gray-800', 'text-white', 'hover:bg-gray-900', 'hover:text-white'
      )
      btn.classList.add(
        'unselected', 
        'bg-gray-200', 'text-gray-900', 'hover:bg-gray-600')
    })
    event.target.classList.remove(
      'unselected', 
      'bg-gray-200', 'text-gray-900', 'hover:bg-gray-600'
    )
    event.target.classList.add(
      'selected', 
      'bg-gray-800', 'text-white', 'hover:bg-gray-900', 'hover:text-white'
    )

    selectedOptions['Enhanced Wheels'] = event.target.textContent.includes('Enhanced')
    updateExteriorImage()
    updateTotalPrice()
  }
}

const handlePerformanceButtonClick = () => {
  const isSelected = performanceBtn.classList.toggle('bg-gray-800')
  updateTotalPrice()
  performanceBtn.classList.toggle('text-white')
  selectedOptions['Enhanced Performance'] = isSelected
  updateTotalPrice()
}

const fullSelfDrivingChange = () => {
  selectedOptions['Self-Driving'] = fullSelfDrivingCheckbox.checked
  updateTotalPrice()
}

accessoryCheckboxes.forEach((checkbox) => {
  checkbox.addEventListener('change', () => updateTotalPrice())
}) 
updateTotalPrice()

window.addEventListener('scroll', () => requestAnimationFrame(handleScroll))
exteriorColourSection.addEventListener('click', handleColourButtonClick)
interiorColourSection.addEventListener('click', handleColourButtonClick)
wheelsButtonsSection.addEventListener('click', handleWheelButtonClick)
performanceBtn.addEventListener('click', handlePerformanceButtonClick)
fullSelfDrivingCheckbox.addEventListener('change', fullSelfDrivingChange)
