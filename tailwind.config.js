const {
  hasSelectionSupport,
} = require("@testing-library/user-event/dist/utils");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      sm: "375px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    extend: {
      colors: {
        brightRed: "hsl(12, 88%, 59%)",
        brightRedLight: "hsl(12, 88%, 69%)",
        brightRedSupLight: "hsl(12, 88%, 95%)",
        darkRed: "RGB(205,5,5)",
        brownRed: "RGB(185, 39, 13)",
        brown: "RGB(128,25,7)",
        brownGoldish: "rgb(216, 117, 0)",
        darkBrown: "RGB(109,16,7)",
        grayishBlue: "RGB(82,99,203)",
        darkBlue: "hsl(228, 39%, 23%)",
        darkGrayishBlue: "hsl(227, 12%, 61%)",
        paleGrayishBlue: "RGB(183, 193, 254)",
        veryDarkBlue: "hsl(233, 12%, 13%)",
        indigo: "RGB(26, 188, 156)",
        blueishIndigo: "RGB(3, 91, 97)",
        darkIndigo: "RGB(21, 154, 128)",
        veryPaleRed: "hsl(13, 100%, 96%)",
        veryLightGray: "hsl(0, 0%, 98%)",
        goldGray: "RGB(75, 75, 75)",
        darkGray: "hsl(11, 3%, 30%)",
        lightBlueishGray: "RGB(203, 223, 224)",
        lightBlack: "hsl(219, 5%, 15%)",
        greenishBlack: "RGB(16, 68, 57)",
        darkBlueishBlack: "RGB(41, 62, 63)",
        lila: "#40005d",
        lightLila: "#a892ee",
      },
    },
  },
  plugins: [],
};
