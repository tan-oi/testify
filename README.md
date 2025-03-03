

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

# 🛠️ Error Track

This repo also contains a brief list of errors, which were only solved by going through discussion on github, stackoverflow and other platforms.

## 📌 Purpose
- Track hard-to-solve errors and their resolutions.
- Keep a reference for future debugging.
- Share solutions that might help others.

## 📂 Error Log

### 🔹 Error 1: The "payload" argument must be of type object. Received null
- **Issue:** Encountered an error where the `payload` argument was unexpectedly `null` when it was supposed to be an object.

- **Solution & References:**
  - [GitHub Discussion](https://github.com/prisma/prisma/issues/26178)
  - [Reddit Thread](https://www.reddit.com/r/nextjs/comments/1gkxdqe/comment/m19kxgn/)
