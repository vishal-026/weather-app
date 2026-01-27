import React from 'react';
import { indianStates } from '../data/india_states';

function IndiaSelector({ onSelect }) {
    const handleChange = (e) => {
        const capital = e.target.value;
        if (capital) {
            onSelect(capital);
        }
    };

    return (
        <div className="mb-8 w-full max-w-md mx-auto">
            <div className="relative">
                <select
                    onChange={handleChange}
                    className="w-full appearance-none bg-white/10 border border-white/20 text-white rounded-xl px-4 py-3 pr-8 focus:outline-none focus:ring-2 focus:ring-white/30 backdrop-blur-sm cursor-pointer hover:bg-white/20 transition-colors"
                    defaultValue=""
                >
                    <option value="" disabled className="text-gray-800 bg-white">
                        Select an Indian State...
                    </option>
                    {indianStates.map((item) => (
                        <option
                            key={item.state}
                            value={item.capital}
                            className="text-gray-800 bg-white"
                        >
                            {item.state} ({item.capital})
                        </option>
                    ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-white/70">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                </div>
            </div>
        </div>
    );
}

export default IndiaSelector;
