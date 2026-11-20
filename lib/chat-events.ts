// Lets any button on the page open the chat assistant (components/ChatWidget.tsx).
export const OPEN_CHAT_EVENT = "portfolio:open-chat";

export function openChat() {
  window.dispatchEvent(new Event(OPEN_CHAT_EVENT));
}
