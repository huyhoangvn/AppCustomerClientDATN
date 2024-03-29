interface NavProps {
  navigation: {
    reset: (arg0: {
      index: number;
      routes: { name: string; params?: { [key: string]: string } }[];
    }) => void;
    setOptions: (options: object) => void;
    navigate: (name: string, params?: object) => void; // Add navigate property
  };
}

export default NavProps;
