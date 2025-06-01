import React, { useState } from 'react';

function ToggleDetails() {
    const [show, setShow] = useState(false);

    return (
        <div>
            <button onClick={() => setShow(prev => !prev)}>
                {show ? 'Ukryj szczegóły' : 'Pokaż szczegóły'}
            </button>
            {show && <p>Ale się najem po zajęciach</p>}
        </div>
    );
}

export default ToggleDetails;
