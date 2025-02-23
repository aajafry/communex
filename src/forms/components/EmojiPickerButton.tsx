import { useTheme } from "@/contexts";
import { handleClickOutside } from "@/utilities";
import EmojiPicker, { Theme, EmojiClickData } from "emoji-picker-react";
import { FC, useEffect, useRef, useState } from "react";
import { RiEmojiStickerLine } from "react-icons/ri";

type PropsType = { onEmojiSelect: (emoji: EmojiClickData) => void };

export const EmojiPickerButton: FC<PropsType> = ({
  onEmojiSelect,
}: PropsType) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const emojiRef = useRef<HTMLDivElement>(null);
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
            theme={theme as Theme}
            onEmojiClick={onEmojiSelect}
            autoFocusSearch={false}
          />
        </div>
      )}
    </div>
  );
};
