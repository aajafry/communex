import { useTheme } from "@/contexts";
import { handleClickOutside } from "@/utilities";
import EmojiPicker from "emoji-picker-react";
import { useEffect, useRef, useState } from "react";
import { RiEmojiStickerLine } from "react-icons/ri";

export const EmojiPickerButton = ({ onEmojiSelect }) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const emojiRef = useRef();
  const { theme } = useTheme();

  useEffect(() => {
    const outsideClickHandler = handleClickOutside(
      emojiRef,
      setShowEmojiPicker
    );
    document.addEventListener("mousedown", outsideClickHandler);
    return () => {
      document.removeEventListener("mousedown", outsideClickHandler);
    };
  }, []);

  return (
    <div className="relative">
      <button
        type="button"
        className="text-neutral-500 pt-1 focus:outline-none"
        onClick={() => setShowEmojiPicker((prev) => !prev)}
      >
        <RiEmojiStickerLine className="text-2xl" />
      </button>
      {showEmojiPicker && (
        <div className="absolute bottom-10 right-0" ref={emojiRef}>
          <EmojiPicker
            theme={theme}
            onEmojiClick={onEmojiSelect}
            autoFocusSearch={false}
          />
        </div>
      )}
    </div>
  );
};
