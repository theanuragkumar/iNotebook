import React from 'react';
import Notes from './Notes';

export default function Home(props) {
    const {showAlert} = props;
    return <div className='my-2'>                
            <Notes showAlert={showAlert} />
    </div>;
}
