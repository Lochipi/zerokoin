import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import { withAnimations } from "animated-tailwindcss";

const config = {
  content: ["./src/**/*.tsx"],
  plugins: [],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
    },
  },
} satisfies Config;

export default withAnimations(config);
