export const handleEmojiSelect = (emoji, setMessage) => {
  setMessage((prev) => `${prev}${emoji.emoji}`);
};

export const handleClickOutside = (ref, setState) => (event) => {
  if (ref.current && !ref.current.contains(event.target)) {
    setState(false);
  }
};
