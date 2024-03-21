import { ActionItemArgs } from "~/context/MiddleSidebar";

export const getMockData = (path: string): ActionItemArgs[] => {
  switch (path) {
    case "/messages": {
      return [
        {
          id: "asdBishnu",
          title: "Bishnu",
        },
        {
          id: "asdRakesh",
          title: "Rakesh",
        },
        {
          id: "asdDibyendu",
          title: "Dibyendu",
        },
        {
          id: "asdHitsdafesh",
          title: "Hitesh",
        },
        {
          id: "asdBisadfshnu",
          title: "Bishnu",
        },
        {
          id: "asasdfdDibyendu",
          title: "Dibyendu",
        },
        {
          id: "asdfadHitesh",
          title: "Hitesh",
        },
        {
          id: "asasdBishnu",
          title: "Bishnu",
        },
        {
          id: "asddDibydsafendu",
          title: "Dibyendu",
        },
        {
          id: "asasdBishnu",
          title: "Bishnu",
        },
        {
          id: "asddDibydsafendu",
          title: "Dibyendu",
        },
        {
          id: "asdHitasdfgesh",
          title: "Hitesh",
        },
        {
          id: "asdBiasdgfasshnu",
          title: "Bishnu",
        },
      ];
    }
    case "/groups": {
      return [
        {
          id: "agsdRakesh",
          title: "Rakesh",
        },
        {
          id: "agsdDibyendu",
          title: "Dibyendu",
        },
        {
          id: "agsdHitesh",
          title: "Hitesh",
        },
        {
          id: "agsdBishnu",
          title: "Bishnu",
        },
      ];
    }
    default: {
      return [];
    }
  }
};
