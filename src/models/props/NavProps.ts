interface NavProps {
  navigation: {
    reset: (arg0: {
      index: number;
      routes: { name: string; params?: { [key: string]: string } }[];
    }) => void;
    setOptions: (options: object) => void;
    navigate: (name: string, params?: object) => void;
    goBack: () => void; // Add goBack property
  };
}

export default NavProps;