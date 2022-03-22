import { useState, createContext } from 'react';
import Colors from '../data/colors.json';
import ColorsMatched from '../data/colorsMatched.json';

export const ColorContext = createContext<ColorContextType | null>(null);

const ColorProvider: React.FC<React.ReactNode> = ({ children }) => {
    const [currentColor, setCurrentColor] = useState<Color>(Colors[0])
    const [colors, setColors] = useState<Color[]>(Colors);
    const [colorsMatched, setColorsMatched] = useState<Color[]>(ColorsMatched);

    const setRandomColor = () => {
        const randomColor: Color = colorsMatched[Math.floor(Math.random() * colorsMatched.length)];
        setCurrentColor(randomColor);
    };

    const getColorById = (id: number) => {
        return colors.find(color => color.id === id);
    };

    return <ColorContext.Provider value={{ currentColor, colors, colorsMatched, setRandomColor, getColorById }}>{children}</ColorContext.Provider>;
};

export default ColorProvider;