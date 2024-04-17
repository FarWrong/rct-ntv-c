// theme.ts
export interface Theme {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
    errorText: string,
    shadow: string,
    buttonPressed: string; // New: For button background color
    buttonText: string; // New: For button text color
  };
}

export const lightTheme: Theme = {
  colors: {
    primary: '#0AB3F9',
    secondary: '#101010',
    background: '#F6F7FB',
    shadow: 'rgba(0, 0, 0, 0.5)', // Added
    text: '#000000',
    errorText: '#ff0000',
    buttonPressed: '#0999CF',
    buttonText: '#ffffff',
  },
};

export const darkTheme: Theme = {
  colors: {
    primary: '#6200ee',
    secondary: '#f0f0f0',
    background: '202020',
    shadow: 'rgba(0, 0, 0, 0.5)', // Added
    text: '#000000',
    errorText: '#ff0000',
    buttonPressed: '#4C00C0',
    buttonText: '#ffffff',
  },
};