import { useState, createContext } from 'react';
import Colors from '../data/colors.json';
import ColorsMatched from '../data/colorsMatched.json';

export const ColorContext = createContext<ColorContextType | null>(null);

const ColorProvider: React.FC<React.ReactNode> = ({ children }) => {
    const [currentColor, setCurrentColor] = useState<Color>(Colors[0])
    const [colors, setColors] = useState<Color[]>(Colors);
    const [colorsMatched, setColorsMatched] = useState<Color[]>(ColorsMatched);

    const setRandomColor = () => {
        const randomColor: Color = colors[Math.floor(Math.random() * colors.length)];
        setCurrentColor(randomColor);
    };
    return <ColorContext.Provider value={{ currentColor, colors, colorsMatched, setRandomColor }}>{children}</ColorContext.Provider>;
};

export default ColorProvider;