

export const sidebarData = [
  {
    Inbox: [
      {
        name: 'All',
        viewName: 'all',
        icon: "Inbox"
      },
      {
        name: 'Text',
        viewName: 'texts',
        icon: "MessageSquare"
      },
      {
        name: 'Video',
        viewName: 'videos',
        icon: "Video"
      },
      {
        name: 'Liked',
        viewName: 'liked',
        icon: "Heart"
      }
    ],
    Integrations : [
      {
        name : "X/Twitter",
        viewName : "x/twitter",
        icon : "Twitter"
      },
      // {
      //   name : "LinkedIn",
      //   viewName : "linkedin",
      //   icon : "Linkedin"
      // }
    ],

  }
];


export const alignOptions = [
  { label: "Left aligned", values: { align: "left", bold: false } },
  { label: "Right aligned", values: { align: "right", bold: false } },
  { label: "Center aligned", values: { align: "center", bold: false } },
  { label: "Left aligned - Bold ", values: { align: "left", bold: true } },
  { label: "Center aligned - Bold ", values: { align: "center", bold: true } },
];



export const colorPalette = [
  "#e74c3c",
  "#e67e22",
  "#f1c40f",
  "#2ecc71",
  "#1abc9c",
  "#3498db",
  "#9b59b6",
  "#34495e",
  "#d35400",
  "#27ae60",
  "#8e44ad",
  "#000000"
];



export const gradientPalette = [
  "linear-gradient(to right, #3498db, #2ecc71)",
  "linear-gradient(to right, #e74c3c, #f1c40f)",
  "linear-gradient(to right, #9b59b6, #3498db)",
  "linear-gradient(to right, #f1c40f, #e67e22)",
  "linear-gradient(to right, #1abc9c, #3498db)",
  "linear-gradient(to right, #e74c3c, #9b59b6)",
  "linear-gradient(to right, #2ecc71, #f1c40f)",
  "linear-gradient(to right, #3498db, #8e44ad)",
  "linear-gradient(to right, #2c3e50, #bdc3c7)",
  "linear-gradient(to right, #d35400, #f39c12)",
  "linear-gradient(to right, #16a085, #2980b9)",
  "linear-gradient(to right, #8e44ad, #c0392b)",
];

export const fontSizeLabels = {
  "12px": "Extra small",
  "14px": "Small",
  "16px": "Base",
  "18px": "Large",
  "20px": "Extra large"
};


export const wrapperStyles = {
  padding: "0px",
  backgroundColor: "#000080",
  gradient: "",
};

export const cardStyles = {
  backgroundColor: "#ffffff",
  borderColor: "#cccccc",
  borderWidth: "0px",
  borderRadius: "0px",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
  fontFamily: "'Arial', sans-serif",
  textColor: "#000000",
  starColor: "#FCB900",
  textAlign: 'center' as 'left' | 'right' | 'center' | 'justify' | undefined,
  fontBold : true,
  border : true,
  fontSize : "16px",
};


export const fontOptions = [
  { label: "Arial", value: "'Arial', sans-serif" },
  { label: "Helvetica", value: "'Helvetica', sans-serif" },
  { label: "Verdana", value: "'Verdana', sans-serif" },
  { label: "Tahoma", value: "'Tahoma', sans-serif" },
  { label: "Trebuchet MS", value: "'Trebuchet MS', sans-serif" },
  { label: "Segoe UI", value: "'Segoe UI', sans-serif" },
  { label: "Roboto", value: "'Roboto', sans-serif" },
  { label: "Gill Sans", value: "'Gill Sans', sans-serif" },
  { label: "Comic Sans MS", value: "'Comic Sans MS', cursive, sans-serif" },
  { label: "Impact", value: "'Impact', Charcoal, sans-serif" },
  { label: "Times New Roman", value: "'Times New Roman', Times, serif" },
  { label: "Georgia", value: "'Georgia', serif" },
  { label: "Palatino Linotype", value: "'Palatino Linotype', 'Book Antiqua', Palatino, serif" },
  { label: "Cambria", value: "'Cambria', serif" },
  { label: "Courier New", value: "'Courier New', Courier, monospace" },
  { label: "Lucida Console", value: "'Lucida Console', Monaco, monospace" },
  { label: "Monaco", value: "'Monaco', monospace" }
];


