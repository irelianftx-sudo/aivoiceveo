
import React from 'react';

interface EditableFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  isTextArea?: boolean;
}

const EditableField: React.FC<EditableFieldProps> = ({ label, name, value, onChange, isTextArea = false }) => {
  const commonProps = {
    name,
    id: name,
    value,
    onChange,
    className: "w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition duration-150 ease-in-out",
  };

  return (
    <div className="w-full">
      <label htmlFor={name} className="block text-sm font-medium text-gray-400 mb-1">
        {label}
      </label>
      {isTextArea ? (
        <textarea {...commonProps} rows={4} />
      ) : (
        <input type="text" {...commonProps} />
      )}
    </div>
  );
};

export default EditableField;
