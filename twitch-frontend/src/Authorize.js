import React, {useEffect} from 'react';
import qs from 'qs';
import { authorize } from './apis';
import FA from 'react-fontawesome';

export default function Authorize(props) {
    const queryString = qs.parse(props.location.search, { ignoreQueryPrefix: true });

    useEffect( () => {
        const exitTimeout = () => props.history.push('/');
        if (!queryString.code)
            setTimeout(exitTimeout, 3000);
        else
            authorize(queryString.code).then(exitTimeout);
    }, [queryString, props]);

    if (!queryString.code) {
        return (
            <div>
                <h1>Hmm, that didn't quite work</h1>
                <p>Redirecting you in 3 seconds</p>
            </div>
        );
    }

    return (
        <div style={{textAlign: 'center', color: 'black'}}>
            <h1>Welcome Friend!</h1>
            <p>We'll redirect you to the queue</p>

            <FA spin={true} pulse={true} size='5x' name='spinner' />
        </div>
    );
}