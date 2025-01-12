import { totalPriceElement, downPaymentElement, monthlyPaymentElement,accessoryCheckboxes } from './variables.js'
import { pricing, selectedOptions } from './objects.js'

const basePrice = 60000
let currentPrice = basePrice

export const updateTotalPrice = () => {
  currentPrice = basePrice

  if (selectedOptions['Enhanced Wheels']) {
    currentPrice += pricing['Enhanced Wheels']
  }
  if (selectedOptions['Enhanced Performance']) {
    currentPrice += pricing['Enhanced Performance']
  }
  if (selectedOptions['Self-Driving']) {
    currentPrice += pricing['Self-Driving']
  }
  accessoryCheckboxes.forEach((checkbox) => {
    const accessoryLabel = checkbox
      .closest('label')
      .querySelector('span')
      .textContent.trim()
    const accessoryPrice = pricing['Accessories'][accessoryLabel]

    if (checkbox.checked) {
      currentPrice += accessoryPrice
    }
  })
  totalPriceElement.textContent = `
    £${currentPrice.toLocaleString()}
  `
  updatePaymentBreakdown()
}

const updatePaymentBreakdown = () => {
  const downPayment = currentPrice * 0.15
  downPaymentElement.textContent = `
    £${downPayment.toLocaleString()}
  `
  const loanTermMonths = 48
  const interestRate = 0.075
  const loanAmount = currentPrice - downPayment
  const monthlyInterestRate = interestRate / 12

  const monthlyPayment = (loanAmount * (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, loanTermMonths))) / (Math.pow(1 + monthlyInterestRate, loanTermMonths) - 1)
  monthlyPaymentElement.textContent = `
    £${monthlyPayment.toFixed(2).toLocaleString()}
  `
}