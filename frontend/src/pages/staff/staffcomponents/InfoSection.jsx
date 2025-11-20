import React from 'react';
import { Mail, Phone } from 'lucide-react';

const InfoSection = ({ title, fields, data, isEditing, onChange }) => {
  return (
    <div className="bg-white p-6 rounded shadow space-y-4">
      <h2 className="font-semibold text-lg text-gray-700">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        {fields.map(({ label, name, colSpan }) => (
          <div key={name} className={colSpan ? 'md:col-span-2' : ''}>
            <label className="block text-gray-500 mb-1">{label}</label>
            {isEditing ? (
              <input
                type="text"
                name={name}
                value={data[name]}
                onChange={onChange}
                className="w-full border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-gray-700 flex items-center">
                {name === 'email' ? (
                  <>
                    <Mail className="h-4 w-4 mr-2 text-gray-500" />
                    {data[name]}
                  </>
                ) : name === 'phone' ? (
                  <>
                    <Phone className="h-4 w-4 mr-2 text-gray-500" />
                    {data[name]}
                  </>
                ) : (
                  data[name]
                )}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfoSection;
