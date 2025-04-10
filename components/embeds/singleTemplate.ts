export function generateHTML({
    content,
    senderName,
    video = null,
    styles,
  }: {
    content: string | null;
    senderName: string;
    video: string | null;
    styles: {
      wrapper: string;
      content: string;
    };
  }) {
    
    try {

      const wrapperStyles = JSON.parse(decodeURIComponent(styles.wrapper));
      const contentStyles = JSON.parse(decodeURIComponent(styles.content));
      
      const containerBackground = wrapperStyles.gradient || wrapperStyles.backgroundColor;  
  
      return `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <script>
              window.addEventListener('load', function () {
                const height = document.body.scrollHeight;
                window.parent.postMessage({ type: 'testimonial-height', height }, '*');
              });
            </script>
          </head>
          <body style="margin: 0; padding: 0;">
            <div style="
              background: ${containerBackground};
              padding : 30px;
              maxHeight : 350px
             
            ">
              <div style="
                padding-inline: ${contentStyles.paddingInline || '10px'};
                text-align: ${contentStyles.textAlign || 'left'};
                font-weight: ${contentStyles.fontBold ? '700' : 'normal'};
                font-size: ${contentStyles.fontSize || 'inherit'};
                background: ${contentStyles.backgroundColor || 'transparent'};
                color: ${contentStyles.textColor || 'inherit'};
                border: ${contentStyles.border ? `${contentStyles.borderWidth} solid ${contentStyles.borderColor}` : 'none'};
                border-radius: ${contentStyles.borderRadius || '0'};
                font-family: ${contentStyles.fontFamily || 'inherit'};
                box-shadow: ${contentStyles.boxShadow || 'none'};
              ">
                <p>${content ?? ""}</p>
                <footer>— ${senderName}</footer>
                ${
                  video
                    ? `<div style="margin-top: 16px;"><iframe width="100%" height="200" src="${video}" frameborder="0" allowfullscreen></iframe></div>`
                    : ""
                }
              </div>
            </div>
          </body>
        </html>
      `;
    } catch (error) {
      console.error("Error parsing styles:", error);
      
      return `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <script>
              window.addEventListener('load', function () {
                const height = document.body.scrollHeight;
                window.parent.postMessage({ type: 'testimonial-height', height }, '*');
              });
            </script>
          </head>
          <body style="margin: 0; padding: 0;">
            <div style="
              background: #ffffff;
              padding: 30px;
              max-height: 350px;
            ">
              <div style="
                padding-inline: 10px;
                text-align: left;
              ">
                <blockquote>${content ?? ""}</blockquote>
                <footer>— ${senderName}</footer>
                ${
                  video
                    ? `<div style="margin-top: 16px;"><iframe width="100%" height="200" src="${video}" frameborder="0" allowfullscreen></iframe></div>`
                    : ""
                }
              </div>
            </div>
          </body>
        </html>
      `;
    }
  }


//   padding: ${wrapperStyles.padding || '30px'};

//  max-height: ${wrapperStyles.maxHeight || '350px'};