/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,jsx}"],
    darkMode: "class",
    theme: {
        extend: {
            fontFamily: {
                sans: [
                    "Josefin Sans",
                    ...require("tailwindcss/defaultTheme").fontFamily.sans,
                ],
            },
        },
    },
    plugins: [],
};
