// theme.ts
export interface Theme {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
    textPlaceholder: string;
    errorText: string,
    shadow: string,
    buttonPressed: string; // New: For button background color
    buttonText: string; // New: For button text color
    textbox: string;
    textboxHighlight:string;
  };
}

export const lightTheme: Theme = {
  colors: {
    primary: '#00B5EE',
    secondary: '#111',
    background: '#F6F7FB',
    shadow: 'rgba(0, 0, 0, 0.5)', // Added
    text: '#000',
    textPlaceholder: '#888',
    errorText: '#F00',
    buttonPressed: '#0999CF',
    buttonText: '#FFF',
    textbox: '#E8E6E4',
    textboxHighlight: '#F4F2F0'
  },
};

export const darkTheme: Theme = {
  colors: {
    primary: '#6200ee',
    secondary: '#EEE',
    background: '#222',
    shadow: 'rgba(0, 0, 0, 0.5)', // Added
    text: '#CCC',
    textPlaceholder: '#888',
    errorText: '#F00',
    buttonPressed: '#4C00C0',
    buttonText: '#FFF',
    textbox: '#111',
    textboxHighlight: '#222'
  },
};