import { topBar, exteriorImage, interiorImage, exteriorColourSection, interiorColourSection, wheelsButtonsSection, performanceBtn, fullSelfDrivingCheckbox,totalPriceElement, downPaymentElement, monthlyPaymentElement, accessoryCheckboxes } from './variables'

import { selectedOptions, pricing } from './objects'

import { exteriorImages, interiorImages } from './imageMapping'

const basePrice = 57835
let currentPrice = basePrice
let selectedColour = 'Stealth Grey' 