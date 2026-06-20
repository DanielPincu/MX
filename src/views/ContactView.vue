<template>
  <div class="ie-window">
    <div class="ie-title-bar">
      <div class="ie-title-text">
        <span class="ie-icon">⏣</span>
        <span>transmission.exe — Internet Explorer</span>
      </div>
      <div class="ie-controls">
        <button class="ie-btn ie-min">─</button>
        <button class="ie-btn ie-max">□</button>
        <button class="ie-btn ie-close" @click="$emit('close')">✕</button>
      </div>
    </div>
    <div class="ie-menu-bar">
      <span>File</span>
      <span>Edit</span>
      <span>View</span>
      <span>Favorites</span>
      <span>Tools</span>
      <span>Help</span>
    </div>
    <div class="ie-toolbar">
      <div class="ie-address-bar">
        <span class="ie-address-label">Address</span>
        <input class="ie-address-input" value="matrix://contact.transmission" readonly />
      </div>
    </div>
    <div class="ie-body">
      <div class="ie-scanline"></div>
      <form target="_blank" action="https://formspree.io/f/mgegplkr" method="POST">
        <div class="ie-prompt">PS C:\Users\Daniel&gt; ./send-message</div>
        <div style="font-size:11px;color:rgba(var(--mx-warm-rgb),0.5);margin-bottom:12px;letter-spacing:0.04em;">looks weird but trust me, it works</div>
        <div class="ie-field-row">
          <div class="ie-field">
            <label>> name:</label>
            <input type="text" name="name" placeholder="your name..." required />
          </div>
          <div class="ie-field">
            <label>> email:</label>
            <input type="email" name="email" placeholder="email address..." required />
          </div>
        </div>
        <div class="ie-field">
          <label>> message:</label>
          <textarea name="message" placeholder="your message..." required></textarea>
        </div>
        <div class="ie-actions">
          <button type="submit" class="ie-submit">[ TRANSMIT ]</button>
          <button type="button" class="ie-cancel" @click="$emit('close')">[ CANCEL ]</button>
        </div>
      </form>
    </div>
    <div class="ie-status-bar">
      <span>Signal ready</span>
      <span class="ie-status-right">Encrypted</span>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.ie-window {
  background: var(--mx-panel, #0a0f0a);
  border: 2px solid rgba(var(--mx-accent-rgb), 0.5);
  box-shadow:
    4px 4px 10px rgba(0,0,0,0.6),
    0 0 30px rgba(var(--mx-accent-rgb), 0.08);
  font-family: 'VT323', 'Courier New', monospace;
  font-size: 13px;
  color: rgba(var(--mx-accent-soft-rgb), 0.9);
  height: 100%;
  display: flex;
  flex-direction: column;
}

/* ── Title Bar ── */
.ie-title-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(90deg, rgba(0,0,0,0.9), rgba(var(--mx-accent-rgb), 0.25), rgba(0,0,0,0.9));
  padding: 4px 5px;
  height: 26px;
  border-bottom: 1px solid rgba(var(--mx-accent-rgb), 0.25);
}

.ie-title-text {
  display: flex;
  align-items: center;
  gap: 5px;
  color: rgba(var(--mx-accent-soft-rgb), 0.9);
  font-size: 13px;
  font-weight: 400;
  letter-spacing: 0.06em;
  white-space: nowrap;
  overflow: hidden;
}

.ie-icon {
  font-size: 15px;
}

.ie-controls {
  display: flex;
  gap: 3px;
}

.ie-btn {
  width: 22px;
  height: 20px;
  padding: 0;
  border: 1px solid rgba(var(--mx-accent-rgb), 0.35);
  background: rgba(0, 0, 0, 0.5);
  color: rgba(var(--mx-accent-soft-rgb), 0.8);
  font-size: 12px;
  line-height: 1;
  cursor: pointer;
  display: grid;
  place-items: center;
  font-family: 'VT323', 'Courier New', monospace;
  transition: background 0.15s;
}

.ie-btn:hover {
  background: rgba(var(--mx-accent-rgb), 0.15);
}

.ie-close {
  color: #ff6b6b;
  font-weight: 700;
}

.ie-close:hover {
  background: rgba(255, 60, 60, 0.25) !important;
}

/* ── Menu Bar ── */
.ie-menu-bar {
  display: flex;
  gap: 0;
  background: rgba(0, 0, 0, 0.35);
  padding: 2px 4px;
  border-bottom: 1px solid rgba(var(--mx-accent-rgb), 0.12);
}

.ie-menu-bar span {
  padding: 2px 8px;
  cursor: pointer;
  color: rgba(var(--mx-accent-soft-rgb), 0.7);
  font-size: 12px;
}

