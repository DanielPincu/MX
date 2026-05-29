// Shared AudioContext for the whole app
// Created and resumed inside a user gesture handler (BootScreen),
// then reused by Typing.vue and any other components that need audio.
let audioCtx = null
let resumed = false

/**
 * Get (or create) the shared AudioContext.
 * Returns null if the browser doesn't support it.
 */
export function getAudioContext () {
  if (!audioCtx) {
    try {
      const Ctx = window.AudioContext || window.webkitAudioContext
      if (!Ctx) return null
      audioCtx = new Ctx()
      if (audioCtx.state === 'running') {
        resumed = true
      }
    } catch (_) {
      return null
    }
  }
  return audioCtx
}

/**
 * Resume the shared AudioContext.
 * Must be called from within a user gesture (click, keydown, touchstart).
 * Returns a Promise that resolves once audio is ready to play.
 */
export async function resumeAudio () {
  const ctx = getAudioContext()
  if (!ctx) return
  if (ctx.state === 'suspended') {
    await ctx.resume()
  }
  resumed = true
}

/** Check if audio is ready to play. */
export function isAudioReady () {
  return !!audioCtx && resumed
}
