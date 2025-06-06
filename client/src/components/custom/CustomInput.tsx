

interface CustomInputProps {
    placeholder?: string;
    value?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}


const CustomInput: React.FC<CustomInputProps> = ({ placeholder, value, onChange }) => {
    return (
        <input
            className="w-full px-4 py-2 border border-gray-300 bg-white text-gray-800 rounded-md shadow-sm 
                 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 
                 transition duration-200"
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
        />
    );
};

export default CustomInput;