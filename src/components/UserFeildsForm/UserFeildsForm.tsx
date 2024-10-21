import { SubmitHandler, useForm } from "react-hook-form";
import { Add_Edit_UserSchema, UserData } from "../../utils/InterFaces";
import CustomInput from "../../custom/CustomInput";
import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface userFeilidProps {
    currPage: string,
    id: string | undefined,
    currData: UserData | null,
};

export default function UserFeildsForm({ currData, currPage, id }: userFeilidProps) {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<Add_Edit_UserSchema>({
        defaultValues: {
            firstName: currData?.firstName || '',
            lastName: currData?.lastName || '',
            email: currData?.email || '',
            age: currData?.age || undefined,
            phoneNumber: currData?.phone || '',
            birthDate: currData?.birthDate || '',
        },
    });
    const navigate = useNavigate();

    const onSubmit: SubmitHandler<Add_Edit_UserSchema> = async (data: Add_Edit_UserSchema): Promise<void> => {
        const loadingToast = toast.loading('Loading... Please wait.');
        try {
            const res = currPage === 'add' ? await axios.post(`${baseUrl}/users/add`, data, {
                headers: {
                    Accept: 'application/json',
                    "Content-Type": 'application/json'
                }
            }) :
                await axios.put(`${baseUrl}/users/${id}`, data, {
                    headers: {
                        Accept: 'application/json',
                        "Content-Type": 'application/json'
                    }
                })
            toast.update(loadingToast, {
                render: currPage === 'add' ? `${res?.data?.firstName} Added Successfully!` : `${res?.data?.firstName} Updated Successfully!`,
                isLoading: false,
                autoClose: 2000,
            });
            navigate('/dashboard/users-list')
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            toast.update(loadingToast, {
                render: `Error: Something went wrong!${error && ''}`,
                isLoading: false,
                autoClose: 2000,
            });
        };
    };

    const inputsArr = [
        {
            id: 1,
            lableName: 'First Name',
            type: 'text',
            placeholder: 'First Name',
            error: errors?.firstName?.message,
            name: 'firstName',
            required: true,
        },
        {
            id: 2,
            lableName: 'Last Name',
            type: 'text',
            placeholder: 'Last Name',
            error: errors?.lastName?.message,
            name: 'lastName',
            required: true,
        },
        {
            id: 3,
            lableName: 'Email',
            type: 'email',
            placeholder: 'Email',
            error: errors?.email?.message,
            name: 'email',
            required: true,
            pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
        },
        {
            id: 4,
            lableName: 'Age',
            type: 'number',
            placeholder: 'Age',
            error: errors?.age?.message,
            name: 'age',
            required: true,
            min: 20,
            max: 60,
        },
        {
            id: 5,
            lableName: 'Phone Number',
            type: 'text',
            placeholder: 'Phone Number',
            error: errors?.phoneNumber?.message,
            name: 'phoneNumber',
            required: true,
        },
        {
            id: 6,
            lableName: 'Birth Date',
            type: 'date',
            placeholder: 'Birth Date',
            error: errors?.birthDate?.message,
            name: 'birthDate',
            required: true,
        },
    ];

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="formHandler">
            <div className="container">
                <div className="row justify-content-center">
                    {
                        currPage === 'profile' &&
                        <div className="col-12 d-flex justify-content-center">
                            <img className="imageContainer" src={currData?.image ? currData?.image : ''} alt={`${currData?.firstName ? currData?.firstName : 'user'} Image`} />
                        </div>
                    }
                    {
                        inputsArr?.map(input => (
                            <div key={input?.id} className="col-md-6 mb-3">
                                <CustomInput
                                    disabled={currPage === 'profile' ? true : false}
                                    id={String(input.id)}
                                    lableName={input.lableName}
                                    placeholder={input.placeholder}
                                    type={input.type}
                                    error={input.error || ''}
                                    register={register}
                                    name={input.name as keyof Add_Edit_UserSchema}
                                    required={input?.required}
                                    pattern={input.pattern}
                                    min={input.min}
                                    max={input.max}
                                />
                            </div>
                        ))
                    }
                    {
                        currPage === 'profile' ?
                            ''
                            :
                            <div className="col-md-6 mt-4">
                                <input disabled={isSubmitting} className="w-100 btn btn-warning text-light fw-medium py-2" type="submit" value={`${isSubmitting ? 'Submitting...' : currPage === 'add' ? 'Add User' : 'Update User'}`} />
                            </div>
                    }
                </div>
            </div>
        </form>
    );
};