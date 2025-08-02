import { useStyleStore } from "@/lib/store/embedStore";
import { Star, Quote, User, MessageSquare } from "lucide-react";

export function EditEmbedPreview({
  content,
  senderName,
  rating,
  template = "classic",
}: {
  content: string;
  senderName: string;
  rating?: number | null;
  template?: string;
}) {
  const { styles } = useStyleStore();

  const containerBackground = styles.wrapper.gradient
    ? styles.wrapper.gradient
    : styles.wrapper.backgroundColor;

  const renderTemplate = () => {
    switch (template) {
      case "modern":
        return renderModernTemplate();
      case "minimal":
        return renderMinimalTemplate();
      case "social":
        return renderSocialTemplate();
      default:
        return renderClassicTemplate();
    }
  };

  const renderClassicTemplate = () => (
    <div className="relative w-full max-w-md mx-auto">
      <div
        className="relative"
        style={{
          padding: "32px",
          textAlign: styles.content.textAlign as any,
          fontWeight: styles.content.fontBold ? 700 : 400,
          fontSize: styles.content.fontSize,
          background: styles.content.backgroundColor,
          color: styles.content.textColor,
          border: styles.content.border
            ? `${styles.content.borderWidth} solid ${styles.content.borderColor}`
            : undefined,
          borderRadius: styles.content.borderRadius,
          fontFamily: styles.content.fontFamily,
          boxShadow: styles.content.boxShadow || "0 4px 20px rgba(0, 0, 0, 0.1)",
          position: "relative",
        }}
      >
        <div className="absolute -top-3 -left-3 opacity-20" style={{ color: styles.content.textColor }}>
          <Quote size={48} />
        </div>
        <div className="relative z-10">
          {rating && rating > 0 && (
            <div className="flex items-center justify-center mb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={`${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                />
              ))}
            </div>
          )}
          <blockquote className="mb-6 leading-relaxed">
            <p className="text-lg" style={{ lineHeight: "1.6" }}>
              "{content || 'Sample testimonial content...'}"
            </p>
          </blockquote>
          <div className="flex items-center justify-center">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center mb-2">
                <span className="text-lg font-semibold" style={{ color: styles.content.textColor }}>
                  {(senderName || 'A').charAt(0).toUpperCase()}
                </span>
              </div>
              <cite className="not-italic font-medium text-sm opacity-80">
                {senderName || 'Anonymous'}
              </cite>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderModernTemplate = () => (
    <div className="w-full max-w-lg mx-auto">
      <div
        className="flex items-start gap-4"
        style={{
          padding: "24px",
          background: styles.content.backgroundColor,
          color: styles.content.textColor,
          border: styles.content.border
            ? `${styles.content.borderWidth} solid ${styles.content.borderColor}`
            : undefined,
          borderRadius: styles.content.borderRadius,
          fontFamily: styles.content.fontFamily,
          boxShadow: styles.content.boxShadow || "0 4px 20px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div className="flex-shrink-0">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center">
            <span className="text-xl font-semibold" style={{ color: styles.content.textColor }}>
              {(senderName || 'A').charAt(0).toUpperCase()}
            </span>
          </div>
        </div>
        <div className="flex-1 min-w-0">
          {rating && rating > 0 && (
            <div className="flex items-center mb-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className={`${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                />
              ))}
            </div>
          )}
          <blockquote className="mb-3">
            <p className="text-base leading-relaxed" style={{ lineHeight: "1.6" }}>
              "{content || 'Sample testimonial content...'}"
            </p>
          </blockquote>
          <cite className="not-italic font-medium text-sm opacity-80">
            {senderName || 'Anonymous'}
          </cite>
        </div>
      </div>
    </div>
  );

  const renderMinimalTemplate = () => (
    <div className="w-full max-w-md mx-auto text-center">
      <div
        style={{
          padding: "40px 20px",
          background: styles.content.backgroundColor,
          color: styles.content.textColor,
          border: styles.content.border
            ? `${styles.content.borderWidth} solid ${styles.content.borderColor}`
            : undefined,
          borderRadius: styles.content.borderRadius,
          fontFamily: styles.content.fontFamily,
        }}
      >
        <div className="mb-6">
          <Quote size={32} className="mx-auto mb-4 opacity-60" style={{ color: styles.content.textColor }} />
          <p className="text-xl font-light leading-relaxed" style={{ lineHeight: "1.8" }}>
            "{content || 'Sample testimonial content...'}"
          </p>
        </div>
        {rating && rating > 0 && (
          <div className="flex items-center justify-center mb-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={14}
                className={`${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
              />
            ))}
          </div>
        )}
        <div className="text-sm opacity-70">
          — {senderName || 'Anonymous'}
        </div>
      </div>
    </div>
  );

  const renderSocialTemplate = () => (
    <div className="w-full max-w-sm mx-auto">
      <div
        style={{
          padding: "16px",
          background: styles.content.backgroundColor,
          color: styles.content.textColor,
          border: styles.content.border
            ? `${styles.content.borderWidth} solid ${styles.content.borderColor}`
            : undefined,
          borderRadius: styles.content.borderRadius,
          fontFamily: styles.content.fontFamily,
          boxShadow: styles.content.boxShadow || "0 2px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div className="flex items-start gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center flex-shrink-0">
            <span className="text-sm font-semibold" style={{ color: styles.content.textColor }}>
              {(senderName || 'A').charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-medium text-sm">{senderName || 'Anonymous'}</span>
              {rating && rating > 0 && (
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={12}
                      className={`${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                    />
                  ))}
                </div>
              )}
            </div>
            <p className="text-sm leading-relaxed" style={{ lineHeight: "1.5" }}>
              "{content || 'Sample testimonial content...'}"
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="relative">
      {/* Preview Container */}
      <div
        className="relative overflow-hidden rounded-lg"
        style={{
          background: containerBackground,
          padding: "40px",
          minHeight: "280px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {renderTemplate()}
      </div>

      {/* Preview Label */}
      <div className="absolute top-2 right-2">
        <div className="bg-black/10 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
          {template.charAt(0).toUpperCase() + template.slice(1)} Template
        </div>
      </div>
    </div>
  );
}
