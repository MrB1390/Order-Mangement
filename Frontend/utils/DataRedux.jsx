import React from 'react';
import { Provider } from 'react-redux';
import { ordStore } from './OrdStore';
import Sidebar from '../src/Components/Sidebar';

const DataRedux = ({children}) => {
    return (
        <div>
            <Provider store={ordStore}>
                {children}
            </Provider>
        </div>
    );
};

export default DataRedux;