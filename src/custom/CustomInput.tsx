import { Add_Edit_UserSchema } from "../utils/InterFaces";

interface CustomInputProps {
    lableName?: string,
    disabled?: boolean,
    id?: string,
    type?: string,
    placeholder?: string,
    name?: keyof Add_Edit_UserSchema,
    error?: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    register?: any
    required?: boolean,
    pattern?: RegExp | string,
    min?: number | string,
    max?: number | string,
};

export default function CustomInput({ required, pattern, min, max, lableName, disabled, id, type, placeholder, error, register, name }: CustomInputProps) {
    return (
        <>
            {
                lableName &&
                <label className={`text-capitalize mb-2 fs-5`} htmlFor={id}>{lableName} <span className="requiredStar">*</span></label>
            }
            <input
                disabled={disabled}
                type={type}
                id={id}
                placeholder={placeholder}
                className={`form-control`}
                style={{border: error && `1px solid #ff2020`}}
                {...register(name, {
                    required: required ? 'Required' : '',
                    pattern: pattern && { value: pattern, message: 'Enter Valid Email!' },
                    min: min && { value: min, message: `Minimum age is ${min}` },
                    max: max && { value: max, message: `Maximum age is ${max}` }
                })}
            />
            {
                error &&
                <span className="error_message">{error}</span>
            }
        </>
    );
};
