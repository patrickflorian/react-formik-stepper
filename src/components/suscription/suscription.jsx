import React, { useState } from 'react';
import {SuscriptionPlanComponent} from './SuscriptionPlan';

export function Suscription(){
    const [active, setActive] = useState(0);
    const plans = [{
        title: 'Basic',
        description : 'Plan de petit artisan',
        ads_creation : 2,
        ads_visit : 50,
        contact_craftsman : 50,
        extension : 30,
        shop : false,
        free_consultation : true,
        personal_page : true,
        technical_assistance : true,
    },
    {
        title: 'Medium',
        description : 'Artisan standard',
        ads_creation : 2,
        ads_visit : 50,
        contact_craftsman : 50,
        extension : 30,
        shop : false,
        free_consultation : true,
        personal_page : true,
        technical_assistance : true,
    }
]

    return (
        <>
            {
                plans.map((plan, index)=>{
                    return <SuscriptionPlanComponent plan={plan} active={active===index} /> 
                })
            }
        </>
    )
}