import React, { useReducer } from 'react';
import Buttons from './Button';
import { Color } from './color';
import ShowArea from './ShowArea';



function Example6(params) {
    return (
      <div>
        <Color>
            <ShowArea />
            <Buttons />
        </Color>
      </div>
    )
}

export default Example6