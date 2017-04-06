export const UDPDATE_CURRENT_WHY = "UDPDATE_CURRENT_WHY";


export function updateCurrentWhy(why) {
  return {type: UDPDATE_CURRENT_WHY, why: why}
}
