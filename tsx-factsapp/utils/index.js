export const getUrlObj = (category = "Random") => {
  switch (category) {
    case "Math":
      return {
        url: "https://numbersapi.p.rapidapi.com/1729/math",
        options: {
          method: "GET",
          params: {
            fragment: "true",
            json: "true",
          },
          headers: {
            "Content-Type": "application/json",
            "X-RapidAPI-Key":
              "ddfef432efmsh176bc99bac019dap108e74jsn1237de87d8e5",
            "X-RapidAPI-Host": "numbersapi.p.rapidapi.com",
          },
        },
      };
    case "Random":
      return {
        url: "https://numbersapi.p.rapidapi.com/random/trivia",
        options: {
          method: "GET",
          params: {
            min: "10",
            max: "20",
            fragment: "true",
            json: "true",
          },
          headers: {
            "Content-Type": "application/json",
            "X-RapidAPI-Key":
              "ddfef432efmsh176bc99bac019dap108e74jsn1237de87d8e5",
            "X-RapidAPI-Host": "numbersapi.p.rapidapi.com",
          },
        },
      };
    case "Trivia":
      return {
        url: "https://numbersapi.p.rapidapi.com/42/trivia",
        options: {
          method: "GET",
          params: {
            fragment: "true",
            notfound: "floor",
            json: "true",
          },
          headers: {
            "Content-Type": "application/json",
            "X-RapidAPI-Key":
              "ddfef432efmsh176bc99bac019dap108e74jsn1237de87d8e5",
            "X-RapidAPI-Host": "numbersapi.p.rapidapi.com",
          },
        },
      };
    case "Date":
      return {
        url: "https://numbersapi.p.rapidapi.com/1729/math",
        options: {
          method: "GET",
          params: {
            fragment: "true",
            json: "true",
          },
          headers: {
            "Content-Type": "application/json",
            "X-RapidAPI-Key":
              "ddfef432efmsh176bc99bac019dap108e74jsn1237de87d8e5",
            "X-RapidAPI-Host": "numbersapi.p.rapidapi.com",
          },
        },
      };
  }
};
