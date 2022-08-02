import React, { useState } from "react";
import { ChakraProvider } from '@chakra-ui/react'
import {ethers} from  'ethers'
import Storage from './Storage.json'
import { create } from 'ipfs-http-client'
import {Text,Input,Center, Box } from '@chakra-ui/react'

// connect to the default API address http://localhost:5001

function App() { 

  const client = create('https://ipfs.infura.io:5001/api/v0')
  // connect to a different API
  const Contract = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
  // call Core API methods
  const [state,setState] = useState();
	const [file,setFile] = useState();
  const [ipfs, setIpfs] = useState();
  const [data, setdata] = useState();
  const onSubmit =async (event) => {
    event.preventDefault()
    
    console.log(" submiting the form....")
    const cid = await client.add(state);
    setIpfs(cid.path)
    console.log(cid.path)
    
  }

	async function handleChange(e) {
 
		console.log(e.target.files);

  
    const dat = e.target.files[0]
    setState(dat)
		setFile(URL.createObjectURL(e.target.files[0]))
    // console.log("before")
    // const {cid} = await client.add(file);
    // //  ipfs = `https://ipfs.infura.io/ipfs/${created.path}`;

    //  setIpfs(cid)
    // console.log(cid)
    
    
	}

  
  async function addToBlock(){
    
    if(typeof window.ethereum!=='undefined'){
      const provider = new ethers.providers.Web3Provider(window.ethereum, "any")
      await provider.send("eth_requestAccounts", [])
     
      
      const network  = await provider.listAccounts();
      const signer = provider.getSigner( );
      
      const contract = new ethers.Contract(Contract, Storage.abi,signer)
      console.log(ipfs)
      const transaction = await contract.set(ipfs) 
      console.log("debug2")
     await transaction.wait()
    
    }
    else{
      alert("error")
    }

  }


   async function getIpfs(){
    console.log("debug1")
    if (typeof window.ethereum !== 'undefined') {
      console.log("debug2")
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      
      const contract = new ethers.Contract(Contract,Storage.abi,provider)
      
      try{
         const data = await contract.get();
         
         console.log(data)
         document.getElementById('output').innerHTML="https://ipfs.io/ipfs/"+data;
     } 
     catch{
      console.log("debug4")
         const data = "new error"

         setdata(data)
     }
    } }

	return (

		<div className="App card card-3 ">
       
       <Text fontSize='50px' color='tomato'>
      <center>Upload Image to Blockchain</center>
</Text>
<Center><Box maxW='sm' boxShadow='xl' p='6' borderWidth='1px' borderRadius='lg' overflow='hidden'>     <center>
     <h1></h1>
		
      <form onSubmit={onSubmit} >
      <Center>	<input type='file'   margin='5px' onChange={handleChange} /></Center>
		
			<img src={file}  width="300px" height="300px"/>
      <Box as='button' onClick={onSubmit} borderRadius='md' bg='tomato' color='white' px={4} h={8}>
                <button type='submit'>Add to IPFS</button>
</Box> 
                </form>


               
               

      </center>
      </Box></Center>
      <Center><Box as='button' onClick={addToBlock} margin='4' borderRadius='md' bo bg='tomato' color='white' px={4} h={8}>
                Add to Blockchain
</Box> <Box as='button'  onClick={getIpfs}borderRadius='md' margin='4' bg='tomato' color='white' px={4} h={8}>
                Retreive
</Box></Center>
      <center><p id="output"></p></center>
		</div>

	);
}

export default App;


