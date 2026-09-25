/**
 * Shared password for gated case studies. This is a soft gate: the password ships in the client
 * bundle, so it keeps casual visitors out rather than securing anything.
 */
export const WIP_CASE_STUDY_PASSWORD = "sneakpeek"

const storageKey = (projectId: string) => `auth_${projectId}`

export function isCaseStudyUnlocked(projectId: string): boolean {
  try {
    return localStorage.getItem(storageKey(projectId)) === "true"
  } catch {
    return false
  }
}

/** Checks the password and, when it matches, remembers the unlock for this browser. */
export function unlockCaseStudy(projectId: string, password: string): boolean {
  if (password !== WIP_CASE_STUDY_PASSWORD) return false
  try {
    localStorage.setItem(storageKey(projectId), "true")
  } catch {
    // Storage blocked: the unlock still works for this navigation.
  }
  return true
}
