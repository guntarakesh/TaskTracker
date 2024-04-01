import React from 'react'


import ShowStatusTasks from './ShowStatusTasks';
const Showtasks = () => {


    const s = ['pending', 'on progress', 'completed', 'deployed', 'deprecated']
    return (
        <div className='all'>
            {
                s.map(status => {
                    return <ShowStatusTasks status={status} />
                })
            }
        </div>
    )
}

export default Showtasks