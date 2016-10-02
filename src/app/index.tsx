import * as React from 'react';
import * as ReactDOM from 'react-dom';

import HelloWorld, { Hello } from 'lib/components/HelloWorld';

ReactDOM.render(
    <div>
        <HelloWorld/>
        <Hello name="Maxim" />
    </div>,
    document.getElementById('container'));
