import React from 'react';

function ModalWallet(props: any) {

    const closeModal = () => props.setDisplay(false);

    if(props.display) {
        return (
            <div className={"modalWrapper"}>
                <div onClick={closeModal} className={"modalBackDrop"}/>
                <div className={"modalBox"}>
                    {props.children}
                </div>

            </div>
        );
    }
    else{
        return null;
    }
}
export default ModalWallet;