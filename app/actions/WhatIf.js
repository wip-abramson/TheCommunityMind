export const LOAD_WHATIF = "LOAD_WHATIF";
export const UPDATE_CURRENT_WHATIF = "UPDATE_CURRENT_WHATIF";


export function updateCurrentWhatIf(whatIf) {
  return {type: UPDATE_CURRENT_WHATIF, whatIf: whatIf}
}
