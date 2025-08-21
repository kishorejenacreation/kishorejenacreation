// /app/spin-game/gameLogic.ts

export const rewards = [
  "🎁 Amazon Gift Card",
  "😢 Try Again",
  "🎧 Spotify Premium",
  "🤑 ₹100 Zomato",
  "📦 Free Delivery",
  "🎉 Bonus Spin",
  "🔥 50 Points",
  "🍀 Better Luck Next Time",
  "💰 50% Cashback on Amazon"
]

const amazonGiftCodes = [
  "AMZ-GFT-KJC1",
  "AMZ-KISHORE-2025",
  "KJ-AMZ-GC2025",
  "GFT-AMAZON-1234"
]

const spotifyCodes = [
  "SPOTI-KJ-1MO",
  "PREMIUM-SPTFY-90D",
  "SPOT-KISHORE-JENA",
  "MUSIC4FREE-KJC"
]

const zomatoCodes = [
  "ZOM100-OFF-KJC",
  "EAT-KISHORE100",
  "FOODIE-KJ-100",
  "KJ-ZOM-100RS"
]

const deliveryCodes = [
  "FREEDLVY-KJC",
  "SHIPFREE-2025",
  "DELIVERIT-KJ",
  "KJFREEDEL-1"
]

const cashbackCodes = [
  "AMAZON-CB50-2025",
  "CB50-KJCA2025",
  "KC-AMZ-50OFF",
  "GET50-AMZN-KJ"
]

export function getRandomReward(): string {
  const reward = rewards[Math.floor(Math.random() * rewards.length)]

  switch (reward) {
    case "🎁 Amazon Gift Card":
      return `${reward} – Code: ${randomCode(amazonGiftCodes)}`
    case "🎧 Spotify Premium":
      return `${reward} – Code: ${randomCode(spotifyCodes)}`
    case "🤑 ₹100 Zomato":
      return `${reward} – Code: ${randomCode(zomatoCodes)}`
    case "📦 Free Delivery":
      return `${reward} – Code: ${randomCode(deliveryCodes)}`
    case "💰 50% Cashback on Amazon":
      return `${reward} – Code: ${randomCode(cashbackCodes)}`
    default:
      return reward
  }
}

function randomCode(list: string[]) {
  return list[Math.floor(Math.random() * list.length)]
}
