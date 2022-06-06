import React, { useEffect } from 'react'

import axios from 'axios'
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
  } from '@chakra-ui/react'

  import { Button } from '@chakra-ui/react'

const Form = () => {


const[forms,setforms] = React.useState({

    card_name:"",
    card_num:"",
    expiry_mon:"",
    expiry_yr:"",
    cvv:"",


})
const[details,setdetails] = React.useState([]);

const handleChange = (e)=>{

    let{name,value} = e.target;
    console.log(name,value)

    setforms({...forms,
        [name]:value,
    });

};


const handlesave = (e)=>{


    fetch("http://localhost:8080/Forms",{
        method:"POST",
        headers:{
            "content-type" : "application/json"
        },
        body:JSON.stringify({
            card_name : forms.card_name,
            card_num : forms.card_num,
            expiry_mon:forms.expiry_mon,
            expiry_yr:forms.expiry_yr,
            cvv:forms.cvv
        }),  
    })
    .then((r)=>r.json())
    .then((d)=>{

        setdetails([...details,d]);
        setforms("");

    })

   
}

const get_data = async ()=>{

    await axios.get("http://localhost:8080/Forms").then((r)=>{

        setdetails(r.data);


    })
}

useEffect(()=>{
    get_data();
},[])

  return (
    <div>

<div id='form_box'>
<div id='main_box'>
<FormControl isRequired>
  <label id='name_label'>Cardholder Name:</label>
  <Input id='first-name' placeholder='Cardholder Name (e.g: John Smith)' value={forms.card_name} onChange={handleChange} name='card_name' />
</FormControl>

<FormControl isRequired>
  <label id='number_label'>Cardholder Number:</label>
  <Input id='first-name' placeholder='Cardholder Number (e.g: 0012 3456 7896)' value={forms.card_num} onChange={handleChange} name='card_num' />
</FormControl>

<div id='triple_text'>
<label id='Expiry_date'>Expiry Month</label>
<label id='Expiry_year'>Expiry year</label>
<label id='Cvv'>Cvv</label>
</div>



<FormControl isRequired>
  
  <div id='triple_box'>
  <Input id='first-month' placeholder='mm' value={forms.expiry_mon}  onChange={handleChange} name='expiry_mon'/>
  <Input id='first-month' placeholder='yyyy' value={forms.expiry_yr}  onChange={handleChange} name='expiry_yr'/>
  <Input id='first-month' placeholder='cvv' type={`password`}  value={forms.cvv} onChange={handleChange} name='cvv'/>
  </div>
</FormControl>


<div id='payment_amount'>
<h3>Payment Amount: $20000</h3>
</div>


<div id='submit_button'>
<Button colorScheme='blue' id='btt' onClick={handlesave}>Button</Button>
</div>




</div>


</div>


<div id='Card-box'>
<div id='card'>

<h3>VISA</h3>
    <h4 id='carn'>Card Holder</h4>
    <h4 id='exn'>Expiry</h4>
    <h4 id='cvv'>Cvv</h4>
{details.map((detail)=>{

return (
    <>
    
    <div id='c_num'>
        <h1>{detail.card_num}</h1>
    </div>

    <div id='c_details'>
        <h4 id='c_nama'>{detail.card_name}</h4>
        <h4 id='ex_d'>{detail.expiry_mon}/{detail.expiry_yr}</h4>
        <h4 id='cvc'>{detail.cvv}</h4>

    </div>
    
    </>
)



})}


</div>
</div>




    </div>
  )
}

export default Form