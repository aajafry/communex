import { handleAttachmentChange } from "@/utilities";
import { FC, useRef } from "react";
import { GrAttachment } from "react-icons/gr";

export const AttachmentButton: FC = () => {
  const attachmentRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <button
        type="button"
        className="text-neutral-500 focus:outline-none cursor-not-allowed"
        title="not allowed at this time"
        disabled={true}
        onClick={() => attachmentRef.current?.click()}
      >
        <GrAttachment className="text-2xl" />
      </button>
      <input
        type="file"
        id="attachment"
        name="attachment"
        onChange={handleAttachmentChange}
        className="hidden"
        ref={attachmentRef}
      />
    </>
  );
};
