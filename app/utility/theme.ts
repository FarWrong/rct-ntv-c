// theme.ts
export interface Theme {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
    errorText: string,
    buttonPressed: string; // New: For button background color
    buttonText: string; // New: For button text color
  };
  fontSizes: {
    small: number;
    medium: number;
    large: number;
    button: number; // New: Specific font size for buttons
  };
  button: {
    height: number;
    paddingHorizontal: number;
    paddingVertical: number;
    borderRadius: number;
  };
  textBox: {
    borderWidth: number;
    gap: number;
    height: number;
    paddingHorizontal: number;
    paddingVertical: number;
  };
  popup: {
    borderRadius: number;
    padding: number;
    flexBody: number;
    flexClose: number;
    margin: number;
  }
}

export const lightTheme: Theme = {
  colors: {
    primary: '#0AB3F9', // Existing
    secondary: '#101010', // Added by Nick
    background: '#F6F7FB', // Existing
    text: '#000000', // Existing
    errorText: '#ff0000', // Added by Nick
    buttonPressed: '#0999CF', // Tailwind bg-violet-600 equivalent
    buttonText: '#ffffff', // For button text
  },
  fontSizes: {
    small: 12, // Existing
    medium: 14, // Existing
    large: 16, // Existing
    button: 16, // Assuming a suitable size for button text
  },
  button: {
    height: 40, // Tailwind h-10 equivalent in pixels
    paddingHorizontal: 24, // Tailwind px-6 equivalent in pixels
    paddingVertical: 18, // Tailwind px-6 equivalent in pixels
    borderRadius: 9999, // A large value for fully rounded corners
  },
  textBox: {
    borderWidth: 2, // Tailwind px equivalent in pixels
    gap: 100, // Tailwind px equivalent in pixels
    height: 30, // Tailwind h-10 equivalent in pixels
    paddingHorizontal: 24, // Tailwind px-6 equivalent in pixels
    paddingVertical: 18, // Tailwind px-6 equivalent in pixels
  },
  popup: {
    borderRadius: 10,
    padding: 10, // Tailwind px-6 equivalent in pixels
    flexBody: 7, // Body takes up 4/5ths of popup
    flexClose: 1, // Close button takes up 1/5th of popup
    margin: 50
  }
  // Existing container style...
};

export const darkTheme: Theme = {
  colors: {
    primary: '#6200ee', // Existing
    secondary: '#f0f0f0', // Added by Nick
    background: '202020', // Existing
    text: '#000000', // Existing
    errorText: '#ff0000', // Added by Nick
    buttonPressed: '#4C00C0', // Tailwind bg-violet-600 equivalent
    buttonText: '#ffffff', // For button text
  },
  fontSizes: {
    small: 12, // Existing
    medium: 14, // Existing
    large: 16, // Existing
    button: 16, // Assuming a suitable size for button text
  },
  button: {
    height: 40, // Tailwind h-10 equivalent in pixels
    paddingHorizontal: 24, // Tailwind px-6 equivalent in pixels
    paddingVertical: 18, // Tailwind px-6 equivalent in pixels
    borderRadius: 9999, // A large value for fully rounded corners
  },
  textBox: {
    borderWidth: 2, // Tailwind px equivalent in pixels
    gap: 100, // Tailwind px equivalent in pixels
    height: 30, // Tailwind h-10 equivalent in pixels
    paddingHorizontal: 24, // Tailwind px-6 equivalent in pixels
    paddingVertical: 18, // Tailwind px-6 equivalent in pixels
  },
  popup: {
    borderRadius: 10,
    padding: 10, // Tailwind px-6 equivalent in pixels
    flexBody: 7, // Body takes up 4/5ths of popup height
    flexClose: 1, // Close button takes up 1/5th of popup height
    margin: 50
  }
  // Existing container style...
};