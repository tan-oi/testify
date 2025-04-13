import { useStyleStore } from "@/lib/store/embedStore";

export function EditEmbedPreview({
  content,
  senderName,
}: {
  content: string;
  senderName: string;
}) {
  const { styles } = useStyleStore();

  const containerBackground = styles.wrapper.gradient
    ? styles.wrapper.gradient
    : styles.wrapper.backgroundColor;

  return (
    <div
      style={{
        background: containerBackground,
        padding: "30px",
        maxHeight: "350px",
      }}
    >
      <div
        style={{
          paddingInline: "10px",
          textAlign: styles.content.textAlign,
          fontWeight: styles.content.fontBold ? 700 : undefined,
          fontSize: styles.content.fontSize,
          background: styles.content.backgroundColor,
          color: styles.content.textColor,
          border: styles.content.border
            ? `${styles.content.borderWidth} solid ${styles.content.borderColor}`
            : undefined,
          borderRadius: styles.content.borderRadius,
          fontFamily: styles.content.fontFamily,
          boxShadow: styles.content.boxShadow,
        }}
      >
        <p>{content}</p>

        <footer>— {senderName}</footer>
      </div>
    </div>
  );
}
