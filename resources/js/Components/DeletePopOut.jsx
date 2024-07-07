import { useRef, useState } from 'react';
import DangerButton from '@/Components/DangerButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import '../../css/deletebutton.css'

export default function DeletePopOut({ className = '',dataValue, disableRoute,disableType}) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    // const passwordInput = useRef();

    const { data, setData, patch, processing, errors } = useForm({
        status: 0, // Assuming this matches your backend field name
        id:dataValue['id'],
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);

        reset();
    };

    const disableUser = (e) => {
        e.preventDefault();
        patch(route(disableRoute)); // Assuming 'departments.store' is your route name
    };

    let disableName='';
    switch(disableType)
    {
        case 'department':
            disableName=dataValue.department_name
            break;
        case 'user':
            disableName=dataValue.name
            break;
    }


    return (
        <section className={`space-y-6 ${className}`}>
            <button className="link-button" onClick={confirmUserDeletion}>Delete</button>
            {/* <DangerButton onClick={confirmUserDeletion}>Delete Account</DangerButton> */}
            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                <form onSubmit={disableUser} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        Are you sure you want to remove <b>"{disableName}"</b>?
                    </h2>

                    {/* <p className="mt-1 text-sm text-gray-600">
                        Once your account is deleted, all of its resources and data will be permanently deleted. Please
                        enter your password to confirm you would like to permanently delete your account.
                    </p> */}

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>

                        <DangerButton className="ms-3" disabled={processing}>
                            Delete Account
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
