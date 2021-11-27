import {useEffect, useState} from 'react';

export default function Loading() {

    const [ui, setUi] = useState('');

    setTimeout(() => setUi(<div>Loading</div>), 800);

    return <>{ui}</>
}
