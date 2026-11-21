// Lets any button on the page open the chat assistant (components/ChatWidget.tsx).
export const OPEN_CHAT_EVENT = "portfolio:open-chat";

// Appended by /api/chat when the provider fails or times out after streaming began.
export const STREAM_INTERRUPTED = "\n\n[The assistant was interrupted. Please try again.]";

export function openChat() {
  window.dispatchEvent(new Event(OPEN_CHAT_EVENT));
}