.ie-menu-bar span:hover {
  background: rgba(var(--mx-accent-rgb), 0.12);
  color: rgba(var(--mx-accent-soft-rgb), 0.95);
}

/* ── Toolbar / Address Bar ── */
.ie-toolbar {
  background: rgba(0, 0, 0, 0.2);
  padding: 4px 6px;
  border-bottom: 1px solid rgba(var(--mx-accent-rgb), 0.12);
}

.ie-address-bar {
  display: flex;
  align-items: center;
  gap: 5px;
}

.ie-address-label {
  font-size: 12px;
  color: rgba(var(--mx-accent-soft-rgb), 0.6);
  white-space: nowrap;
}

.ie-address-input {
  flex: 1;
  height: 20px;
  border: 1px solid rgba(var(--mx-accent-rgb), 0.25);
  background: rgba(0, 0, 0, 0.5);
  padding: 0 6px;
  font-family: 'VT323', 'Courier New', monospace;
  font-size: 12px;
  color: rgba(var(--mx-accent-soft-rgb), 0.8);
  outline: none;
}

/* ── Body ── */
.ie-body {
  background:
    repeating-linear-gradient(180deg, rgba(var(--mx-accent-rgb), 0.025) 0 1px, transparent 1px 4px),
    linear-gradient(180deg, rgba(0, 8, 3, 0.92), rgba(2, 6, 2, 0.96));
  padding: 14px 16px 12px;
  position: relative;
  overflow: auto;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.ie-body form {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.ie-body form > .ie-field:nth-child(4) {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.ie-prompt {
  font-family: 'VT323', 'Courier New', monospace;
  font-size: 13px;
  color: rgba(var(--mx-warm-rgb), 0.8);
  margin-bottom: 14px;
  margin-top: 0;
}

.ie-field {
  margin-bottom: 10px;
}

.ie-field label {
  display: block;
  font-size: 12px;
  color: rgba(var(--mx-accent-soft-rgb), 0.65);
  margin-bottom: 2px;
  letter-spacing: 0.04em;
}

.ie-field input,
.ie-field textarea {
  width: 100%;
  border: 1px solid rgba(var(--mx-accent-rgb), 0.25);
  background: rgba(0, 0, 0, 0.5);
  padding: 5px 7px;
  font-family: 'VT323', 'Courier New', monospace;
  font-size: 13px;
  color: rgba(var(--mx-accent-soft-rgb), 0.9);
  outline: none;
  box-sizing: border-box;
  transition: border-color 0.2s;
}

.ie-field textarea {
  flex: 1;
  min-height: 0;
  resize: vertical;
}

.ie-field input:focus,
.ie-field textarea:focus {
  border-color: rgba(var(--mx-warm-rgb), 0.5);
  box-shadow: 0 0 8px rgba(var(--mx-accent-rgb), 0.1);
}

.ie-field input::placeholder,
.ie-field textarea::placeholder {
  color: rgba(var(--mx-accent-soft-rgb), 0.3);
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.ie-field-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.ie-actions {
  display: flex;
  gap: 8px;
  justify-content: flex-end;
  margin-top: 14px;
}

.ie-submit,
.ie-cancel {
  padding: 6px 18px;
  border: 1px solid rgba(var(--mx-accent-rgb), 0.35);
  border-bottom: 3px solid rgba(0, 0, 0, 0.8);
  background: rgba(0, 0, 0, 0.4);
  color: rgba(var(--mx-accent-soft-rgb), 0.85);
  font-family: 'VT323', 'Courier New', monospace;
  font-size: 13px;
  letter-spacing: 0.1em;
  cursor: pointer;
  transition: border-color 0.2s, background 0.2s, transform 90ms ease;
  text-transform: uppercase;
}

.ie-submit:hover {
  border-color: rgba(var(--mx-warm-rgb), 0.5);
  background: rgba(var(--mx-accent-rgb), 0.08);
  transform: translateY(-1px);
}

.ie-cancel:hover {
  border-color: rgba(255, 100, 100, 0.4);
  background: rgba(255, 60, 60, 0.06);
}

.ie-submit:active,
.ie-cancel:active {
  transform: translateY(0);
  border-bottom-width: 1px;
}

/* ── Status Bar ── */
.ie-status-bar {
  display: flex;
  justify-content: space-between;
  background: rgba(0, 0, 0, 0.3);
  border-top: 1px solid rgba(var(--mx-accent-rgb), 0.12);
  padding: 3px 8px;
  font-size: 12px;
  color: rgba(var(--mx-accent-soft-rgb), 0.55);
}

.ie-status-right {
  color: rgba(var(--mx-accent-rgb), 0.5);
}
</style>