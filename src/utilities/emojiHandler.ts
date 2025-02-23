import { EmojiClickData } from "emoji-picker-react";

export const handleEmojiSelect = (
  emoji: EmojiClickData,
  setMessage: React.Dispatch<React.SetStateAction<string>>
): void => {
  if (!emoji?.emoji) return;
  setMessage((prev) => prev + emoji.emoji);
};

export const handleClickOutside = (
  ref: React.RefObject<HTMLElement>,
  setState: React.Dispatch<React.SetStateAction<boolean>>
): ((event: MouseEvent) => void) => {
  return (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setState(false);
    }
  };
};
